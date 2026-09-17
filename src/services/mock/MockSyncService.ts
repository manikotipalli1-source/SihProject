import { SyncService as ISyncService } from '../SyncService';
import { SyncRecord, ScanRecord, SyncState } from '../../types';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockSyncService implements ISyncService {
  async sync(scan: ScanRecord): Promise<SyncRecord> {
    await delay(1500 + Math.random() * 800);

    const success = Math.random() > 0.15;
    const state: SyncState = success ? 'synced' : 'failed';

    return {
      id: `sync_${scan.id}`,
      scanId: scan.id,
      state,
      lastAttemptAt: new Date().toISOString(),
      error: success ? null : 'Network error — will retry automatically',
    };
  }

  async getPendingScans(): Promise<ScanRecord[]> {
    return [];
  }

  async retrySync(scanId: string): Promise<SyncRecord> {
    await delay(1000);
    return {
      id: `sync_${scanId}`,
      scanId,
      state: 'synced',
      lastAttemptAt: new Date().toISOString(),
      error: null,
    };
  }

  async getSyncState(scanId: string): Promise<SyncRecord | null> {
    return {
      id: `sync_${scanId}`,
      scanId,
      state: 'synced',
      lastAttemptAt: new Date().toISOString(),
      error: null,
    };
  }
}
