import { Severity } from './disease';

export interface DiagnosisResult {
  id: string;
  cropId: string;
  cropName: string;
  diseaseId: string;
  diseaseName: string;
  diseaseNameMarathi: string;
  isHealthy: boolean;
  confidence: number;
  severity: Severity;
  symptoms: string;
  symptomsMarathi: string;
  advisory: string;
  advisoryMarathi: string;
  analyzedAt: string;
}
