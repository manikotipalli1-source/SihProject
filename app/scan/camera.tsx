import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {
  X,
  Camera,
  RefreshCw,
  Leaf,
  Sun,
  CheckCircle2,
  AlertCircle,
  Zap,
  Image as ImageIcon,
} from 'lucide-react-native';
import { theme } from '../../src/constants/theme';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useScanStore } from '../../src/stores/useScanStore';
import { getCropById } from '../../src/constants/crops';
import { Button } from '../../src/components';

export default function GuidedCameraScreen() {
  const { t } = useSettingsStore();
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const crop = getCropById(cropId || '');
  const setCapturedImage = useScanStore((s) => s.setCapturedImage);

  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedUri, setCapturedUri] = useState<string | null>(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <Camera size={48} color={theme.colors.neutral[400]} strokeWidth={1.5} />
          <Text style={styles.permissionText}>{t('cameraPermission')}</Text>
          <Button label={t('grantPermission')} onPress={requestPermission} />
        </View>
      </SafeAreaView>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef) return;
    try {
      const photo = await cameraRef.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      if (photo?.uri) {
        setCapturedUri(photo.uri);
      }
    } catch {
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Error', 'Gallery permission is required to pick an image');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        setCapturedUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
  };

  let cameraRef: CameraView | null = null;

  const guidanceCards = [
    {
      icon: Leaf,
      label: t('leafDetected'),
      status: 'found',
      color: theme.colors.success.DEFAULT,
    },
    {
      icon: Sun,
      label: t('lightingQuality'),
      status: t('goodLighting'),
      color: theme.colors.success.DEFAULT,
    },
    {
      icon: Zap,
      label: t('cameraStability'),
      status: t('stable'),
      color: theme.colors.success.DEFAULT,
    },
  ];

  if (capturedUri) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.previewContainer}>
          <View style={styles.previewImage}>
            <Text style={styles.previewEmoji}>📸</Text>
            <Text style={styles.previewText}>
              {crop?.nameMarathi || crop?.name} — {t('capture')}
            </Text>
          </View>
          <View style={styles.previewActions}>
            <Button
              label={t('retake')}
              variant="outline"
              onPress={() => setCapturedUri(null)}
              style={{ flex: 1 }}
            />
            <Button
              label={t('capture')}
              onPress={() => {
                setCapturedImage(capturedUri);
                router.push('/scan/processing');
              }}
              style={{ flex: 1, marginLeft: 12 }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <X size={24} color={theme.colors.textInverse} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.cameraTitle}>
          {crop?.nameMarathi || crop?.name}
        </Text>
        <TouchableOpacity
          onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
          style={styles.flipButton}
        >
          <RefreshCw size={22} color={theme.colors.textInverse} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          ref={(ref) => { cameraRef = ref; }}
          facing={facing}
          style={styles.camera}
        />

        <View style={styles.overlay}>
          <View style={styles.focusFrame} />
        </View>

        <View style={styles.guidanceContainer}>
          {guidanceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={styles.guidanceCard}>
                <Icon size={18} color={card.color} strokeWidth={2} />
                <Text style={styles.guidanceLabel}>{card.label}</Text>
                <View style={[styles.guidanceDot, { backgroundColor: card.color }]} />
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.captureContainer}>
        <Text style={styles.captureHint}>{t('pointAtLeaf')}</Text>
        <View style={styles.captureRow}>
          <View style={styles.sideButtonPlaceholder} />
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleCapture}
            style={styles.captureButton}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handlePickFromGallery}
            style={styles.galleryButton}
          >
            <ImageIcon size={22} color={theme.colors.textInverse} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <Text style={styles.captureHint}>{t('holdSteady')}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  permissionContent: {
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  permissionText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
    textAlign: 'center',
  },
  cameraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.textInverse,
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.sm,
  overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusFrame: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: theme.borderRadius.lg,
  },
  guidanceContainer: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    flexDirection: 'row',
    gap: 8,
  },
  guidanceCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
  },
  guidanceLabel: {
    flex: 1,
    fontFamily: theme.typography.fontFamily,
    fontSize: 10,
    color: theme.colors.textInverse,
  },
  guidanceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  captureContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    gap: 8,
  },
  captureHint: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: theme.colors.textInverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.textInverse,
  },
  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  sideButtonPlaceholder: {
    width: 44,
    height: 44,
  },
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  previewImage: {
    flex: 1,
    backgroundColor: theme.colors.neutral[900],
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  previewEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  previewText: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.textInverse,
  },
  previewActions: {
    flexDirection: 'row',
  },
});
