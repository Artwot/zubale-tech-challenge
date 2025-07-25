import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.title}>🚀 Zubale Tech Challenge</Text>
        <Text style={styles.subtitle}>Instagram-like Feed</Text>
        <Text style={styles.description}>
          Estructura base configurada correctamente ✅
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
