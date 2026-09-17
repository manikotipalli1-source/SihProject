import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, MapPin, AlertCircle, Layers } from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { Card, Badge } from '../../src/components';
import { Severity } from '../../src/types';

interface DiseasePin {
  id: string;
  cropName: string;
  cropNameMarathi: string;
  diseaseName: string;
  diseaseNameMarathi: string;
  severity: Severity;
  x: number;
  y: number;
  reports: number;
}

const MOCK_PINS: DiseasePin[] = [
  {
    id: 'pin1',
    cropName: 'Cotton',
    cropNameMarathi: 'कपाशी',
    diseaseName: 'Pink Bollworm',
    diseaseNameMarathi: 'गुलाबी बोअरवर्म',
    severity: 'high',
    x: 30,
    y: 25,
    reports: 12,
  },
  {
    id: 'pin2',
    cropName: 'Soybean',
    cropNameMarathi: 'सोयाबीन',
    diseaseName: 'Leaf Spot',
    diseaseNameMarathi: 'पानांचे ठिपके',
    severity: 'medium',
    x: 60,
    y: 40,
    reports: 8,
  },
  {
    id: 'pin3',
    cropName: 'Sugarcane',
    cropNameMarathi: 'ऊस',
    diseaseName: 'Red Rot',
    diseaseNameMarathi: 'लाल गाठीदार रोग',
    severity: 'high',
    x: 45,
    y: 60,
    reports: 15,
  },
  {
    id: 'pin4',
    cropName: 'Jowar',
    cropNameMarathi: 'ज्वारी',
    diseaseName: 'Smut',
    diseaseNameMarathi: 'स्मट',
    severity: 'low',
    x: 75,
    y: 70,
    reports: 3,
  },
  {
    id: 'pin5',
    cropName: 'Cotton',
    cropNameMarathi: 'कपाशी',
    diseaseName: 'Leaf Spot',
    diseaseNameMarathi: 'पानांचे ठिपके',
    severity: 'medium',
    x: 20,
    y: 55,
    reports: 6,
  },
];

const severityColor = (sev: Severity): string =>
  sev === 'high'
    ? theme.colors.error.DEFAULT
    : sev === 'medium'
      ? theme.colors.warning.DEFAULT
      : theme.colors.success.DEFAULT;

export default function MapScreen() {
  const { t, language } = useSettingsStore();

  const highRiskPins = MOCK_PINS.filter((p) => p.severity === 'high');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('diseaseMap')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>
          <View style={styles.mapCanvas}>
            <View style={styles.mapGrid}>
              {[...Array(6)].map((_, i) => (
                <View key={`h${i}`} style={[styles.gridLineH, { top: `${(i + 1) * 16.66}%` }]} />
              ))}
              {[...Array(5)].map((_, i) => (
                <View key={`v${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 20}%` }]} />
              ))}
            </View>

            {MOCK_PINS.map((pin) => (
              <View
                key={pin.id}
                style={[styles.pin, { left: `${pin.x}%`, top: `${pin.y}%` }]}
              >
                <View
                  style={[
                    styles.pinCircle,
                    {
                      backgroundColor: severityColor(pin.severity),
                      width: 24 + pin.reports,
                      height: 24 + pin.reports,
                      borderRadius: (24 + pin.reports) / 2,
                    },
                  ]}
                >
                  <MapPin size={16} color={theme.colors.textInverse} strokeWidth={2.5} />
                </View>
                <View style={styles.pinPulse} />
              </View>
            ))}

            <View style={styles.mapLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.error.DEFAULT }]} />
                <Text style={styles.legendText}>{t('high')}</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.warning.DEFAULT }]} />
                <Text style={styles.legendText}>{t('medium')}</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.success.DEFAULT }]} />
                <Text style={styles.legendText}>{t('low')}</Text>
              </View>
            </View>
          </View>
        </View>

        {highRiskPins.length > 0 && (
          <View style={styles.alertBanner}>
            <AlertCircle size={20} color={theme.colors.error.dark} strokeWidth={2} />
            <Text style={styles.alertText}>
              {language === 'mr'
                ? `${highRiskPins.length} उच्च जोखीम उबड शोधले`
                : `${highRiskPins.length} high risk outbreaks detected`}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>{t('nearbyScans')}</Text>

        {MOCK_PINS.map((pin) => (
          <Card key={pin.id} style={styles.pinCard}>
            <View style={styles.pinRow}>
              <View
                style={[
                  styles.pinIcon,
                  { backgroundColor: severityColor(pin.severity) + '30' },
                ]}
              >
                <MapPin size={20} color={severityColor(pin.severity)} strokeWidth={2} />
              </View>
              <View style={styles.pinInfo}>
                <Text style={styles.pinCrop}>
                  {language === 'mr' ? pin.cropNameMarathi : pin.cropName}
                </Text>
                <Text style={styles.pinDisease}>
                  {language === 'mr' ? pin.diseaseNameMarathi : pin.diseaseName}
                </Text>
              </View>
              <View style={styles.pinRight}>
                <Badge
                  label={
                    pin.severity === 'high'
                      ? t('high')
                      : pin.severity === 'medium'
                        ? t('medium')
                        : t('low')
                  }
                  variant={pin.severity}
                />
                <Text style={styles.pinReports}>
                  {pin.reports} {language === 'mr' ? 'तक्रारी' : 'reports'}
                </Text>
              </View>
            </View>
          </Card>
        ))}

        <View style={styles.futureNote}>
          <Layers size={18} color={theme.colors.neutral[400]} strokeWidth={2} />
          <Text style={styles.futureText}>
            {language === 'mr'
              ? 'भविष्यात: हॉटस्पॉट, क्लस्टरिंग, प्रादेशिक सूचना'
              : 'Future: Hotspots, clustering, regional alerts'}
          </Text>
        </View>
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
  mapContainer: {
    marginBottom: theme.spacing.lg,
  },
  mapCanvas: {
    height: 300,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: theme.colors.neutral[200],
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: theme.colors.neutral[200],
  },
  pin: {
    position: 'absolute',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  pinCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pinPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(34,197,94,0.2)',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  mapLegend: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 10,
    color: theme.colors.text,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.error.light,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  alertText: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.error.dark,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  pinCard: {
    marginBottom: theme.spacing.sm,
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pinIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinInfo: {
    flex: 1,
  },
  pinCrop: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary[700],
  },
  pinDisease: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    marginTop: 2,
  },
  pinRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  pinReports: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.neutral[500],
  },
  futureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
  },
  futureText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
  },
});
