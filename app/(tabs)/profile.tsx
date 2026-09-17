import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Globe,
  Volume2,
  Info,
  Database,
  Trash2,
  ChevronRight,
  Wifi,
  WifiOff,
  ShieldCheck,
} from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { LANGUAGES, Language } from '../../src/constants/config';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useConnectivityStore } from '../../src/stores/useConnectivityStore';
import { useHistoryStore } from '../../src/stores/useHistoryStore';
import { Card, Button, Badge } from '../../src/components';

export default function ProfileScreen() {
  const { t, language, setLanguage, voiceEnabled, toggleVoice } = useSettingsStore();
  const isOnline = useConnectivityStore((s) => s.isOnline);
  const toggleOnline = useConnectivityStore((s) => s.toggle);
  const { scans, clearHistory } = useHistoryStore();

  const healthyCount = scans.filter((s) => s.isHealthy).length;
  const diseasedCount = scans.length - healthyCount;

  const handleClearHistory = () => {
    Alert.alert(t('confirmClear'), '', [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('confirm'),
        style: 'destructive',
        onPress: () => clearHistory(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👨‍🌾</Text>
          </View>
          <Text style={styles.appName}>{t('appName')}</Text>
          <Text style={styles.appDescription}>{t('appDescription')}</Text>
        </View>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{scans.length}</Text>
            <Text style={styles.statLabel}>{t('totalScans')}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.colors.success.dark }]}>
              {healthyCount}
            </Text>
            <Text style={styles.statLabel}>{t('healthyScans')}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.colors.error.dark }]}>
              {diseasedCount}
            </Text>
            <Text style={styles.statLabel}>{t('diseasedScans')}</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>{t('settings')}</Text>

        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Globe size={22} color={theme.colors.primary[600]} strokeWidth={2} />
              <Text style={styles.settingLabel}>{t('language')}</Text>
            </View>
            <View style={styles.languageButtons}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang.id}
                  onPress={() => setLanguage(lang.id as Language)}
                  style={[
                    styles.langButton,
                    language === lang.id && styles.langButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.langLabel,
                      language === lang.id && styles.langLabelActive,
                    ]}
                  >
                    {lang.labelMarathi}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        <Card style={styles.settingCard}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={toggleVoice}
            style={styles.settingRow}
          >
            <View style={styles.settingLeft}>
              <Volume2 size={22} color={theme.colors.primary[600]} strokeWidth={2} />
              <Text style={styles.settingLabel}>{t('voiceGuidance')}</Text>
            </View>
            <View
              style={[
                styles.toggle,
                voiceEnabled && styles.toggleActive,
              ]}
            >
              <View
                style={[
                  styles.toggleKnob,
                  voiceEnabled && styles.toggleKnobActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </Card>

        <Card style={styles.settingCard}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={toggleOnline}
            style={styles.settingRow}
          >
            <View style={styles.settingLeft}>
              {isOnline ? (
                <Wifi size={22} color={theme.colors.success.DEFAULT} strokeWidth={2} />
              ) : (
                <WifiOff size={22} color={theme.colors.neutral[500]} strokeWidth={2} />
              )}
              <Text style={styles.settingLabel}>
                {isOnline ? t('onlineMode') : t('offlineMode')}
              </Text>
            </View>
            <View
              style={[
                styles.toggle,
                isOnline && styles.toggleActive,
              ]}
            >
              <View
                style={[
                  styles.toggleKnob,
                  isOnline && styles.toggleKnobActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </Card>

        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Database size={22} color={theme.colors.accent[600]} strokeWidth={2} />
              <Text style={styles.settingLabel}>{t('offlineDataStored')}</Text>
            </View>
            <Badge label={`${scans.length}`} variant="synced" />
          </View>
        </Card>

        {scans.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleClearHistory}
            style={styles.clearButton}
          >
            <Trash2 size={20} color={theme.colors.error.DEFAULT} strokeWidth={2} />
            <Text style={styles.clearLabel}>{t('clearHistory')}</Text>
          </TouchableOpacity>
        )}

        <View style={styles.aboutSection}>
          <View style={styles.aboutRow}>
            <Info size={18} color={theme.colors.neutral[400]} strokeWidth={2} />
            <Text style={styles.aboutText}>{t('aboutApp')}</Text>
          </View>
          <View style={styles.aboutRow}>
            <ShieldCheck size={18} color={theme.colors.neutral[400]} strokeWidth={2} />
            <Text style={styles.aboutText}>
              {t('version')} 1.0.0
            </Text>
          </View>
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
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  appName: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.primary[800],
  },
  appDescription: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.primary[700],
  },
  statLabel: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  settingCard: {
    marginBottom: theme.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.neutral[100],
  },
  langButtonActive: {
    backgroundColor: theme.colors.primary[600],
  },
  langLabel: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.neutral[600],
  },
  langLabelActive: {
    color: theme.colors.textInverse,
    fontFamily: theme.typography.fontFamilyBold,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.neutral[300],
    justifyContent: 'center',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: theme.colors.primary[500],
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
  },
  toggleKnobActive: {
    transform: [{ translateX: 20 }],
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginBottom: theme.spacing.lg,
  },
  clearLabel: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.error.DEFAULT,
  },
  aboutSection: {
    gap: 12,
    paddingVertical: theme.spacing.md,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aboutText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    flex: 1,
  },
});
