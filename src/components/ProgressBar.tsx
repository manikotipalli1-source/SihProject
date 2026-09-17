import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../constants/theme';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  style?: ViewStyle;
}

export function ProgressBar({
  value,
  max = 1,
  color = theme.colors.primary[500],
  height = 10,
  style,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <View
      style={[styles.track, { height, borderRadius: height / 2 }, style]}
    >
      <View
        style={[
          styles.fill,
          { width: `${pct}%`, backgroundColor: color, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: theme.colors.neutral[200],
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
