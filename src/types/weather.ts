import { Severity } from './disease';

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  conditionMarathi: string;
  riskLevel: Severity;
  riskReason: string;
  riskReasonMarathi: string;
  updatedAt: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
}

export interface WeatherRiskRule {
  field: 'temperature' | 'humidity' | 'rainfall';
  min: number;
  max: number;
  risk: Severity;
  reason: string;
  reasonMarathi: string;
}
