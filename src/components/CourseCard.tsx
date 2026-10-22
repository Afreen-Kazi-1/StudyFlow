import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import type { Course } from '../data/sampleData';

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  const percentage = Math.round(course.progress * 100);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>
            {course.name.charAt(0)}
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.name}>{course.name}</Text>
          <Text style={styles.code}>{course.code}</Text>
        </View>
      </View>

      <Text style={styles.instructor}>
        Instructor: {course.instructor}
      </Text>

      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>
          Course Progress
        </Text>
        <Text style={styles.percentage}>
          {percentage}%
        </Text>
      </View>

      <View
        style={styles.progressTrack}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: 100,
          now: percentage,
        }}
      >
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  code: {
    color: '#64748B',
    marginTop: 4,
  },
  instructor: {
    color: '#64748B',
    marginTop: 16,
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  percentage: {
    fontWeight: '700',
    color: '#4F46E5',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5B5FEF',
    borderRadius: 10,
  },
});