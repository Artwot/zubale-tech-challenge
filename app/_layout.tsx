import {
  DancingScript_400Regular,
  DancingScript_700Bold,
  useFonts,
} from '@expo-google-fonts/dancing-script';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SplashScreen as CustomSplashScreen } from '../src/components/templates';

// Hide the native splash screen immediately
SplashScreen.hideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    DancingScript_700Bold,
  });

  useEffect(() => {
    // Reset state on every mount (for hot reload)
    setIsReady(false);
    setShowCustomSplash(true);

    async function prepare() {
      try {
        // Wait for fonts to load
        await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced loading time
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const handleCustomSplashFinish = () => {
    setShowCustomSplash(false);
  };

  // Show splash screen while fonts are loading
  if (!fontsLoaded) {
    return <CustomSplashScreen onFinish={handleCustomSplashFinish} />;
  }

  if (!isReady || showCustomSplash) {
    return <CustomSplashScreen onFinish={handleCustomSplashFinish} />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
