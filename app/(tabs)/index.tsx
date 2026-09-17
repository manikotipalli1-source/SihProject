import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import {
  ScanLine,
  AlertTriangle,
  HeartPulse,
  History,
  CloudRain,
  MapPin,
  ChevronRight,
} from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useConnectivityStore } from '../../src/stores/useConnectivityStore';
import { useHistoryStore } from '../../src/stores/useHistoryStore';
import { StatusIndicator, Card } from '../../src/components';

export default function HomeScreen() {
  const { t, language } = useSettingsStore();
  const isOnline = useConnectivityStore((s) => s.isOnline);
  const scans = useHistoryStore((s) => s.scans);

  const recentScans = scans.slice(0, 3);

  const actions = [
    {
      icon: ScanLine,
      label: t('scanCrop'),
      color: theme.colors.primary[600],
      bg: theme.colors.primary[50],
      onPress: () => router.push('/scan-select'),
    },
    {
      icon: AlertTriangle,
      label: t('diseaseRisk'),
      color: theme.colors.warning.dark,
      bg: theme.colors.warning.light,
      onPress: () => router.push('/weather'),
    },
    {
      icon: HeartPulse,
      label: t('cropHealth'),
      color: theme.colors.error.dark,
      bg: theme.colors.error.light,
      onPress: () => router.push('/scan-select'),
    },
    {
      icon: History,
      label: t('scanHistory'),
      color: theme.colors.accent[600],
      bg: theme.colors.accent[50],
      onPress: () => router.push('/history'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>{t('appName')}</Text>
            <Text style={styles.appTagline}>{t('appDescription')}</Text>
          </View>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🌱</Text>
          </View>
        </View>

        <StatusIndicator
          isOnline={isOnline}
          onlineLabel={t('onlineMode')}
          offlineLabel={t('offlineMode')}
        />

        <View style={styles.actionsGrid}>
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.85}
                onPress={action.onPress}
                style={styles.actionCard}
              >
                <View style={[styles.actionIconWrap, { backgroundColor: action.bg }]}>
                  <Icon size={28} color={action.color} strokeWidth={2} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.sectionRow}>
          <TouchableOpacity
            style={styles.quickLink}
            activeOpacity={0.85}
            onPress={() => router.push('/weather')}
          >
            <View style={[styles.quickLinkIcon, { backgroundColor: theme.colors.accent[50] }]}>
              <CloudRain size={22} color={theme.colors.accent[600]} strokeWidth={2} />
            </View>
            <View style={styles.quickLinkText}>
              <Text style={styles.quickLinkTitle}>{t('weather')}</Text>
              <Text style={styles.quickLinkSubtitle}>{t('weatherRisk')}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.neutral[400]} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLink}
            activeOpacity={0.85}
            onPress={() => router.push('/map')}
          >
            <View style={[styles.quickLinkIcon, { backgroundColor: theme.colors.secondary[50] }]}>
              <MapPin size={22} color={theme.colors.secondary[600]} strokeWidth={2} />
            </View>
            <View style={styles.quickLinkText}>
              <Text style={styles.quickLinkTitle}>{t('map')}</Text>
              <Text style={styles.quickLinkSubtitle}>{t('diseaseMap')}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.neutral[400]} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {recentScans.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>{t('recentScans')}</Text>
            {recentScans.map((scan) => (
              <Card
                key={scan.id}
                onPress={() => router.push(`/history/${scan.id}`)}
                style={styles.recentCard}
              >
                <View style={styles.recentRow}>
                  <Text style={styles.recentCrop}>
                    {language === 'mr' ? scan.cropNameMarathi : scan.cropName}
                  </Text>
                  <Text style={styles.recentDisease}>
                    {language === 'mr' ? scan.diseaseNameMarathi : scan.diseaseName}
                  </Text>
                  <Text style={styles.recentDate}>
                    {new Date(scan.timestamp).toLocaleDateString(
                      language === 'mr' ? 'mr-IN' : 'en-IN',
                      { day: 'numeric', month: 'short' },
                    )}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
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
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  appName: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.primary[800],
    lineHeight: 36,
  },
  appTagline: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 28,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  actionCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  actionLabel: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    textAlign: 'center',
  },
  sectionRow: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  quickLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  quickLinkIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLinkText: {
    flex: 1,
  },
  quickLinkTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
  quickLinkSubtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  recentSection: {
    marginTop: theme.spacing.sm,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  recentCard: {
    marginBottom: theme.spacing.sm,
  },
  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentCrop: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary[700],
  },
  recentDisease: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  recentDate: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.neutral[500],
  },
});
