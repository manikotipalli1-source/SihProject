import { create } from 'zustand';
import { Language } from '../constants/config';
import { translate, TranslationKey } from '../constants/i18n';

interface SettingsState {
  language: Language;
  voiceEnabled: boolean;
  setLanguage: (lang: Language) => void;
  toggleVoice: () => void;
  t: (key: TranslationKey) => string;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  language: 'mr',
  voiceEnabled: true,
  setLanguage: (lang) => set({ language: lang }),
  toggleVoice: () => set((s) => ({ voiceEnabled: !s.voiceEnabled })),
  t: (key) => translate(key, get().language),
}));
