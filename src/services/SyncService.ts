import { SyncRecord, ScanRecord } from '../types';

export interface SyncService {
  sync(scan: ScanRecord): Promise<SyncRecord>;
  getPendingScans(): Promise<ScanRecord[]>;
  retrySync(scanId: string): Promise<SyncRecord>;
  getSyncState(scanId: string): Promise<SyncRecord | null>;
}

export const SyncServiceToken = 'SyncService';
