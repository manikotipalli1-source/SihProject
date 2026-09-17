import { WeatherRiskRule } from '../types';

export type Language = 'mr' | 'hi' | 'en';

export const LANGUAGES: { id: Language; label: string; labelMarathi: string }[] = [
  { id: 'mr', label: 'Marathi', labelMarathi: 'मराठी' },
  { id: 'hi', label: 'Hindi', labelMarathi: 'हिंदी' },
  { id: 'en', label: 'English', labelMarathi: 'इंग्रजी' },
];

export const TTS_LANG_MAP: Record<Language, string> = {
  mr: 'mr-IN',
  hi: 'hi-IN',
  en: 'en-IN',
};

export const WEATHER_RISK_RULES: WeatherRiskRule[] = [
  {
    field: 'humidity',
    min: 0,
    max: 50,
    risk: 'low',
    reason: 'Low humidity — low fungal risk.',
    reasonMarathi: 'आर्द्रता कमी — बुरकू रोग जोखीम कमी.',
  },
  {
    field: 'humidity',
    min: 50,
    max: 75,
    risk: 'medium',
    reason: 'Moderate humidity — monitor fungal diseases.',
    reasonMarathi: 'मध्यम आर्द्रता — बुरकू रोगावर लक्ष ठेवा.',
  },
  {
    field: 'humidity',
    min: 75,
    max: 100,
    risk: 'high',
    reason: 'High humidity — high fungal disease risk.',
    reasonMarathi: 'उच्च आर्द्रता — बुरकू रोग जोखीम जास्त.',
  },
  {
    field: 'rainfall',
    min: 0,
    max: 10,
    risk: 'low',
    reason: 'Minimal rainfall — low disease spread.',
    reasonMarathi: 'पाऊस कमी — रोग पसरण्याची जोखीम कमी.',
  },
  {
    field: 'rainfall',
    min: 10,
    max: 30,
    risk: 'medium',
    reason: 'Moderate rainfall — watch for leaf diseases.',
    reasonMarathi: 'मध्यम पाऊस — पानांच्या रोगांवर लक्ष ठेवा.',
  },
  {
    field: 'rainfall',
    min: 30,
    max: 100,
    risk: 'high',
    reason: 'Heavy rainfall — high disease spread risk.',
    reasonMarathi: 'जोरदार पाऊस — रोग पसरण्याची जोखीम जास्त.',
  },
  {
    field: 'temperature',
    min: 0,
    max: 25,
    risk: 'low',
    reason: 'Cool temperatures — lower pest activity.',
    reasonMarathi: 'थंड तापमान — कीडकांची सक्रियता कमी.',
  },
  {
    field: 'temperature',
    min: 25,
    max: 35,
    risk: 'medium',
    reason: 'Warm temperatures — moderate pest activity.',
    reasonMarathi: 'गरम तापमान — मध्यम कीडक सक्रियता.',
  },
  {
    field: 'temperature',
    min: 35,
    max: 50,
    risk: 'high',
    reason: 'Very hot — heat stress and pest surge.',
    reasonMarathi: 'खूप गरम — उष्णता ताण व कीडक वाढ.',
  },
];

export const STORAGE_KEYS = {
  SCAN_HISTORY: '@krishirakshak:scan_history',
  SETTINGS: '@krishirakshak:settings',
  SYNC_QUEUE: '@krishirakshak:sync_queue',
  WEATHER_CACHE: '@krishirakshak:weather_cache',
} as const;
