import { WeatherData } from '../types';

export interface WeatherService {
  getWeather(
    latitude?: number,
    longitude?: number,
  ): Promise<WeatherData>;
  getRiskLevel(data: WeatherData): import('../types').Severity;
}

export const WeatherServiceToken = 'WeatherService';
