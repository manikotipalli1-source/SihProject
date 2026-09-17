import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface StatusIndicatorProps {
  isOnline: boolean;
  onlineLabel: string;
  offlineLabel: string;
}

export function StatusIndicator({
  isOnline,
  onlineLabel,
  offlineLabel,
}: StatusIndicatorProps) {
  const color = isOnline ? theme.colors.success.DEFAULT : theme.colors.neutral[500];
  const label = isOnline ? onlineLabel : offlineLabel;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isOnline ? theme.colors.success.light : theme.colors.neutral[200] },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color: isOnline ? theme.colors.success.dark : theme.colors.neutral[700] }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  borderWidth: 2,
    borderColor: theme.colors.surface,
  shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.sm,
    letterSpacing: 0.5,
  },
});
