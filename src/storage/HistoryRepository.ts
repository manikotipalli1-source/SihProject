import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScanRecord } from '../types';
import { STORAGE_KEYS } from '../constants/config';

export interface HistoryRepository {
  getAll(): Promise<ScanRecord[]>;
  getById(id: string): Promise<ScanRecord | null>;
  save(record: ScanRecord): Promise<void>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
  updateSyncState(id: string, state: ScanRecord['syncState']): Promise<void>;
}

export class AsyncStorageHistoryRepository implements HistoryRepository {
  async getAll(): Promise<ScanRecord[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
    if (!data) return [];
    const records: ScanRecord[] = JSON.parse(data);
    return records.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }

  async getById(id: string): Promise<ScanRecord | null> {
    const all = await this.getAll();
    return all.find((r) => r.id === id) ?? null;
  }

  async save(record: ScanRecord): Promise<void> {
    const all = await this.getAll();
    const filtered = all.filter((r) => r.id !== record.id);
    filtered.unshift(record);
    await AsyncStorage.setItem(
      STORAGE_KEYS.SCAN_HISTORY,
      JSON.stringify(filtered),
    );
  }

  async delete(id: string): Promise<void> {
    const all = await this.getAll();
    const filtered = all.filter((r) => r.id !== id);
    await AsyncStorage.setItem(
      STORAGE_KEYS.SCAN_HISTORY,
      JSON.stringify(filtered),
    );
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.SCAN_HISTORY);
  }

  async updateSyncState(
    id: string,
    state: ScanRecord['syncState'],
  ): Promise<void> {
    const all = await this.getAll();
    const record = all.find((r) => r.id === id);
    if (record) {
      record.syncState = state;
      await AsyncStorage.setItem(
        STORAGE_KEYS.SCAN_HISTORY,
        JSON.stringify(all),
      );
    }
  }
}

export const historyRepository: HistoryRepository =
  new AsyncStorageHistoryRepository();
