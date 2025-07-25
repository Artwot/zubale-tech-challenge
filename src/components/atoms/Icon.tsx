import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './Text';

export interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'white';
  style?: any;
}

/**
 * Atomic Icon component using system icons
 * Follows Atomic Design principles for reusability
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'primary',
  style,
}) => {
  // For now, we'll use a simple text-based icon
  // In a real app, you'd use a proper icon library like @expo/vector-icons
  const iconStyle = [
    styles.base,
    styles[`size_${size}`],
    styles[`color_${color}`],
    style,
  ];

  // Simple icon mapping for demo purposes
  const iconMap: Record<string, string> = {
    heart: '♥',
    heartOutline: '♡',
    comment: '💬',
    share: '↗',
    bookmark: '🔖',
    bookmarkOutline: '📖',
    like: '👍',
    unlike: '👎',
    user: '👤',
    home: '🏠',
    search: '🔍',
    add: '➕',
    close: '✕',
    back: '←',
    forward: '→',
  };

  const iconSymbol = iconMap[name] || '•';

  return (
    <View style={iconStyle}>
      <Text style={styles.iconText}>{iconSymbol}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Sizes
  size_xs: {
    width: 16,
    height: 16,
  },
  size_sm: {
    width: 20,
    height: 20,
  },
  size_md: {
    width: 24,
    height: 24,
  },
  size_lg: {
    width: 32,
    height: 32,
  },
  size_xl: {
    width: 40,
    height: 40,
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

  iconText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
