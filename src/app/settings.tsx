import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Switch,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView
      style={[
        styles.container,
        darkMode && styles.darkContainer,
      ]}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[
          styles.heading,
          darkMode && styles.darkText,
        ]}
      >
        Settings
      </Text>

      <Text
        style={[
          styles.subtitle,
          darkMode && styles.darkSubtext,
        ]}
      >
        Customize your StudyFlow experience.
      </Text>

      <View
        style={[
          styles.card,
          darkMode && styles.darkCard,
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          Preferences
        </Text>

        <SettingRow
          title="Notifications"
          description="Enable study-related notifications."
          value={notifications}
          onValueChange={setNotifications}
        />

        <SettingRow
          title="Study Reminders"
          description="Receive reminders for study sessions."
          value={studyReminders}
          onValueChange={setStudyReminders}
        />

        <SettingRow
          title="Dark Mode"
          description="Preview a darker settings interface."
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </View>

      <View
        style={[
          styles.card,
          darkMode && styles.darkCard,
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          About
        </Text>

        <Text
          style={[
            styles.aboutText,
            darkMode && styles.darkSubtext,
          ]}
        >
          StudyFlow is a student productivity application
          developed using React Native and Expo.
        </Text>

        <Text
          style={[
            styles.version,
            darkMode && styles.darkSubtext,
          ]}
        >
          Version 1.0.0
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>
          Return to Dashboard
        </Text>
      </Pressable>
    </ScrollView>
  );
}

type SettingRowProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function SettingRow({
  title,
  description,
  value,
  onValueChange,
}: SettingRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: '#CBD5E1',
          true: '#A5B4FC',
        }}
        thumbColor={value ? '#4F46E5' : '#F8FAFC'}
        accessibilityLabel={title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  content: {
    padding: 22,
    paddingTop: 45,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1E293B',
  },
  subtitle: {
    color: '#64748B',
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
  },
  darkCard: {
    backgroundColor: '#1F2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E8EAF0',
    gap: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },
  settingDescription: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 5,
    lineHeight: 18,
  },
  darkText: {
    color: '#F9FAFB',
  },
  darkSubtext: {
    color: '#CBD5E1',
  },
  aboutText: {
    color: '#64748B',
    lineHeight: 22,
  },
  version: {
    color: '#64748B',
    marginTop: 12,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#5B5FEF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});