import { WeatherService as IWeatherService } from '../WeatherService';
import { WeatherData, Severity } from '../../types';
import { WEATHER_RISK_RULES } from '../../constants/config';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockWeatherService implements IWeatherService {
  async getWeather(
    latitude?: number,
    longitude?: number,
  ): Promise<WeatherData> {
    await delay(1200);

    const temperature = 22 + Math.random() * 18;
    const humidity = 40 + Math.random() * 50;
    const rainfall = Math.random() * 40;
    const windSpeed = 3 + Math.random() * 15;

    const riskLevel = this.calculateRisk(temperature, humidity, rainfall);
    const riskReasons = this.getRiskReasons(temperature, humidity, rainfall);

    return {
      temperature: Math.round(temperature),
      humidity: Math.round(humidity),
      rainfall: Math.round(rainfall * 10) / 10,
      windSpeed: Math.round(windSpeed),
      condition: this.getCondition(rainfall, humidity),
      conditionMarathi: this.getConditionMarathi(rainfall, humidity),
      riskLevel,
      riskReason: riskReasons.en,
      riskReasonMarathi: riskReasons.mr,
      updatedAt: new Date().toISOString(),
      location: {
        latitude: latitude ?? 18.5204,
        longitude: longitude ?? 73.8567,
        name: 'Pune, Maharashtra',
      },
    };
  }

  getRiskLevel(data: WeatherData): Severity {
    return this.calculateRisk(
      data.temperature,
      data.humidity,
      data.rainfall,
    );
  }

  private calculateRisk(
    temp: number,
    humidity: number,
    rainfall: number,
  ): Severity {
    const scores: Severity[] = [];
    for (const rule of WEATHER_RISK_RULES) {
      let value: number;
      if (rule.field === 'temperature') value = temp;
      else if (rule.field === 'humidity') value = humidity;
      else value = rainfall;

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
      let value: number;
      if (rule.field === 'temperature') value = temp;
      else if (rule.field === 'humidity') value = humidity;
      else value = rainfall;

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

  private getCondition(rainfall: number, humidity: number): string {
    if (rainfall > 20) return 'Rainy';
    if (humidity > 70) return 'Humid';
    if (humidity < 40) return 'Dry';
    return 'Partly Cloudy';
  }

  private getConditionMarathi(rainfall: number, humidity: number): string {
    if (rainfall > 20) return 'पावसाळी';
    if (humidity > 70) return 'दमट';
    if (humidity < 40) return 'कोरडे';
    return 'अर्ध्या ढगाळ';
  }
}
