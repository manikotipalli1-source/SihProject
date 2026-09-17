/**
 * Maps each crop's on-device TFLite model to:
 *  - the bundled model asset
 *  - the ordered list of class names the model was trained on
 *    (order matters — it must match class_names.json used at training time)
 *  - a translation from the model's raw class name to this app's diseaseId
 *
 * All four crops (cotton, soybean, sugarcane, jowar/sorghum) now ship with a
 * real trained model, converted to TFLite and verified to run inference
 * correctly (see backend/*.keras and assets/models/*.tflite).
 *
 * IMPORTANT — class order provenance: for soybean/sugarcane/sorghum, the
 * class name lists below come from class_names.json files already present
 * in the AI repo (Chandrasekhar-0525/CropDoc-AI) — they were not regenerated
 * from the specific .keras files uploaded for this integration. The class
 * *counts* match each model's real output shape exactly (soybean: 4,
 * sugarcane: 5, sorghum: 6), which is a strong signal they're right, but if
 * early real-world predictions look scrambled (e.g. a visibly diseased leaf
 * confidently reads "healthy"), re-verify this order against the actual
 * dataset folder structure used for training — `image_dataset_from_directory`
 * assigns class indices alphabetically by subfolder name, so the order here
 * must match those folder names exactly.
 *
 * All four models were verified to use the same raw 0-255 pixel input
 * convention (cotton via mobilenet_v2.preprocess_input baked into the graph;
 * the other three via an explicit Rescaling(1/255) first layer) — so
 * TFLiteDiagnosisService.native.ts's imageToTensor() does NOT need per-crop
 * preprocessing branches. Confirmed by inspecting each model's saved config,
 * not assumed.
 */

export interface CropModelConfig {
  /** Path relative to assets/models, bundled via require() in TFLiteDiagnosisService */
  modelAsset: any;
  /** Class names in the exact index order the model outputs softmax scores for */
  classNames: string[];
  /** Raw model class name -> app diseaseId (see src/constants/diseases.ts) */
  classToDiseaseId: Record<string, string>;
  inputSize: number;
}

export const MODEL_CONFIG: Record<string, CropModelConfig> = {
  cotton: {
    modelAsset: require('../../assets/models/cotton_disease_model.tflite'),
    classNames: ['bacterial_blight', 'curl_virus', 'fussarium_wilt', 'healthy'],
    classToDiseaseId: {
      bacterial_blight: 'bacterial_blight',
      curl_virus: 'curl_virus',
      fussarium_wilt: 'fussarium_wilt',
      healthy: 'healthy',
    },
    inputSize: 224,
  },
  soybean: {
    modelAsset: require('../../assets/models/soybean_disease_model.tflite'),
    classNames: [
      'Healthy_Soyabean',
      'Soyabean_Frog_Leaf_Eye',
      'Soyabean_Mosaic',
      'Soyabean_Spectoria_Brown_Spot',
    ],
    classToDiseaseId: {
      Healthy_Soyabean: 'healthy',
      Soyabean_Frog_Leaf_Eye: 'frogeye_leaf_spot',
      Soyabean_Mosaic: 'soybean_mosaic',
      Soyabean_Spectoria_Brown_Spot: 'septoria_brown_spot',
    },
    inputSize: 224,
  },
  sugarcane: {
    modelAsset: require('../../assets/models/sugarcane_disease_model.tflite'),
    classNames: ['Healthy', 'Mosaic', 'RedRot', 'Rust', 'Yellow'],
    classToDiseaseId: {
      Healthy: 'healthy',
      Mosaic: 'sugarcane_mosaic',
      RedRot: 'red_rot',
      Rust: 'sugarcane_rust',
      Yellow: 'sugarcane_yellow_leaf',
    },
    inputSize: 224,
  },
  jowar: {
    modelAsset: require('../../assets/models/sorghum_disease_model.tflite'),
    classNames: [
      'Anthracnose and Red Rot',
      'Cereal Grain molds',
      'Covered Kernel smut',
      'Head Smut',
      'Rust',
      'loose smut',
    ],
    classToDiseaseId: {
      'Anthracnose and Red Rot': 'sorghum_anthracnose',
      'Cereal Grain molds': 'grain_mold',
      'Covered Kernel smut': 'covered_kernel_smut',
      'Head Smut': 'head_smut',
      Rust: 'sorghum_rust',
      'loose smut': 'loose_kernel_smut',
    },
    inputSize: 224,
  },
};

export const hasRealModel = (cropId: string): boolean => cropId in MODEL_CONFIG;
