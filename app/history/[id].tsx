import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Trash2,
  Volume2,
  Square,
  Cloud,
  CloudOff,
  RefreshCw,
} from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useHistoryStore } from '../../src/stores/useHistoryStore';
import { useConnectivityStore } from '../../src/stores/useConnectivityStore';
import { voiceService } from '../../src/services/registry';
import { TTS_LANG_MAP } from '../../src/constants/config';
import { Card, Badge, ProgressBar, SeverityDisplay, Button } from '../../src/components';
import { ScanRecord } from '../../src/types';
import { useFocusEffect } from '@react-navigation/native';

export default function ScanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, language, voiceEnabled } = useSettingsStore();
  const { scans, loadHistory, deleteScan, updateSyncState } = useHistoryStore();
  const isOnline = useConnectivityStore((s) => s.isOnline);

  const [isSpeaking, setIsSpeaking] = React.useState(false);

useFocusEffect(
  React.useCallback(() => {
    loadHistory();
  }, [loadHistory])
);

  const scan = scans.find((s) => s.id === id);

  if (!scan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={theme.colors.text} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('scanHistory')}</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.notFound}>Scan not found</Text>
      </SafeAreaView>
    );
  }

  const confidencePct = Math.round(scan.confidence * 100);

  const handleListen = async () => {
    if (isSpeaking) {
      voiceService.stop();
      setIsSpeaking(false);
      return;
    }
    if (!voiceEnabled) return;
    const text =
      language === 'mr'
        ? `${scan.diseaseNameMarathi}. ${scan.advisoryMarathi}`
        : `${scan.diseaseName}. ${scan.advisory}`;
    setIsSpeaking(true);
    await voiceService.speak(text, TTS_LANG_MAP[language]);
    setIsSpeaking(false);
  };

  const handleDelete = () => {
    deleteScan(scan.id);
    router.back();
  };

  const handleRetrySync = async () => {
    if (!isOnline) return;
    await updateSyncState(scan.id, 'syncing');
    setTimeout(async () => {
      await updateSyncState(scan.id, 'synced');
    }, 1500);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(language === 'mr' ? 'mr-IN' : 'en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('viewDetails')}</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.backButton}>
          <Trash2 size={22} color={theme.colors.error.DEFAULT} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.resultBanner,
            {
              backgroundColor: scan.isHealthy
                ? theme.colors.success.light
                : scan.severity === 'high'
                  ? theme.colors.error.light
                  : theme.colors.warning.light,
            },
          ]}
        >
          <Text style={styles.bannerEmoji}>🌿</Text>
          <Text style={styles.bannerDisease}>
            {language === 'mr' ? scan.diseaseNameMarathi : scan.diseaseName}
          </Text>
          <Text style={styles.bannerCrop}>
            {language === 'mr' ? scan.cropNameMarathi : scan.cropName}
          </Text>
          <View style={{ marginTop: 8 }}>
            <SeverityDisplay severity={scan.severity} isHealthy={scan.isHealthy} />
          </View>
        </View>

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('confidence')}</Text>
          <View style={styles.confidenceRow}>
            <ProgressBar
              value={scan.confidence}
              max={1}
              color={theme.colors.primary[500]}
              height={12}
              style={{ flex: 1 }}
            />
            <Text style={styles.confidenceValue}>{confidencePct}%</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('advisory')}</Text>
          <Text style={styles.sectionBody}>
            {language === 'mr' ? scan.advisoryMarathi : scan.advisory}
          </Text>
          {voiceEnabled && (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleListen}
              style={styles.listenButton}
            >
              {isSpeaking ? (
                <Square size={20} color={theme.colors.primary[700]} strokeWidth={2} />
              ) : (
                <Volume2 size={20} color={theme.colors.primary[700]} strokeWidth={2} />
              )}
              <Text style={styles.listenLabel}>
                {isSpeaking ? t('stop') : t('listen')}
              </Text>
            </TouchableOpacity>
          )}
        </Card>

        <Card style={styles.section}>
          <View style={styles.syncRow}>
            <Text style={styles.sectionLabel}>{t('syncStatus')}</Text>
            {scan.syncState === 'synced' ? (
              <View style={styles.syncBadge}>
                <Cloud size={16} color={theme.colors.success.dark} strokeWidth={2} />
                <Text style={styles.syncText}>{t('synced')}</Text>
              </View>
            ) : scan.syncState === 'failed' ? (
              <TouchableOpacity onPress={handleRetrySync} style={styles.retryButton}>
                <RefreshCw size={16} color={theme.colors.error.dark} strokeWidth={2} />
                <Text style={styles.retryText}>{t('retry')}</Text>
              </TouchableOpacity>
            ) : scan.syncState === 'syncing' ? (
              <Badge label={t('syncing')} variant="syncing" />
            ) : (
              <Badge label={t('pending')} variant="pending" />
            )}
          </View>
          <Text style={styles.dateText}>{formatDate(scan.timestamp)}</Text>
        </Card>
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
  notFound: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xxl,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  resultBanner: {
    alignItems: 'center',
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  bannerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  bannerDisease: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.text,
    textAlign: 'center',
  },
  bannerCrop: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  confidenceValue: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.primary[700],
    minWidth: 48,
    textAlign: 'right',
  },
  sectionBody: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeight.body,
  },
  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: theme.spacing.md,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
  },
  listenLabel: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary[700],
  },
  syncRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  syncText: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.success.dark,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  retryText: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.error.dark,
  },
  dateText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.neutral[500],
    marginTop: 8,
  },
});
