import { VoiceService as IVoiceService } from '../VoiceService';
import * as Speech from 'expo-speech';

export class ExpoVoiceService implements IVoiceService {
  async speak(text: string, lang: string): Promise<void> {
    this.stop();
    return new Promise((resolve) => {
      Speech.speak(text, {
        language: lang,
        rate: 0.95,
        pitch: 1.0,
        onDone: () => resolve(),
        onError: () => resolve(),
      });
    });
  }

  stop(): void {
    Speech.stop();
  }

  isSpeaking(): boolean {
    return false;
  }
}
