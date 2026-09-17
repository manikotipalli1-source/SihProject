import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Trash2, ChevronRight, CloudOff, Cloud, RefreshCw } from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useHistoryStore } from '../../src/stores/useHistoryStore';
import { useConnectivityStore } from '../../src/stores/useConnectivityStore';
import { Card, Badge, EmptyState, SeverityDisplay } from '../../src/components';
import { ScanRecord } from '../../src/types';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const { t, language } = useSettingsStore();
  const { scans, isLoading, loadHistory, deleteScan } = useHistoryStore();
  const isOnline = useConnectivityStore((s) => s.isOnline);

useFocusEffect(
  React.useCallback(() => {
    loadHistory();
  }, [loadHistory])
);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(
      language === 'mr' ? 'mr-IN' : 'en-IN',
      { day: 'numeric', month: 'short', year: 'numeric' },
    );
  };

  const syncBadge = (state: ScanRecord['syncState']) => {
    const labels: Record<string, string> = {
      synced: t('synced'),
      pending: t('pending'),
      syncing: t('syncing'),
      failed: t('failed'),
    };
    return <Badge label={labels[state]} variant={state as any} />;
  };

  const renderItem = ({ item }: { item: ScanRecord }) => (
    <Card
      onPress={() => router.push(`/history/${item.id}`)}
      style={styles.scanCard}
    >
      <View style={styles.scanRow}>
        <View style={styles.scanLeft}>
          <View style={styles.scanImagePlaceholder}>
            <Text style={styles.scanEmoji}>🌿</Text>
          </View>
          <View style={styles.scanInfo}>
            <Text style={styles.scanCrop}>
              {language === 'mr' ? item.cropNameMarathi : item.cropName}
            </Text>
            <Text style={styles.scanDisease}>
              {language === 'mr' ? item.diseaseNameMarathi : item.diseaseName}
            </Text>
            <View style={styles.scanMeta}>
              <SeverityDisplay severity={item.severity} isHealthy={item.isHealthy} />
              <Text style={styles.scanDate}>{formatDate(item.timestamp)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.scanRight}>
          {syncBadge(item.syncState)}
          <ChevronRight size={20} color={theme.colors.neutral[400]} strokeWidth={2} />
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('scanHistory')}</Text>
        <View style={styles.syncIndicator}>
          {isOnline ? (
            <Cloud size={18} color={theme.colors.success.DEFAULT} strokeWidth={2} />
          ) : (
            <CloudOff size={18} color={theme.colors.neutral[500]} strokeWidth={2} />
          )}
        </View>
      </View>

      {scans.length === 0 ? (
        <EmptyState
          icon="🌾"
          title={t('noScansYet')}
          subtitle={t('noScansYetPrompt')}
        />
      ) : (
        <FlatList
          data={scans}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.text,
  },
  syncIndicator: {
    padding: 8,
  },
  list: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  scanCard: {
    marginBottom: theme.spacing.md,
  },
  scanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  scanImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanEmoji: {
    fontSize: 24,
  },
  scanInfo: {
    flex: 1,
  },
  scanCrop: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary[700],
  },
  scanDisease: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    marginTop: 2,
  },
  scanMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  scanDate: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.neutral[500],
  },
  scanRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
