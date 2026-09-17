import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { Severity } from '../types';
import { Badge } from './Badge';
import { useSettingsStore } from '../stores/useSettingsStore';

interface SeverityDisplayProps {
  severity: Severity;
  isHealthy?: boolean;
}

export function SeverityDisplay({ severity, isHealthy }: SeverityDisplayProps) {
  const { t } = useSettingsStore();

  if (isHealthy) {
    return <Badge label={t('healthy')} variant="low" />;
  }

  const labelMap: Record<Severity, string> = {
    low: t('low'),
    medium: t('medium'),
    high: t('high'),
  };

  return <Badge label={labelMap[severity]} variant={severity} />;
}
