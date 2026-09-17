import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Camera, ChevronLeft, Info } from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { getCropById } from '../../src/constants/crops';
import { getDiseasesForCrop } from '../../src/constants/diseases';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { Button, Card } from '../../src/components';

export default function CropScanScreen() {
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const crop = getCropById(cropId || '');
  const { t, language } = useSettingsStore();

  if (!crop) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Crop not found</Text>
      </SafeAreaView>
    );
  }

  const diseases = getDiseasesForCrop(crop.id).filter((d) => d.id !== 'healthy');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === 'mr' ? crop.nameMarathi : crop.name}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.cropBanner}>
          <Text style={styles.cropIcon}>{crop.icon}</Text>
          <Text style={styles.cropName}>
            {language === 'mr' ? crop.nameMarathi : crop.name}
          </Text>
          <Text style={styles.cropSeason}>{crop.season}</Text>
        </View>

        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Info size={20} color={theme.colors.primary[600]} strokeWidth={2} />
            <Text style={styles.infoTitle}>
              {language === 'mr' ? 'स्कॅन कसे करावे' : 'How to scan'}
            </Text>
          </View>
          <Text style={styles.infoText}>
            {language === 'mr'
              ? '1. पानावर कॅमेरा दिशा करा\n2. चांगल्या प्रकाशात स्कॅन करा\n3. कॅमेरा स्थिर धरा\n4. एक पान स्पष्ट दिसेल असे घ्या'
              : '1. Point camera at the leaf\n2. Scan in good lighting\n3. Hold camera steady\n4. Capture one clear leaf'}
          </Text>
        </Card>

        <Card style={styles.diseasesCard}>
          <Text style={styles.diseasesTitle}>
            {language === 'mr' ? 'शक्य रोग' : 'Possible diseases'}
          </Text>
          {diseases.map((d) => (
            <View key={d.id} style={styles.diseaseRow}>
              <View
                style={[
                  styles.diseaseDot,
                  {
                    backgroundColor:
                      d.severity === 'high'
                        ? theme.colors.error.DEFAULT
                        : d.severity === 'medium'
                          ? theme.colors.warning.DEFAULT
                          : theme.colors.success.DEFAULT,
                  },
                ]}
              />
              <Text style={styles.diseaseName}>
                {language === 'mr' ? d.nameMarathi : d.name}
              </Text>
            </View>
          ))}
        </Card>

        <Button
          label={t('guidedCamera')}
          onPress={() => router.push('/scan/camera')}
          fullWidth
          icon={<Camera size={20} color={theme.colors.textInverse} strokeWidth={2} />}
        />
      </View>
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
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  cropBanner: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.lg,
  },
  cropIcon: {
    fontSize: 56,
    marginBottom: 8,
  },
  cropName: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.primary[800],
  },
  cropSeason: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    marginBottom: theme.spacing.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
  infoText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    lineHeight: 24,
  },
  diseasesCard: {
    marginBottom: theme.spacing.xl,
  },
  diseasesTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    marginBottom: 12,
  },
  diseaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  diseaseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  diseaseName: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
});
