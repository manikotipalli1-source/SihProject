import { DiagnosisService as IDiagnosisService } from '../DiagnosisService';
import { DiagnosisResult, Severity } from '../../types';
import { DISEASES } from '../../constants/diseases';
import { MockDiagnosisService } from '../mock/MockDiagnosisService';

/**
 * Web build of TFLiteDiagnosisService.
 *
 * `react-native-fast-tflite` is a native module with no web implementation,
 * and this app's web target (see app.json "web" config) still needs
 * something to import at this path. Metro/React Native's platform file
 * resolution picks *this* file automatically for web bundles (`.web.ts`
 * wins over the plain `.ts`/`.native.ts` file on web), so the real native
 * module is never referenced when bundling for web — that's what was
 * causing "Unable to resolve ../spec/NativeRNTflite" during web bundling.
 *
 * This just delegates to the mock so the web build keeps working end to
 * end; real on-device inference only runs on Android/iOS via
 * TFLiteDiagnosisService.native.ts.
 */
export class TFLiteDiagnosisService implements IDiagnosisService {
  private mock = new MockDiagnosisService();

  analyzeImage(
    imageUri: string,
    cropId: string,
    cropName: string,
    cropNameMarathi: string,
  ): Promise<DiagnosisResult> {
    return this.mock.analyzeImage(imageUri, cropId, cropName, cropNameMarathi);
  }

  getSeverity(diseaseId: string): Severity {
    const disease = DISEASES.find((d) => d.id === diseaseId);
    return disease?.severity ?? 'low';
  }

  getConfidence(): number {
    return 0.85;
  }

  getAdvisory(diseaseId: string, lang: 'mr' | 'en'): string {
    const disease = DISEASES.find((d) => d.id === diseaseId);
    if (!disease) return '';
    return lang === 'mr' ? disease.advisoryMarathi : disease.advisory;
  }
}
