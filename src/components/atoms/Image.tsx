import React, { useState } from 'react';
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from './Text';

export interface ImageProps extends Omit<RNImageProps, 'source'> {
  source: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'square' | 'circle' | 'rounded';
  fallbackText?: string;
  showError?: boolean;
}

/**
 * Atomic Image component with error handling and loading states
 * Follows Atomic Design principles for reusability
 */
export const Image: React.FC<ImageProps> = ({
  source,
  size = 'md',
  shape = 'square',
  fallbackText = 'Image',
  showError = true,
  style,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: any) => {
    setHasError(true);
    onError?.(error);
  };

  const handleLoad = () => {
    setHasError(false);
  };

  const imageStyle = [
    styles.base,
    styles[`size_${size}` as keyof typeof styles],
    styles[`shape_${shape}` as keyof typeof styles],
    style,
  ];

  // Show fallback if there's an error
  if (hasError && showError) {
    return (
      <View style={[imageStyle, styles.fallback]}>
        <Text variant="caption" color="tertiary" align="center">
          {fallbackText}
        </Text>
      </View>
    );
  }

  return (
    <RNImage
      source={{ uri: source }}
      style={imageStyle}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#F0F0F0',
  },

  // Sizes
  size_xs: {
    width: 24,
    height: 24,
  },
  size_sm: {
    width: 32,
    height: 32,
  },
  size_md: {
    width: 48,
    height: 48,
  },
  size_lg: {
    width: 64,
    height: 64,
  },
  size_xl: {
    width: 80,
    height: 80,
  },
  size_2xl: {
    width: 120,
    height: 120,
  },

  // Shapes
  shape_square: {
    borderRadius: 0,
  },
  shape_rounded: {
    borderRadius: 8,
  },
  shape_circle: {
    borderRadius: 999, // Large value to make it circular
  },

  // Fallback
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
