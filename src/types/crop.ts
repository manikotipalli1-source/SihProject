export type CropId = 'cotton' | 'soybean' | 'sugarcane' | 'jowar';

export interface Crop {
  id: CropId;
  name: string;
  nameMarathi: string;
  icon: string;
  season: string;
  diseases: string[];
}
