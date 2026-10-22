import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';
import { sampleTasks, type Task } from '../data/sampleData';
import TaskCard from '../components/TaskCard';

type Filter = 'All' | 'Pending' | 'Completed';

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [filter, setFilter] = useState<Filter>('All');

  function toggleTask(id: string) {
    setTasks(previous =>
      previous.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <Text style={styles.heading}>My Tasks</Text>
      <Text style={styles.subtitle}>
        Organize your academic workload.
      </Text>

      <View style={styles.summary}>
        <View style={styles.summaryCard}>
          <Text style={styles.number}>{tasks.length}</Text>
          <Text style={styles.label}>Total Tasks</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.number}>
            {tasks.filter(task => task.completed).length}
          </Text>
          <Text style={styles.label}>Completed</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.number}>
            {tasks.filter(task => !task.completed).length}
          </Text>
          <Text style={styles.label}>Pending</Text>
        </View>
      </View>

      <View style={styles.filters}>
        {(['All', 'Pending', 'Completed'] as Filter[]).map(item => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {filteredTasks.length > 0 ? (
        filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={toggleTask}
          />
        ))
      ) : (
        <Text style={styles.empty}>
          No tasks in this category.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    padding: 22,
    paddingTop: 45,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  back: {
    color: '#4F46E5',
    fontWeight: '600',
    marginBottom: 22,
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
  summary: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  number: {
    fontSize: 23,
    fontWeight: '800',
    color: '#4F46E5',
  },
  label: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#E8EAF0',
  },
  activeFilter: {
    backgroundColor: '#5B5FEF',
  },
  filterText: {
    color: '#475569',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  empty: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 30,
  },
});