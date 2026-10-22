import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CourseCard from '../components/CourseCard';
import { sampleCourses } from '../data/sampleData';

export default function CoursesScreen() {
  const averageProgress = Math.round(
    sampleCourses.reduce(
      (total, course) => total + course.progress,
      0
    ) / sampleCourses.length * 100
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>My Courses</Text>
      <Text style={styles.subtitle}>
        Track your academic progress.
      </Text>

      <View style={styles.summary}>
        <Text style={styles.summaryNumber}>
          {sampleCourses.length}
        </Text>
        <Text style={styles.summaryLabel}>
          Enrolled Courses
        </Text>

        <Text style={styles.summaryNumber}>
          {averageProgress}%
        </Text>
        <Text style={styles.summaryLabel}>
          Average Progress
        </Text>
      </View>

      {sampleCourses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
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
    marginBottom: 22,
  },
  summary: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 22,
    alignItems: 'center',
  },
  summaryNumber: {
    color: '#4F46E5',
    fontSize: 27,
    fontWeight: '800',
    marginTop: 8,
  },
  summaryLabel: {
    color: '#64748B',
    marginTop: 4,
  },
});