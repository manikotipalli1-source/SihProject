import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { theme } from '../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
  fullWidth = false,
}: ButtonProps) {
  const variantStyle = styles[variant];
  const textColor =
    variant === 'outline'
      ? theme.colors.primary[700]
      : variant === 'danger'
        ? theme.colors.textInverse
        : theme.colors.textInverse;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        variantStyle,
        disabled && styles.disabled,
        fullWidth && { width: '100%' },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: theme.touchTarget.comfortable,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  } as ViewStyle,
  primary: {
    backgroundColor: theme.colors.primary[600],
  } as ViewStyle,
  secondary: {
    backgroundColor: theme.colors.secondary[500],
  } as ViewStyle,
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary[600],
  } as ViewStyle,
  danger: {
    backgroundColor: theme.colors.error.DEFAULT,
  } as ViewStyle,
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: theme.typography.sizes.md,
  },
});
