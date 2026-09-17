import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { Severity } from '../types';

type BadgeVariant = Severity | 'synced' | 'pending' | 'syncing' | 'failed';

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  low: { bg: theme.colors.success.light, text: theme.colors.success.dark },
  medium: { bg: theme.colors.warning.light, text: theme.colors.warning.dark },
  high: { bg: theme.colors.error.light, text: theme.colors.error.dark },
  synced: { bg: theme.colors.success.light, text: theme.colors.success.dark },
  pending: { bg: theme.colors.neutral[200], text: theme.colors.neutral[700] },
  syncing: { bg: theme.colors.accent[100], text: theme.colors.accent[700] },
  failed: { bg: theme.colors.error.light, text: theme.colors.error.dark },
};

export function Badge({ label, variant }: BadgeProps) {
  const colors = variantColors[variant];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.sm,
  },
});
