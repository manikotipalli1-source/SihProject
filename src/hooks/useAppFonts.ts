import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import {
  NotoSansDevanagari_400Regular,
  NotoSansDevanagari_700Bold,
} from '@expo-google-fonts/noto-sans-devanagari';
import { NotoSans_400Regular, NotoSans_700Bold } from '@expo-google-fonts/noto-sans';
import { SplashScreen } from 'expo-router';

export function useAppFonts() {
  const [fontsLoaded, fontError] = useFonts({
    'NotoSans-Regular': NotoSans_400Regular,
    'NotoSans-Bold': NotoSans_700Bold,
    'NotoSansDevanagari-Regular': NotoSansDevanagari_400Regular,
    'NotoSansDevanagari-Bold': NotoSansDevanagari_700Bold,
  });

  const [devanagariLoaded, setDevanagariLoaded] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      setDevanagariLoaded(true);
    }
  }, [fontsLoaded]);

  return {
    fontsLoaded: fontsLoaded && devanagariLoaded,
    fontError,
  };
}
