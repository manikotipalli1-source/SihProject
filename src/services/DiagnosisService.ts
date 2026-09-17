import { DiagnosisResult, Severity } from '../types';

export interface DiagnosisService {
  analyzeImage(
    imageUri: string,
    cropId: string,
  cropName: string,
    cropNameMarathi: string,
  ): Promise<DiagnosisResult>;
  getSeverity(diseaseId: string): Severity;
  getConfidence(): number;
  getAdvisory(diseaseId: string, lang: 'mr' | 'en'): string;
}

export const DiagnosisServiceToken = 'DiagnosisService';
