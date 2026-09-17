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
import { ChevronRight } from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { CROPS } from '../../src/constants/crops';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useScanStore } from '../../src/stores/useScanStore';
import { Card } from '../../src/components';

export default function ScanSelectScreen() {
  const { t, language } = useSettingsStore();
  const selectCrop = useScanStore((s) => s.selectCrop);

  const handleSelect = (cropId: string) => {
    const crop = CROPS.find((c) => c.id === cropId);
    if (crop) {
      selectCrop(crop);
      router.push(`/scan/${cropId}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('selectCrop')}</Text>
        <Text style={styles.subtitle}>{t('selectCropPrompt')}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CROPS.map((crop) => (
          <Card
            key={crop.id}
            onPress={() => handleSelect(crop.id)}
            style={styles.cropCard}
          >
            <View style={styles.cropRow}>
              <View style={styles.cropIconWrap}>
                <Text style={styles.cropIcon}>{crop.icon}</Text>
              </View>
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>
                  {language === 'mr' ? crop.nameMarathi : crop.name}
                </Text>
                <Text style={styles.cropSeason}>{crop.season}</Text>
                <Text style={styles.cropDiseases}>
                  {crop.diseases.length} {language === 'mr' ? 'रोग' : 'diseases'}
                </Text>
              </View>
              <ChevronRight size={24} color={theme.colors.neutral[400]} strokeWidth={2} />
            </View>
          </Card>
        ))}
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.text,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  cropCard: {
    marginBottom: theme.spacing.md,
  },
  cropRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  cropIconWrap: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropIcon: {
    fontSize: 32,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
  },
  cropSeason: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  cropDiseases: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.primary[600],
    marginTop: 4,
  },
});
