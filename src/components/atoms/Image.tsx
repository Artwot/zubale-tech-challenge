import { Image as ExpoImage } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export interface ImageProps {
  source: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'post';
  shape?: 'square' | 'circle' | 'rounded';
  fallbackText?: string;
  showError?: boolean;
  showLoading?: boolean;
  fallbackSource?: string;
  style?: any;
  onError?: (error: any) => void;
  onLoad?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  source,
  size = 'md',
  shape = 'square',
  fallbackText = 'Image',
  showError = true,
  showLoading = true,
  fallbackSource,
  style,
  onError,
  onLoad,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [currentSource, setCurrentSource] = useState(source);

  // Reset when source changes
  useEffect(() => {
    setCurrentSource(source);
    setHasError(false);
  }, [source]);

  const handleError = (error: any) => {
    if (!hasError && fallbackSource) {
      // Try fallback URL
      setCurrentSource(fallbackSource);
      setHasError(true);
    } else {
      // Both attempts failed
      onError?.(error);
    }
  };

  const imageStyle = [
    styles.base,
    styles[`size_${size}` as keyof typeof styles],
    styles[`shape_${shape}` as keyof typeof styles],
    style,
  ];

  return (
    <ExpoImage
      key={currentSource}
      source={{ uri: currentSource }}
      style={imageStyle}
      onError={handleError}
      onLoad={() => {
        onLoad?.();
      }}
      contentFit="cover"
      transition={200}
      placeholder={fallbackText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#F8F9FA',
  },
  size_xs: { width: 24, height: 24 },
  size_sm: { width: 32, height: 32 },
  size_md: { width: 48, height: 48 },
  size_lg: { width: 64, height: 64 },
  size_xl: { width: 80, height: 80 },
  size_2xl: { width: 120, height: 120 },
  size_full: {
    width: screenWidth,
    height: screenWidth * 0.75,
  },
  size_post: {
    width: screenWidth,
    height: screenWidth,
  },
  shape_square: { borderRadius: 0 },
  shape_circle: { borderRadius: 999 },
  shape_rounded: { borderRadius: 8 },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  fallbackIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  fallbackText: {
    fontSize: 10,
    opacity: 0.7,
  },
});
