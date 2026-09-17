import { SyncState } from './scan';

export interface SyncRecord {
  id: string;
  scanId: string;
  state: SyncState;
  lastAttemptAt: string | null;
  error: string | null;
}
