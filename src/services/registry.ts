import { TFLiteDiagnosisService } from './live/TFLiteDiagnosisService';
import { ExpoVoiceService } from './mock/ExpoVoiceService';
import { OpenMeteoWeatherService } from './live/OpenMeteoWeatherService';
import { MockSyncService } from './mock/MockSyncService';
import type { DiagnosisService, VoiceService, WeatherService, SyncService } from './index';

// DiagnosisService now runs the real on-device TFLite cotton model
// (assets/models/cotton_disease_model.tflite) when a native dev client is
// available; it transparently falls back to the mock for crops that don't
// have a trained model yet, or when running in plain Expo Go. See
// src/services/live/TFLiteDiagnosisService.native.ts for details.
// SyncService remains mocked pending backend integration (Supabase is
// already a dependency, not yet connected).
export const diagnosisService: DiagnosisService = new TFLiteDiagnosisService();
export const voiceService: VoiceService = new ExpoVoiceService();
export const weatherService: WeatherService = new OpenMeteoWeatherService();
export const syncService: SyncService = new MockSyncService();
