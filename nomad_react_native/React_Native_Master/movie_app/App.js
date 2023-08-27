import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, Image, useColorScheme, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {  useAssets } from 'expo-asset'
import Tabs from './navigation/Tab';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './styled';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {

  const queryClient = new QueryClient()
  const isDark = useColorScheme() === 'dark';
  const [assets] = useAssets([require('./assets/jian.jpeg')])
  const [loaded] = Font.useFonts(Ionicons.font)

  const onLayoutRootView = useCallback(async () => {
    if (assets && loaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [assets, loaded]);

  if (!assets) {
    return null;
  }


  return (

    // <View
    //   style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    //   onLayout={onLayoutRootView}>
    //   <Text>SplashScreen Demo! 👋</Text>
    //   <Entypo name="rocket" size={30} />
    // </View>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <>
        <View onLayout={onLayoutRootView}></View>
        <StatusBar barStyle='default'></StatusBar>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
      </>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

