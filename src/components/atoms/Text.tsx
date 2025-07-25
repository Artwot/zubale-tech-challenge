import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

export interface TextProps extends RNTextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'label';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'white';
  align?: 'left' | 'center' | 'right';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

/**
 * Atomic Text component with predefined variants and styling
 * Follows Atomic Design principles for reusability
 */
export const Text: React.FC<TextProps> = ({
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  size,
  style,
  children,
  ...props
}) => {
  const textStyle = [
    styles.base,
    styles[variant],
    styles[`weight_${weight}`],
    styles[`color_${color}`],
    styles[`align_${align}`],
    size && styles[`size_${size}`],
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },

  // Variants
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  label: {
    fontSize: 12,
    fontWeight: 'medium',
  },

  // Weights
  weight_normal: {
    fontWeight: 'normal',
  },
  weight_medium: {
    fontWeight: '500',
  },
  weight_semibold: {
    fontWeight: '600',
  },
  weight_bold: {
    fontWeight: 'bold',
  },

  // Colors
  color_primary: {
    color: '#000000',
  },
  color_secondary: {
    color: '#666666',
  },
  color_tertiary: {
    color: '#999999',
  },
  color_error: {
    color: '#FF3B30',
  },
  color_success: {
    color: '#34C759',
  },
  color_white: {
    color: '#FFFFFF',
  },

  // Alignment
  align_left: {
    textAlign: 'left',
  },
  align_center: {
    textAlign: 'center',
  },
  align_right: {
    textAlign: 'right',
  },

  // Sizes (override variant sizes if specified)
  size_xs: {
    fontSize: 10,
  },
  size_sm: {
    fontSize: 12,
  },
  size_md: {
    fontSize: 14,
  },
  size_lg: {
    fontSize: 16,
  },
  size_xl: {
    fontSize: 18,
  },
  size_2xl: {
    fontSize: 20,
  },
});
