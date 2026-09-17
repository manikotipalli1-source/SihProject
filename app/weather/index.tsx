import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Droplets, CloudRain, Wind, Thermometer, RefreshCw } from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useWeatherStore } from '../../src/stores/useWeatherStore';
import { useConnectivityStore } from '../../src/stores/useConnectivityStore';
import { Card, Badge, SeverityDisplay } from '../../src/components';
import { Severity } from '../../src/types';

export default function WeatherScreen() {
  const { t, language } = useSettingsStore();
  const { data, isLoading, error, fetchWeather } = useWeatherStore();
  const isOnline = useConnectivityStore((s) => s.isOnline);

  useEffect(() => {
    fetchWeather();
  }, []);

  const riskVariant = (risk: Severity) => risk;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('weatherRisk')}</Text>
        <TouchableOpacity onPress={() => fetchWeather()} style={styles.backButton}>
          <RefreshCw size={22} color={theme.colors.primary[600]} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && !data && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary[600]} />
            <Text style={styles.loadingText}>{t('analyzing')}</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => fetchWeather()} style={styles.retryButton}>
              <Text style={styles.retryText}>{t('retry')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {data && (
          <>
            <View
              style={[
                styles.riskBanner,
                {
                  backgroundColor:
                    data.riskLevel === 'high'
                      ? theme.colors.error.light
                      : data.riskLevel === 'medium'
                        ? theme.colors.warning.light
                        : theme.colors.success.light,
                },
              ]}
            >
              <View style={styles.riskIconWrap}>
                {data.riskLevel === 'high' ? (
                  <CloudRain size={40} color={theme.colors.error.dark} strokeWidth={2} />
                ) : data.riskLevel === 'medium' ? (
                  <CloudRain size={40} color={theme.colors.warning.dark} strokeWidth={2} />
                ) : (
                  <CloudRain size={40} color={theme.colors.success.dark} strokeWidth={2} />
                )}
              </View>
              <Text style={styles.riskTitle}>{t('riskLevel')}</Text>
              <View style={{ marginTop: 8 }}>
                <SeverityDisplay severity={data.riskLevel} />
              </View>
              <Text style={styles.riskReason}>
                {language === 'mr' ? data.riskReasonMarathi : data.riskReason}
              </Text>
              <Text style={styles.locationText}>
                {data.location.name}
              </Text>
            </View>

            <View style={styles.metricsGrid}>
              <Card style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: theme.colors.secondary[50] }]}>
                  <Thermometer size={22} color={theme.colors.secondary[600]} strokeWidth={2} />
                </View>
                <Text style={styles.metricValue}>{data.temperature}°C</Text>
                <Text style={styles.metricLabel}>{t('temperature')}</Text>
              </Card>

              <Card style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: theme.colors.accent[50] }]}>
                  <Droplets size={22} color={theme.colors.accent[600]} strokeWidth={2} />
                </View>
                <Text style={styles.metricValue}>{data.humidity}%</Text>
                <Text style={styles.metricLabel}>{t('humidity')}</Text>
              </Card>

              <Card style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: theme.colors.primary[50] }]}>
                  <CloudRain size={22} color={theme.colors.primary[600]} strokeWidth={2} />
                </View>
                <Text style={styles.metricValue}>{data.rainfall}mm</Text>
                <Text style={styles.metricLabel}>{t('rainfall')}</Text>
              </Card>

              <Card style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: theme.colors.neutral[100] }]}>
                  <Wind size={22} color={theme.colors.neutral[600]} strokeWidth={2} />
                </View>
                <Text style={styles.metricValue}>{data.windSpeed} km/h</Text>
                <Text style={styles.metricLabel}>{t('windSpeed')}</Text>
              </Card>
            </View>

            <Card style={styles.conditionCard}>
              <Text style={styles.conditionLabel}>
                {language === 'mr' ? 'सध्याचे हवामान' : 'Current Condition'}
              </Text>
              <Text style={styles.conditionValue}>
                {language === 'mr' ? data.conditionMarathi : data.condition}
              </Text>
            </Card>

            <View style={styles.onlineNote}>
              <Text style={styles.onlineNoteText}>
                {isOnline ? t('onlineMode') : t('offlineMode')}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
    gap: 16,
  },
  loadingText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    gap: 16,
  },
  errorText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.error.DEFAULT,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.md,
  },
  retryText: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textInverse,
  },
  riskBanner: {
    alignItems: 'center',
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  riskIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  riskTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
  },
  riskReason: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  locationText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.neutral[500],
    marginTop: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: theme.spacing.lg,
  },
  metricCard: {
    width: '47%',
    alignItems: 'center',
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.text,
  },
  metricLabel: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  conditionCard: {
    marginBottom: theme.spacing.md,
  },
  conditionLabel: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  conditionValue: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
  },
  onlineNote: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  onlineNoteText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.neutral[400],
  },
});
