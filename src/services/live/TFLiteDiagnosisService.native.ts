import { DiagnosisService as IDiagnosisService } from '../DiagnosisService';
import { DiagnosisResult, Severity } from '../../types';
import { DISEASES, getDiseaseById } from '../../constants/diseases';
import { MODEL_CONFIG, hasRealModel } from '../../constants/modelClasses';
import { MockDiagnosisService } from '../mock/MockDiagnosisService';

// NOTE ON SETUP (Expo dev client / EAS build required):
// This service uses `react-native-fast-tflite` for real on-device inference
// and `expo-image-manipulator` to resize/normalize the camera photo before
// feeding it to the model. Both use native code, so this will NOT run inside
// Expo Go — you need a custom dev client:
//   npx expo install react-native-fast-tflite expo-image-manipulator
//   npx expo prebuild
//   npx expo run:android   (or run:ios)
// See README.md "Running the real TFLite model" section.
//
// VERSION CAVEAT (please verify before shipping): react-native-fast-tflite
// went through a breaking rewrite between v1.x and v3.x (v3 is built on
// Nitro Modules, requires the extra `react-native-nitro-modules` peer
// dependency, and changes both loadTensorflowModel()'s signature — it now
// takes a second "delegates" array argument — and run()'s input/output
// shape, which moved to plain ArrayBuffers wrapped in arrays). package.json
// pins the 1.x API this file is written against (direct Float32Array
// in/out, single-argument load). This was never run against a real device
// build in this environment — when you set up the dev client, check the
// TypeScript types for whatever version actually installs and adjust
// imageToTensor()/model.run() below if they don't match.

let loadTensorflowModel: any;
let ImageManipulator: any;
let SaveFormat: any;
try {
  // Lazy/optional requires so the app still boots (falling back to Mock)
  // if the native module isn't present yet (e.g. still running in Expo Go).
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  loadTensorflowModel = require('react-native-fast-tflite').loadTensorflowModel;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const manipulator = require('expo-image-manipulator');
  // Using the current (non-deprecated) context API: manipulate(uri).resize(...).renderAsync().saveAsync(...)
  // manipulateAsync() still exists but is deprecated as of recent Expo SDKs.
  ImageManipulator = manipulator.ImageManipulator;
  SaveFormat = manipulator.SaveFormat;
} catch {
  loadTensorflowModel = null;
}

/**
 * Pure-JS base64 -> Uint8Array decoder. Deliberately avoids both `Buffer`
 * (not available as a global in React Native without a polyfill) and
 * `atob` (not available in Hermes) so this has no extra native/polyfill
 * dependency.
 */
function base64ToUint8Array(base64: string): Uint8Array {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const lookup = new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) lookup[chars.charCodeAt(i)] = i;

  const clean = base64.replace(/=+$/, '');
  const byteLength = Math.floor((clean.length * 6) / 8);
  const bytes = new Uint8Array(byteLength);

  let bitBuffer = 0;
  let bitsInBuffer = 0;
  let outputIndex = 0;
  for (let i = 0; i < clean.length; i++) {
    bitBuffer = (bitBuffer << 6) | lookup[clean.charCodeAt(i)];
    bitsInBuffer += 6;
    if (bitsInBuffer >= 8) {
      bitsInBuffer -= 8;
      bytes[outputIndex++] = (bitBuffer >> bitsInBuffer) & 0xff;
    }
  }
  return bytes;
}

type LoadedModel = {
  run: (input: Float32Array[]) => Promise<Float32Array[] | number[][]>;
};

const modelCache: Record<string, LoadedModel> = {};
const mockFallback = new MockDiagnosisService();

async function getModel(cropId: string): Promise<LoadedModel | null> {
  if (!loadTensorflowModel || !hasRealModel(cropId)) return null;
  if (modelCache[cropId]) return modelCache[cropId];

  const config = MODEL_CONFIG[cropId];
  const model = await loadTensorflowModel(config.modelAsset);
  modelCache[cropId] = model;
  return model;
}

/**
 * Resizes the photo to the model's expected input size and returns a
 * Float32 RGB tensor laid out as [1, H, W, 3], in raw 0-255 pixel range.
 *
 * IMPORTANT: values are intentionally NOT divided by 255 here. The cotton
 * model's training graph (backend/train.py) applies
 * tf.keras.applications.mobilenet_v2.preprocess_input() as a layer INSIDE
 * the saved model itself, and that function expects raw 0-255 input and
 * does its own internal rescale to MobileNetV2's [-1, 1] range. Pre-dividing
 * by 255 here double-normalizes the input and produces meaningless
 * predictions (confirmed: same image gives substantially different softmax
 * outputs depending on which scaling is fed in). If you add a differently
 * trained crop model later, check that model's training script for whether
 * it expects raw 0-255 or pre-normalized input before reusing this function.
 */
async function imageToTensor(imageUri: string, size: number): Promise<Float32Array> {
  const context = ImageManipulator.manipulate(imageUri);
  context.resize({ width: size, height: size });
  const rendered = await context.renderAsync();
  const manipulated = await rendered.saveAsync({ format: SaveFormat.JPEG, base64: true });

  // Decode the base64 JPEG into raw RGB bytes.
  // react-native-fast-tflite expects typed-array input matching the model's
  // input tensor shape/dtype; jpeg-js keeps this dependency-light and pure JS.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const jpeg = require('jpeg-js');
  const bytes = base64ToUint8Array(manipulated.base64);
  const decoded = jpeg.decode(bytes, { useTArray: true });

  const floatArray = new Float32Array(size * size * 3);
  for (let i = 0; i < size * size; i++) {
    // decoded.data is RGBA; keep raw 0-255 range (see note above)
    floatArray[i * 3] = decoded.data[i * 4];
    floatArray[i * 3 + 1] = decoded.data[i * 4 + 1];
    floatArray[i * 3 + 2] = decoded.data[i * 4 + 2];
  }
  return floatArray;
}

export class TFLiteDiagnosisService implements IDiagnosisService {
  async analyzeImage(
    imageUri: string,
    cropId: string,
    cropName: string,
    cropNameMarathi: string,
  ): Promise<DiagnosisResult> {
    const model = await getModel(cropId);

    // No trained model for this crop yet (or native module unavailable) —
    // fall back to the mock so the rest of the app keeps working end to end.
    if (!model) {
      return mockFallback.analyzeImage(imageUri, cropId, cropName, cropNameMarathi);
    }

    const config = MODEL_CONFIG[cropId];
    const inputTensor = await imageToTensor(imageUri, config.inputSize);

    const outputs = await model.run([inputTensor]);
    const scores = Array.from(outputs[0] as ArrayLike<number>);

    let bestIndex = 0;
    for (let i = 1; i < scores.length; i++) {
      if (scores[i] > scores[bestIndex]) bestIndex = i;
    }

    const rawClassName = config.classNames[bestIndex];
    const diseaseId = config.classToDiseaseId[rawClassName] ?? 'healthy';
    const disease = getDiseaseById(diseaseId) ?? DISEASES.find((d) => d.id === 'healthy')!;
    const confidence = Math.round(scores[bestIndex] * 100) / 100;

    return {
      id: `diag_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      cropId,
      cropName,
      diseaseId: disease.id,
      diseaseName: disease.name,
      diseaseNameMarathi: disease.nameMarathi,
      isHealthy: disease.id === 'healthy',
      confidence,
      severity: disease.severity,
      symptoms: disease.symptoms,
      symptomsMarathi: disease.symptomsMarathi,
      advisory: disease.advisory,
      advisoryMarathi: disease.advisoryMarathi,
      analyzedAt: new Date().toISOString(),
    };
  }

  getSeverity(diseaseId: string): Severity {
    const disease = DISEASES.find((d) => d.id === diseaseId);
    return disease?.severity ?? 'low';
  }

  getConfidence(): number {
    // Reflects the last real prediction's confidence when available;
    // kept simple/static here since callers use the per-result confidence
    // returned from analyzeImage() for actual UI display.
    return 0.85;
  }

  getAdvisory(diseaseId: string, lang: 'mr' | 'en'): string {
    const disease = DISEASES.find((d) => d.id === diseaseId);
    if (!disease) return '';
    return lang === 'mr' ? disease.advisoryMarathi : disease.advisory;
  }
}
