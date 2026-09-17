import { Severity } from './disease';

export type SyncState = 'pending' | 'syncing' | 'synced' | 'failed';

export interface ScanRecord {
  id: string;
  cropId: string;
  cropName: string;
  cropNameMarathi: string;
  imageUri: string;
  diseaseName: string;
  diseaseNameMarathi: string;
  isHealthy: boolean;
  confidence: number;
  severity: Severity;
  advisory: string;
  advisoryMarathi: string;
  timestamp: string;
  syncState: SyncState;
  location?: {
    latitude: number;
    longitude: number;
  };
}
