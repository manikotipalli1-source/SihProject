import { DiagnosisService as IDiagnosisService } from '../DiagnosisService';
import { DiagnosisResult, Severity } from '../../types';
import { DISEASES, getDiseasesForCrop } from '../../constants/diseases';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export class MockDiagnosisService implements IDiagnosisService {
  async analyzeImage(
    imageUri: string,
    cropId: string,
    cropName: string,
    cropNameMarathi: string,
  ): Promise<DiagnosisResult> {
    await delay(2500 + Math.random() * 1000);

    const cropDiseases = getDiseasesForCrop(cropId);
    const healthy = cropDiseases.find((d: { id: string }) => d.id === 'healthy')!;
    const realDiseases = cropDiseases.filter((d: { id: string }) => d.id !== 'healthy');

    const isHealthy = Math.random() < 0.25;
    const disease = isHealthy ? healthy : pickRandom(realDiseases);
    const confidence = isHealthy
      ? 0.88 + Math.random() * 0.1
      : 0.72 + Math.random() * 0.25;

    return {
      id: `diag_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      cropId,
      cropName,
      diseaseId: disease.id,
      diseaseName: disease.name,
      diseaseNameMarathi: disease.nameMarathi,
      isHealthy,
      confidence: Math.round(confidence * 100) / 100,
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
    return Math.round((0.72 + Math.random() * 0.25) * 100) / 100;
  }

  getAdvisory(diseaseId: string, lang: 'mr' | 'en'): string {
    const disease = DISEASES.find((d: { id: string }) => d.id === diseaseId);
    if (!disease) return '';
    return lang === 'mr' ? disease.advisoryMarathi : disease.advisory;
  }
}
