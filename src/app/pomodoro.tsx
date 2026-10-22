import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';

type Session = 'Focus' | 'Short Break';

const DURATIONS: Record<Session, number> = {
  Focus: 25 * 60,
  'Short Break': 5 * 60,
};

export default function PomodoroScreen() {
  const [session, setSession] = useState<Session>('Focus');
  const [remaining, setRemaining] = useState(DURATIONS.Focus);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining <= 0) return;

    const timer = setInterval(() => {
      setRemaining(previous => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [running, remaining]);

  useEffect(() => {
    if (remaining === 0) {
      setRunning(false);
    }
  }, [remaining]);

  function switchSession(next: Session) {
    setRunning(false);
    setSession(next);
    setRemaining(DURATIONS[next]);
  }

  function resetTimer() {
    setRunning(false);
    setRemaining(DURATIONS[session]);
  }

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, '0');

  const seconds = (remaining % 60)
    .toString()
    .padStart(2, '0');

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.replace('/')}
        accessibilityRole="button"
        accessibilityLabel="Return to dashboard"
        >
        <Text style={styles.backText}>← Dashboard</Text>
        </Pressable>

      <Text style={styles.heading}>Pomodoro Timer</Text>
      <Text style={styles.subtitle}>
        Focus on one task at a time.
      </Text>

      <View style={styles.sessionButtons}>
        {(['Focus', 'Short Break'] as Session[]).map(item => (
          <Pressable
            key={item}
            onPress={() => switchSession(item)}
            style={[
              styles.sessionButton,
              session === item && styles.activeSession,
            ]}
          >
            <Text
              style={[
                styles.sessionText,
                session === item && styles.activeSessionText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.timerCircle}>
        <Text style={styles.sessionLabel}>{session}</Text>
        <Text style={styles.timer}>
          {minutes}:{seconds}
        </Text>
        <Text style={styles.status}>
          {remaining === 0
            ? 'Session complete!'
            : running
              ? 'Stay focused'
              : 'Ready when you are'}
        </Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            if (remaining > 0) {
              setRunning(previous => !previous);
            }
          }}
        >
          <Text style={styles.primaryText}>
            {running ? 'Pause' : remaining === 0 ? 'Finished' : 'Start / Resume'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={resetTimer}
        >
          <Text style={styles.secondaryText}>Reset</Text>
        </Pressable>
      </View>

      <Text style={styles.note}>
        Focus for 25 minutes, then take a 5-minute break.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 24,
  },
  backText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  heading: {
    fontSize: 29,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  subtitle: {
    color: '#64748B',
    marginTop: 8,
    marginBottom: 28,
    textAlign: 'center',
  },
  sessionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  sessionButton: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: '#E8EAF0',
  },
  activeSession: {
    backgroundColor: '#5B5FEF',
  },
  sessionText: {
    color: '#475569',
    fontWeight: '600',
  },
  activeSessionText: {
    color: '#FFFFFF',
  },
  timerCircle: {
    width: 270,
    height: 270,
    borderRadius: 135,
    borderWidth: 10,
    borderColor: '#C7D2FE',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  sessionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  timer: {
    fontSize: 52,
    fontWeight: '800',
    color: '#4F46E5',
    marginVertical: 6,
    fontVariant: ['tabular-nums'],
  },
  status: {
    color: '#64748B',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#5B5FEF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#E8EAF0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  secondaryText: {
    color: '#334155',
    fontWeight: '700',
  },
  note: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 25,
    maxWidth: 300,
    lineHeight: 21,
  },
});