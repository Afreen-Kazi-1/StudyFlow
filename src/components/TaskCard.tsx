import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import type { Task } from '../data/sampleData';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
};

export default function TaskCard({ task, onToggle }: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        style={[
          styles.checkbox,
          task.completed && styles.checked,
        ]}
        onPress={() => onToggle(task.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={`Mark ${task.title} as ${
          task.completed ? 'incomplete' : 'complete'
        }`}
      >
        {task.completed && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </Pressable>

      <View style={styles.details}>
        <Text
          style={[
            styles.title,
            task.completed && styles.completedTitle,
          ]}
        >
          {task.title}
        </Text>

        <Text style={styles.subject}>
          {task.subject}
        </Text>

        <Text style={styles.dueDate}>
          Due: {task.dueDate}
        </Text>
      </View>

      <View
        style={[
          styles.badge,
          task.completed && styles.completedBadge,
        ]}
      >
        <Text style={styles.badgeText}>
          {task.completed ? 'Done' : 'Pending'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#5B5FEF',
    borderColor: '#5B5FEF',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  subject: {
    color: '#64748B',
    marginTop: 5,
    fontSize: 13,
  },
  dueDate: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 12,
  },
  badge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
});