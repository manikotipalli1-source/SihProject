export interface VoiceService {
  speak(text: string, lang: string): Promise<void>;
  stop(): void;
  isSpeaking(): boolean;
}

export const VoiceServiceToken = 'VoiceService';
