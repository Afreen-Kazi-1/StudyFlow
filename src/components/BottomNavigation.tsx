import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { router, usePathname } from 'expo-router';

const tabs = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Tasks', path: '/tasks', icon: '✓' },
  { label: 'Pomodoro', path: '/pomodoro', icon: '◷' },
  { label: 'Courses', path: '/courses', icon: '▤' },
  { label: 'Settings', path: '/settings', icon: '⚙' },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const compact = width < 400;

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const active = pathname === tab.path;

        return (
          <Pressable
            key={tab.path}
            onPress={() => router.replace(tab.path as any)}
            style={styles.tab}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={tab.label}
          >
            <Text
              style={[
                styles.icon,
                active && styles.activeText,
              ]}
            >
              {tab.icon}
            </Text>

            {!compact && (
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  active && styles.activeText,
                ]}
              >
                {tab.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EAF0',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    gap: 4,
  },
  icon: {
    fontSize: 19,
    color: '#64748B',
  },
  label: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  activeText: {
    color: '#5B5FEF',
    fontWeight: '800',
  },
});