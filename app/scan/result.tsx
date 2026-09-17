import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import {
  ChevronLeft,
  Volume2,
  Square,
  Save,
  RotateCcw,
  Leaf,
  ShieldCheck,
  AlertTriangle,
  Microscope,
  CloudRain,
  TrendingDown,
  FlaskConical,
  Sprout,
  Tractor,
} from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useScanStore } from '../../src/stores/useScanStore';
import { voiceService } from '../../src/services/registry';
import { TTS_LANG_MAP } from '../../src/constants/config';
import { getDiseaseById } from '../../src/constants/diseases';
import { Card, Badge, ProgressBar, Button, SeverityDisplay } from '../../src/components';

export default function ResultScreen() {
  const { t, language, voiceEnabled } = useSettingsStore();
  const { diagnosisResult, selectedCrop, saveResult, reset, isSyncing } = useScanStore();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!diagnosisResult) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No result</Text>
      </SafeAreaView>
    );
  }

  const result = diagnosisResult;
  const disease = getDiseaseById(result.diseaseId);
  const confidencePct = Math.round(result.confidence * 100);
  const isMr = language === 'mr';

  const handleListen = async () => {
    if (isSpeaking) {
      voiceService.stop();
      setIsSpeaking(false);
      return;
    }

    if (!voiceEnabled) return;

    const text =
      language === 'mr'
        ? `${result.diseaseNameMarathi}. ${result.symptomsMarathi} ${result.advisoryMarathi}`
        : `${result.diseaseName}. ${result.symptoms} ${result.advisory}`;

    setIsSpeaking(true);
    await voiceService.speak(text, TTS_LANG_MAP[language]);
    setIsSpeaking(false);
  };

  const handleSave = async () => {
    await saveResult();
    setSaved(true);
  };

  const handleScanAgain = () => {
    reset();
    router.replace('/scan-select');
  };

  const severityColor =
    result.severity === 'high'
      ? theme.colors.error.DEFAULT
      : result.severity === 'medium'
        ? theme.colors.warning.DEFAULT
        : theme.colors.success.DEFAULT;

  const renderBulletList = (items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <View style={{ gap: 8 }}>
        {items.map((item, idx) => (
          <View key={idx} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('result')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.resultBanner,
            {
              backgroundColor: result.isHealthy
                ? theme.colors.success.light
                : severityColor === theme.colors.error.DEFAULT
                  ? theme.colors.error.light
                  : theme.colors.warning.light,
            },
          ]}
        >
          <View
            style={[
              styles.bannerIcon,
              {
                backgroundColor: result.isHealthy
                  ? theme.colors.success.DEFAULT
                  : severityColor,
              },
            ]}
          >
            {result.isHealthy ? (
              <ShieldCheck size={32} color={theme.colors.textInverse} strokeWidth={2} />
            ) : (
              <AlertTriangle size={32} color={theme.colors.textInverse} strokeWidth={2} />
            )}
          </View>
          <Text style={styles.bannerDisease}>
            {language === 'mr' ? result.diseaseNameMarathi : result.diseaseName}
          </Text>
          {disease?.scientificName && (
            <Text style={styles.bannerScientific}>{disease.scientificName}</Text>
          )}
          <Text style={styles.bannerCrop}>
            {language === 'mr' ? selectedCrop?.nameMarathi : selectedCrop?.name}
          </Text>
          <View style={{ marginTop: 8 }}>
            <SeverityDisplay severity={result.severity} isHealthy={result.isHealthy} />
          </View>
        </View>

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('confidence')}</Text>
          <View style={styles.confidenceRow}>
            <ProgressBar
              value={result.confidence}
              max={1}
              color={theme.colors.primary[500]}
              height={12}
              style={{ flex: 1 }}
            />
            <Text style={styles.confidenceValue}>{confidencePct}%</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Leaf size={20} color={theme.colors.primary[600]} strokeWidth={2} />
            <Text style={styles.sectionTitle}>{t('symptoms')}</Text>
          </View>
          <Text style={styles.sectionBody}>
            {language === 'mr' ? result.symptomsMarathi : result.symptoms}
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

        {(disease?.cause || disease?.causeMarathi) && (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Microscope size={20} color={theme.colors.primary[600]} strokeWidth={2} />
              <Text style={styles.sectionTitle}>{t('cause')}</Text>
            </View>
            <Text style={styles.sectionBody}>
              {isMr ? disease.causeMarathi : disease.cause}
            </Text>
          </Card>
        )}

        {(disease?.spreadAndConditions || disease?.spreadAndConditionsMarathi) && (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <CloudRain size={20} color={theme.colors.primary[600]} strokeWidth={2} />
              <Text style={styles.sectionTitle}>{t('spreadConditions')}</Text>
            </View>
            <Text style={styles.sectionBody}>
              {isMr ? disease.spreadAndConditionsMarathi : disease.spreadAndConditions}
            </Text>
          </Card>
        )}

        {(disease?.damageImpact || disease?.damageImpactMarathi) && (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <TrendingDown size={20} color={theme.colors.primary[600]} strokeWidth={2} />
              <Text style={styles.sectionTitle}>{t('damageImpact')}</Text>
            </View>
            <Text style={styles.sectionBody}>
              {isMr ? disease.damageImpactMarathi : disease.damageImpact}
            </Text>
          </Card>
        )}

        {(disease?.chemicalControl?.length || disease?.chemicalControlMarathi?.length) ? (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <FlaskConical size={20} color={theme.colors.error.DEFAULT} strokeWidth={2} />
              <Text style={styles.sectionTitle}>{t('chemicalControl')}</Text>
            </View>
            {renderBulletList(isMr ? disease?.chemicalControlMarathi : disease?.chemicalControl)}
            <Text style={styles.disclaimerText}>{t('consultExtension')}</Text>
          </Card>
        ) : null}

        {(disease?.organicControl?.length || disease?.organicControlMarathi?.length) ? (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Sprout size={20} color={theme.colors.success.dark} strokeWidth={2} />
              <Text style={styles.sectionTitle}>{t('organicControl')}</Text>
            </View>
            {renderBulletList(isMr ? disease?.organicControlMarathi : disease?.organicControl)}
          </Card>
        ) : null}

        {(disease?.culturalControl?.length || disease?.culturalControlMarathi?.length) ? (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Tractor size={20} color={theme.colors.primary[600]} strokeWidth={2} />
              <Text style={styles.sectionTitle}>{t('culturalControl')}</Text>
            </View>
            {renderBulletList(isMr ? disease?.culturalControlMarathi : disease?.culturalControl)}
          </Card>
        ) : null}

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShieldCheck size={20} color={theme.colors.primary[600]} strokeWidth={2} />
            <Text style={styles.sectionTitle}>{t('advisory')}</Text>
          </View>
          <Text style={styles.sectionBody}>
            {language === 'mr' ? result.advisoryMarathi : result.advisory}
          </Text>
        </Card>

        <View style={styles.actions}>
          {!saved ? (
            <Button
              label={isSyncing ? t('syncing') : t('saveResult')}
              onPress={handleSave}
              loading={isSyncing}
              fullWidth
            />
          ) : (
            <View style={styles.savedBanner}>
              <ShieldCheck size={20} color={theme.colors.success.dark} strokeWidth={2} />
              <Text style={styles.savedText}>{t('savedMessage')}</Text>
            </View>
          )}
          <Button
            label={t('scanAgain')}
            variant="outline"
            onPress={handleScanAgain}
            fullWidth
            style={{ marginTop: 12 }}
          />
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
  resultBanner: {
    alignItems: 'center',
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  bannerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
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
  bannerScientific: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'italic',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary[400],
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeight.body,
  },
  disclaimerText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginTop: theme.spacing.sm,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
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
  actions: {
    marginTop: theme.spacing.md,
  },
  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: theme.colors.success.light,
    borderRadius: theme.borderRadius.md,
  },
  savedText: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.success.dark,
  },
});
