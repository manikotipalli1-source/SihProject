import { create } from 'zustand';
import { DiagnosisResult, Crop, ScanRecord } from '../types';
import { diagnosisService, syncService } from '../services/registry';
import { historyRepository } from '../storage/HistoryRepository';

interface ScanState {
  selectedCrop: Crop | null;
  capturedImageUri: string | null;
  diagnosisResult: DiagnosisResult | null;
  isAnalyzing: boolean;
  isSyncing: boolean;
  error: string | null;

  selectCrop: (crop: Crop) => void;
  setCapturedImage: (uri: string) => void;
  analyze: () => Promise<void>;
  reset: () => void;
  saveResult: () => Promise<void>;
}

export const useScanStore = create<ScanState>((set, get) => ({
  selectedCrop: null,
  capturedImageUri: null,
  diagnosisResult: null,
  isAnalyzing: false,
  isSyncing: false,
  error: null,

  selectCrop: (crop) => set({ selectedCrop: crop, error: null }),

  setCapturedImage: (uri) => set({ capturedImageUri: uri }),

  analyze: async () => {
    const { selectedCrop, capturedImageUri } = get();
    if (!selectedCrop || !capturedImageUri) {
      set({ error: 'Crop and image required' });
      return;
    }

    set({ isAnalyzing: true, error: null });
    try {
      const result = await diagnosisService.analyzeImage(
        capturedImageUri,
        selectedCrop.id,
        selectedCrop.name,
        selectedCrop.nameMarathi,
      );
      set({ diagnosisResult: result, isAnalyzing: false });
    } catch (e) {
      set({
        isAnalyzing: false,
        error: e instanceof Error ? e.message : 'Analysis failed',
      });
    }
  },

  saveResult: async () => {
    const { diagnosisResult, selectedCrop, capturedImageUri } = get();
    if (!diagnosisResult || !selectedCrop || !capturedImageUri) return;

    const record: ScanRecord = {
      id: `scan_${Date.now()}`,
      cropId: selectedCrop.id,
      cropName: selectedCrop.name,
      cropNameMarathi: selectedCrop.nameMarathi,
      imageUri: capturedImageUri,
      diseaseName: diagnosisResult.diseaseName,
      diseaseNameMarathi: diagnosisResult.diseaseNameMarathi,
      isHealthy: diagnosisResult.isHealthy,
      confidence: diagnosisResult.confidence,
      severity: diagnosisResult.severity,
      advisory: diagnosisResult.advisory,
      advisoryMarathi: diagnosisResult.advisoryMarathi,
      timestamp: new Date().toISOString(),
      syncState: 'pending',
    };

    await historyRepository.save(record);
    set({ isSyncing: true });

    try {
      const syncResult = await syncService.sync(record);
      await historyRepository.updateSyncState(record.id, syncResult.state);
    } catch {
      await historyRepository.updateSyncState(record.id, 'failed');
    } finally {
      set({ isSyncing: false });
    }
  },

  reset: () =>
    set({
      selectedCrop: null,
      capturedImageUri: null,
      diagnosisResult: null,
      isAnalyzing: false,
      error: null,
    }),
}));
