import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { WeatherService as IWeatherService } from '../WeatherService';
import { WeatherData, Severity } from '../../types';
import { WEATHER_RISK_RULES, STORAGE_KEYS } from '../../constants/config';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const DEFAULT_LOCATION = {
  latitude: 18.5204,
  longitude: 73.8567,
  name: 'Pune, Maharashtra',
};

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

/**
 * Resolves the device's current GPS coordinates.
 * Requests foreground location permission if not already granted.
 * Returns null if permission is denied or location can't be read,
 * so the caller can fall back to a default location.
 */
async function resolveDeviceLocation(): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  try {
    const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
    let status = existingStatus;

    if (status !== 'granted') {
      const request = await Location.requestForegroundPermissionsAsync();
      status = request.status;
    }

    if (status !== 'granted') {
      return null;
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch {
    return null;
  }
}

/**
 * Reverse-geocodes coordinates into a human-readable place name using the
 * device's native geocoder (no extra network call / API key required).
 */
async function resolveLocationName(
  latitude: number,
  longitude: number,
): Promise<string> {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });
    const place = results[0];
    if (!place) return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

    const parts = [place.city ?? place.subregion ?? place.district, place.region].filter(
      Boolean,
    );
    return parts.length > 0 ? parts.join(', ') : `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  } catch {
    return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  }
}

function weatherCodeToCondition(code: number): { en: string; mr: string } {
  // WMO weather interpretation codes, grouped to match app copy.
  if (code === 0) return { en: 'Clear Sky', mr: 'निरभ्र आकाश' };
  if ([1, 2].includes(code)) return { en: 'Partly Cloudy', mr: 'अर्ध्या ढगाळ' };
  if (code === 3) return { en: 'Overcast', mr: 'ढगाळ' };
  if ([45, 48].includes(code)) return { en: 'Foggy', mr: 'धुके' };
  if ([51, 53, 55, 56, 57].includes(code)) return { en: 'Drizzle', mr: 'रिमझिम पाऊस' };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { en: 'Rainy', mr: 'पावसाळी' };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { en: 'Snow', mr: 'बर्फवृष्टी' };
  if ([95, 96, 99].includes(code)) return { en: 'Thunderstorm', mr: 'वादळ' };
  return { en: 'Clear', mr: 'निरभ्र' };
}

export class OpenMeteoWeatherService implements IWeatherService {
  async getWeather(latitude?: number, longitude?: number): Promise<WeatherData> {
    let coords = latitude !== undefined && longitude !== undefined ? { latitude, longitude } : null;
    let locationName: string | null = null;

    if (!coords) {
      coords = await resolveDeviceLocation();
    }

    if (!coords) {
      coords = { latitude: DEFAULT_LOCATION.latitude, longitude: DEFAULT_LOCATION.longitude };
      locationName = DEFAULT_LOCATION.name;
    }

    try {
      const url =
        `${FORECAST_URL}?latitude=${coords.latitude}&longitude=${coords.longitude}` +
        `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code` +
        `&timezone=auto`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Open-Meteo request failed with status ${response.status}`);
      }

      const json: OpenMeteoResponse = await response.json();
      const { current } = json;

      if (!locationName) {
        locationName = await resolveLocationName(coords.latitude, coords.longitude);
      }

      const condition = weatherCodeToCondition(current.weather_code);
      const riskLevel = this.calculateRisk(
        current.temperature_2m,
        current.relative_humidity_2m,
        current.precipitation,
      );
      const riskReasons = this.getRiskReasons(
        current.temperature_2m,
        current.relative_humidity_2m,
        current.precipitation,
      );

      const data: WeatherData = {
        temperature: Math.round(current.temperature_2m),
        humidity: Math.round(current.relative_humidity_2m),
        rainfall: Math.round(current.precipitation * 10) / 10,
        windSpeed: Math.round(current.wind_speed_10m),
        condition: condition.en,
        conditionMarathi: condition.mr,
        riskLevel,
        riskReason: riskReasons.en,
        riskReasonMarathi: riskReasons.mr,
        updatedAt: new Date().toISOString(),
        location: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          name: locationName,
        },
      };

      await AsyncStorage.setItem(STORAGE_KEYS.WEATHER_CACHE, JSON.stringify(data));
      return data;
    } catch (fetchError) {
      const cached = await this.readCache();
      if (cached) return cached;
      throw fetchError instanceof Error
        ? fetchError
        : new Error('Unable to fetch weather and no cached data is available.');
    }
  }

  getRiskLevel(data: WeatherData): Severity {
    return data.riskLevel;
  }

  private async readCache(): Promise<WeatherData | null> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.WEATHER_CACHE);
      return raw ? (JSON.parse(raw) as WeatherData) : null;
    } catch {
      return null;
    }
  }

  private calculateRisk(temp: number, humidity: number, rainfall: number): Severity {
    const scores: Severity[] = [];
    for (const rule of WEATHER_RISK_RULES) {
      const value =
        rule.field === 'temperature' ? temp : rule.field === 'humidity' ? humidity : rainfall;
      if (value >= rule.min && value < rule.max) {
        scores.push(rule.risk);
      }
    }
    if (scores.includes('high')) return 'high';
    if (scores.includes('medium')) return 'medium';
    return 'low';
  }

  private getRiskReasons(
    temp: number,
    humidity: number,
    rainfall: number,
  ): { en: string; mr: string } {
    const reasons: string[] = [];
    const reasonsMr: string[] = [];

    for (const rule of WEATHER_RISK_RULES) {
      const value =
        rule.field === 'temperature' ? temp : rule.field === 'humidity' ? humidity : rainfall;
      if (value >= rule.min && value < rule.max) {
        reasons.push(rule.reason);
        reasonsMr.push(rule.reasonMarathi);
      }
    }

    return {
      en: reasons.join(' ') || 'Conditions are favorable.',
      mr: reasonsMr.join(' ') || 'हवामान अनुकूल आहे.',
    };
  }
}
