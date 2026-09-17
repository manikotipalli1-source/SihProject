import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { theme } from '../../src/constants/theme';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useScanStore } from '../../src/stores/useScanStore';

export default function ProcessingScreen() {
  const { t } = useSettingsStore();
  const { isAnalyzing, error, analyze, diagnosisResult } = useScanStore();

  useEffect(() => {
    if (!diagnosisResult) {
      analyze();
    }
  }, []);

  useEffect(() => {
    if (diagnosisResult) {
      router.replace('/scan/result');
    }
  }, [diagnosisResult]);

  useEffect(() => {
    if (error && !isAnalyzing) {
      router.back();
    }
  }, [error, isAnalyzing]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <ActivityIndicator size="large" color={theme.colors.primary[600]} />
        </View>
        <Text style={styles.title}>{t('analyzing')}</Text>
        <Text style={styles.subtitle}>{t('analyzingMessage')}</Text>
        <View style={styles.steps}>
          {[1, 2, 3].map((step) => (
            <View key={step} style={styles.stepDot} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  steps: {
    flexDirection: 'row',
    gap: 12,
    marginTop: theme.spacing.xl,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary[300],
  },
});
