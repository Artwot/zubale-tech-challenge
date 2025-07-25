import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'white';
  style?: any;
}

/**
 * Atomic Icon component using Expo Vector Icons
 * Follows Atomic Design principles for reusability
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'primary',
  style,
}) => {
  const iconStyle = [
    styles.base,
    styles[`size_${size}`],
    styles[`color_${color}`],
    style,
  ];

  // Map our custom names to Ionicons names
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    heart: 'heart',
    heartOutline: 'heart-outline',
    comment: 'chatbubble-outline',
    share: 'paper-plane-outline',
    bookmark: 'bookmark',
    bookmarkOutline: 'bookmark-outline',
    user: 'person',
    home: 'home',
    search: 'search',
    add: 'add',
    close: 'close',
    back: 'arrow-back',
    forward: 'arrow-forward',
    more: 'ellipsis-horizontal',
    camera: 'camera',
    image: 'image',
  };

  const iconName = iconMap[name] || 'help-outline';
  const iconSize =
    size === 'xs'
      ? 12
      : size === 'sm'
        ? 16
        : size === 'md'
          ? 20
          : size === 'lg'
            ? 24
            : 28;

  return (
    <View style={iconStyle}>
      <Ionicons
        name={iconName}
        size={iconSize}
        color={styles[`color_${color}`].color}
      />
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
});
