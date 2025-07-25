import React, { useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../atoms';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto hide after 2 seconds (reduced for better UX)
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo/Icon placeholder */}
        <View style={styles.logoContainer}>
          <Text
            variant="title"
            weight="bold"
            color="primary"
            style={styles.logo}
          >
            📱
          </Text>
        </View>

        {/* App Name */}
        <Text
          variant="title"
          weight="bold"
          color="primary"
          style={styles.appName}
        >
          Zubale Tech Challenge
        </Text>

        {/* Subtitle */}
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Instagram-like Feed
        </Text>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDot} />
          <View style={[styles.loadingDot, styles.loadingDotDelayed]} />
          <View style={[styles.loadingDot, styles.loadingDotMoreDelayed]} />
        </View>
      </Animated.View>

      {/* Skip button for development */}
      <TouchableOpacity style={styles.skipButton} onPress={onFinish}>
        <Text variant="caption" color="primary">
          Skip (Dev)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    fontSize: 64,
  },
  appName: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 48,
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginHorizontal: 4,
  },
  loadingDotDelayed: {
    animationDelay: '0.2s',
  },
  loadingDotMoreDelayed: {
    animationDelay: '0.4s',
  },
  skipButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
});
