import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

import BottomNavigation from '../components/BottomNavigation';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </View>

      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  screen: {
    flex: 1,
  },
});