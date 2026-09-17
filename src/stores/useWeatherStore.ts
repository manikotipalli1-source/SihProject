import { create } from 'zustand';
import { WeatherData } from '../types';
import { weatherService } from '../services/registry';

interface WeatherStoreState {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;

  fetchWeather: (lat?: number, lng?: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherStoreState>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchWeather: async (lat, lng) => {
    set({ isLoading: true, error: null });
    try {
      const data = await weatherService.getWeather(lat, lng);
      set({ data, isLoading: false });
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : 'Failed to fetch weather',
      });
    }
  },
}));
