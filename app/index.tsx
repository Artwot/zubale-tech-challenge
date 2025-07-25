import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from '../src/components/atoms';

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text variant="title" weight="bold" color="success" align="center">
          🚀 Zubale Tech Challenge
        </Text>
        <Text
          variant="subtitle"
          color="secondary"
          align="center"
          style={styles.subtitle}
        >
          Instagram-like Feed
        </Text>
        <Text
          variant="body"
          weight="semibold"
          color="primary"
          align="center"
          style={styles.description}
        >
          Esto ya funciona!
        </Text>
        <View style={styles.infoContainer}>
          <Text
            variant="caption"
            color="secondary"
            align="center"
            style={styles.info}
          >
            • Atomic Design: Ready{'\n'}• TypeScript: Configured{'\n'}• Context
            API: Setup{'\n'}• ESLint + Prettier: Active{'\n'}• Testing: Ready
            {'\n'}• Estructura: Lista 🎯
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    marginBottom: 20,
  },
  description: {
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
  },
  info: {
    lineHeight: 24,
  },
});
