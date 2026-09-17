import { create } from 'zustand';
import { ScanRecord } from '../types';
import { historyRepository } from '../storage/HistoryRepository';

interface HistoryState {
  scans: ScanRecord[];
  isLoading: boolean;
  error: string | null;

  loadHistory: () => Promise<void>;
  deleteScan: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  updateSyncState: (id: string, state: ScanRecord['syncState']) => Promise<void>;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  scans: [],
  isLoading: false,
  error: null,

  loadHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const scans = await historyRepository.getAll();
      set({ scans, isLoading: false });
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : 'Failed to load history',
      });
    }
  },

  deleteScan: async (id) => {
    await historyRepository.delete(id);
    const scans = await historyRepository.getAll();
    set({ scans });
  },

  clearHistory: async () => {
    await historyRepository.clear();
    set({ scans: [] });
  },

  updateSyncState: async (id, state) => {
    await historyRepository.updateSyncState(id, state);
    const scans = await historyRepository.getAll();
    set({ scans });
  },
}));
