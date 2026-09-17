import { Crop } from '../types';

export const CROPS: Crop[] = [
  {
    id: 'cotton',
    name: 'Cotton',
    nameMarathi: 'कपाशी',
    icon: '🌾',
    season: 'Kharif (June–October)',
    // NOTE: matches the real trained cotton_disease_model.tflite classes
    // (see backend/class_names.json). 'pink_bollworm' and 'leaf_spot' were
    // in the original mock data but the trained model does not recognize
    // them — kept here only for reference/UI copy, not used for inference.
    diseases: ['bacterial_blight', 'curl_virus', 'fussarium_wilt'],
  },
  {
    id: 'soybean',
    name: 'Soybean',
    nameMarathi: 'सोयाबीन',
    icon: '🌱',
    season: 'Kharif (June–September)',
    // Matches the real trained soybean_disease_model.tflite classes
    // (see backend/soybean_class_names.json).
    diseases: ['frogeye_leaf_spot', 'soybean_mosaic', 'septoria_brown_spot'],
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    nameMarathi: 'ऊस',
    icon: '🎋',
    season: 'Annual (December–March)',
    // Matches the real trained sugarcane_disease_model.tflite classes
    // (see backend/sugarcane_class_names.json). 'borer' (a pest, not a
    // disease) was in the original mock data but this model only detects
    // diseases — kept in diseases.ts for reference, not used for inference.
    diseases: ['red_rot', 'sugarcane_mosaic', 'sugarcane_rust', 'sugarcane_yellow_leaf'],
  },
  {
    id: 'jowar',
    name: 'Jowar',
    nameMarathi: 'ज्वारी',
    icon: '🌽',
    season: 'Kharif & Rabi',
    // Matches the real trained sorghum_disease_model.tflite classes
    // (see backend/sorghum_class_names.json).
    diseases: [
      'sorghum_anthracnose',
      'grain_mold',
      'covered_kernel_smut',
      'head_smut',
      'sorghum_rust',
      'loose_kernel_smut',
    ],
  },
];

export const getCropById = (id: string): Crop | undefined =>
  CROPS.find((c) => c.id === id);
