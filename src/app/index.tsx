import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { router } from 'expo-router';
import {
  sampleTasks,
  sampleCourses,
  type Task,
} from '../data/sampleData';

export default function DashboardScreen() {
  const { width } = useWindowDimensions();

  const isTablet = width >= 600;
  const isDesktop = width >= 1024;

  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    task => !task.completed
  ).length;

  const completionPercentage =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  function toggleTask(id: string) {
    setTasks(previous =>
      previous.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function openTasks() {
    router.push('/tasks');
  }

  function openPomodoro() {
    router.push('/pomodoro');
  }

  function openCourses() {
    router.push('/courses');
  }

  function openSettings() {
    router.push('/settings');
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.container,
        isDesktop && styles.desktopContainer,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>S</Text>
          </View>

          <View>
            <Text style={styles.brandName}>StudyFlow</Text>
            <Text style={styles.brandSubtitle}>
              Your personal study companion
            </Text>
          </View>
        </View>

        <Pressable
          onPress={openSettings}
          style={styles.profileButton}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
        >
          <Text style={styles.profileText}>AK</Text>
        </Pressable>
      </View>

      {/* WELCOME SECTION */}

      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>

        <Text style={styles.welcomeTitle}>
          Ready to make progress?
        </Text>

        <Text style={styles.welcomeSubtitle}>
          Stay organized, focus on your goals, and make
          every study session count.
        </Text>
      </View>

      {/* SUMMARY CARDS */}

      <View
        style={[
          styles.statsContainer,
          isTablet && styles.statsTablet,
        ]}
      >
        <StatCard
          title="Total Tasks"
          value={String(tasks.length)}
          subtitle="Academic tasks"
          icon="☑"
          accent="#5B5FEF"
        />

        <StatCard
          title="Completed"
          value={String(completedTasks)}
          subtitle="Tasks finished"
          icon="✓"
          accent="#16A34A"
        />

        <StatCard
          title="Pending"
          value={String(pendingTasks)}
          subtitle="Tasks remaining"
          icon="◷"
          accent="#EA580C"
        />

        <StatCard
          title="Course Progress"
          value={`${Math.round(
            sampleCourses.reduce(
              (total, course) => total + course.progress,
              0
            ) / Math.max(sampleCourses.length, 1) * 100
          )}%`}
          subtitle="Average completion"
          icon="▤"
          accent="#9333EA"
        />
      </View>

      {/* QUICK ACTIONS */}

      <View style={styles.section}>
        <SectionHeader
          title="Quick Actions"
          subtitle="What would you like to do?"
        />

        <View
          style={[
            styles.actionsContainer,
            isTablet && styles.actionsTablet,
          ]}
        >
          <ActionCard
            icon="◷"
            title="Pomodoro Timer"
            description="Start a focused study session."
            buttonText="Start Studying"
            color="#5B5FEF"
            onPress={openPomodoro}
          />

          <ActionCard
            icon="✓"
            title="Manage Tasks"
            description="Review and complete your tasks."
            buttonText="View Tasks"
            color="#0D9488"
            onPress={openTasks}
          />

          <ActionCard
            icon="▤"
            title="My Courses"
            description="Track your academic progress."
            buttonText="View Courses"
            color="#9333EA"
            onPress={openCourses}
          />
        </View>
      </View>

      {/* MAIN CONTENT */}

      <View
        style={[
          styles.mainContent,
          isDesktop && styles.mainContentDesktop,
        ]}
      >
        {/* TASKS */}

        <View
          style={[
            styles.contentColumn,
            isDesktop && styles.desktopColumn,
          ]}
        >
          <View style={styles.section}>
            <SectionHeader
              title="Upcoming Tasks"
              subtitle="Keep track of your academic work."
              actionText="View All"
              onAction={openTasks}
            />

            {tasks.slice(0, 4).map(task => (
              <Pressable
                key={task.id}
                style={styles.taskCard}
                onPress={() => toggleTask(task.id)}
                accessibilityRole="checkbox"
                accessibilityState={{
                  checked: task.completed,
                }}
                accessibilityLabel={`${
                  task.completed ? 'Completed' : 'Pending'
                }: ${task.title}. Press to toggle completion.`}
              >
                <View
                  style={[
                    styles.taskCheckbox,
                    task.completed && styles.taskCheckboxChecked,
                  ]}
                >
                  {task.completed && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>

                <View style={styles.taskDetails}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.taskCompleted,
                    ]}
                  >
                    {task.title}
                  </Text>

                  <Text style={styles.taskSubject}>
                    {task.subject}
                  </Text>

                  <Text style={styles.taskDue}>
                    Due: {task.dueDate}
                  </Text>
                </View>

                <View
                  style={[
                    styles.taskBadge,
                    task.completed
                      ? styles.doneBadge
                      : styles.pendingBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.taskBadgeText,
                      task.completed
                        ? styles.doneBadgeText
                        : styles.pendingBadgeText,
                    ]}
                  >
                    {task.completed ? 'Done' : 'Pending'}
                  </Text>
                </View>
              </Pressable>
            ))}

            {tasks.length === 0 && (
              <Text style={styles.emptyText}>
                No tasks available.
              </Text>
            )}

            <Pressable
              style={styles.outlineButton}
              onPress={openTasks}
            >
              <Text style={styles.outlineButtonText}>
                Manage All Tasks →
              </Text>
            </Pressable>
          </View>
        </View>

        {/* STUDY PROGRESS AND COURSES */}

        <View
          style={[
            styles.contentColumn,
            isDesktop && styles.desktopColumn,
          ]}
        >
          {/* PROGRESS */}

          <View style={styles.section}>
            <SectionHeader
              title="Study Progress"
              subtitle="Your current task completion."
            />

            <View style={styles.progressCard}>
              <View style={styles.progressTop}>
                <Text style={styles.progressLabel}>
                  Overall Completion
                </Text>

                <Text style={styles.progressPercentage}>
                  {completionPercentage}%
                </Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${completionPercentage}%` },
                  ]}
                />
              </View>

              <Text style={styles.progressDescription}>
                {completedTasks} of {tasks.length} tasks completed.
              </Text>

              <Pressable
                style={styles.primaryButton}
                onPress={openTasks}
              >
                <Text style={styles.primaryButtonText}>
                  Continue Progress
                </Text>
              </Pressable>
            </View>
          </View>

          {/* COURSES */}

          <View style={styles.section}>
            <SectionHeader
              title="My Courses"
              subtitle="Your current learning progress."
              actionText="View All"
              onAction={openCourses}
            />

            {sampleCourses.slice(0, 3).map(course => (
              <Pressable
                key={course.id}
                style={styles.courseCard}
                onPress={openCourses}
                accessibilityRole="button"
                accessibilityLabel={`View ${course.name} course`}
              >
                <View style={styles.courseHeader}>
                  <View style={styles.courseIcon}>
                    <Text style={styles.courseIconText}>
                      {course.name.charAt(0)}
                    </Text>
                  </View>

                  <View style={styles.courseDetails}>
                    <Text style={styles.courseName}>
                      {course.name}
                    </Text>

                    <Text style={styles.courseCode}>
                      {course.code}
                    </Text>
                  </View>

                  <Text style={styles.coursePercentage}>
                    {Math.round(course.progress * 100)}%
                  </Text>
                </View>

                <View style={styles.courseProgressTrack}>
                  <View
                    style={[
                      styles.courseProgressFill,
                      {
                        width: `${
                          Math.round(course.progress * 100)
                        }%`,
                      },
                    ]}
                  />
                </View>
              </Pressable>
            ))}

            <Pressable
              style={styles.outlineButton}
              onPress={openCourses}
            >
              <Text style={styles.outlineButtonText}>
                Explore All Courses →
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* POMODORO BANNER */}

      <Pressable
        style={styles.pomodoroBanner}
        onPress={openPomodoro}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.bannerEyebrow}>
            FOCUS MODE
          </Text>

          <Text style={styles.bannerTitle}>
            Time to concentrate.
          </Text>

          <Text style={styles.bannerSubtitle}>
            Start a 25-minute focused study session.
          </Text>
        </View>

        <View style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>▶</Text>
        </View>
      </Pressable>

      {/* FOOTER */}

      <Text style={styles.footer}>
        StudyFlow • Learn consistently, progress confidently.
      </Text>
    </ScrollView>
  );
}

/* REUSABLE STATISTICS CARD */

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  accent: string;
};

function StatCard({
  title,
  value,
  subtitle,
  icon,
  accent,
}: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}>
        <View
          style={[
            styles.statIcon,
            { backgroundColor: `${accent}18` },
          ]}
        >
          <Text
            style={[
              styles.statIconText,
              { color: accent },
            ]}
          >
            {icon}
          </Text>
        </View>

        <Text style={styles.statTitle}>{title}</Text>
      </View>

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );
}

/* REUSABLE SECTION HEADER */

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  actionText?: string;
  onAction?: () => void;
};

function SectionHeader({
  title,
  subtitle,
  actionText,
  onAction,
}: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderContent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>
          {subtitle}
        </Text>
      </View>

      {actionText && onAction && (
        <Pressable onPress={onAction}>
          <Text style={styles.sectionAction}>
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

/* REUSABLE QUICK ACTION CARD */

type ActionCardProps = {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  color: string;
  onPress: () => void;
};

function ActionCard({
  icon,
  title,
  description,
  buttonText,
  color,
  onPress,
}: ActionCardProps) {
  return (
    <View style={styles.actionCard}>
      <View
        style={[
          styles.actionIcon,
          { backgroundColor: `${color}18` },
        ]}
      >
        <Text
          style={[
            styles.actionIconText,
            { color },
          ]}
        >
          {icon}
        </Text>
      </View>

      <Text style={styles.actionTitle}>{title}</Text>

      <Text style={styles.actionDescription}>
        {description}
      </Text>

      <Pressable
        style={[
          styles.actionButton,
          { backgroundColor: color },
        ]}
        onPress={onPress}
      >
        <Text style={styles.actionButtonText}>
          {buttonText} →
        </Text>
      </Pressable>
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  container: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 1400,
    alignSelf: 'center',
  },

  desktopContainer: {
    paddingHorizontal: 36,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#5B5FEF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  brandName: {
    color: '#1E293B',
    fontSize: 21,
    fontWeight: '800',
  },

  brandSubtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 3,
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    color: '#4F46E5',
    fontWeight: '800',
  },

  welcomeSection: {
    marginBottom: 26,
  },

  greeting: {
    color: '#5B5FEF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  welcomeTitle: {
    color: '#1E293B',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
  },

  welcomeSubtitle: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 9,
    maxWidth: 650,
  },

  statsContainer: {
    gap: 14,
    marginBottom: 32,
  },

  statsTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EAF0',
    minHeight: 125,
    flexGrow: 1,
    flexBasis: '45%',
  },

  statTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    flexWrap: 'wrap',
  },

  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statIconText: {
    fontSize: 18,
    fontWeight: '800',
  },

  statTitle: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },

  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 12,
  },

  statSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 3,
  },

  section: {
    marginBottom: 30,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 18,
  },

  sectionHeaderContent: {
    flex: 1,
  },

  sectionTitle: {
    color: '#1E293B',
    fontSize: 19,
    fontWeight: '800',
  },

  sectionSubtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 5,
    lineHeight: 18,
  },

  sectionAction: {
    color: '#5B5FEF',
    fontWeight: '700',
    fontSize: 12,
  },

  actionsContainer: {
    gap: 14,
  },

  actionsTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  actionCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EAF0',
    flexGrow: 1,
    flexBasis: '30%',
    minWidth: 0,
  },

  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  actionIconText: {
    fontSize: 22,
    fontWeight: '800',
  },

  actionTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '800',
  },

  actionDescription: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
    marginBottom: 17,
    minHeight: 38,
  },

  actionButton: {
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },

  mainContent: {
    gap: 8,
  },

  mainContentDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 26,
  },

  contentColumn: {
    minWidth: 0,
  },

  desktopColumn: {
    flex: 1,
  },

  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E8EAF0',
    marginBottom: 11,
  },

  taskCheckbox: {
    width: 23,
    height: 23,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  taskCheckboxChecked: {
    backgroundColor: '#5B5FEF',
    borderColor: '#5B5FEF',
  },

  checkmark: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  taskDetails: {
    flex: 1,
    minWidth: 0,
  },

  taskTitle: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '700',
  },

  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },

  taskSubject: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 5,
  },

  taskDue: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 4,
  },

  taskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },

  doneBadge: {
    backgroundColor: '#DCFCE7',
  },

  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },

  taskBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  doneBadgeText: {
    color: '#166534',
  },

  pendingBadgeText: {
    color: '#92400E',
  },

  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    padding: 20,
  },

  outlineButton: {
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginTop: 5,
  },

  outlineButtonText: {
    color: '#4F46E5',
    fontWeight: '700',
    fontSize: 12,
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 19,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },

  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 13,
  },

  progressLabel: {
    color: '#64748B',
    fontSize: 12,
    flexShrink: 1,
  },

  progressPercentage: {
    color: '#4F46E5',
    fontSize: 15,
    fontWeight: '800',
  },

  progressTrack: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#5B5FEF',
    borderRadius: 10,
  },

  progressDescription: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 12,
    marginBottom: 17,
  },

  primaryButton: {
    backgroundColor: '#5B5FEF',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },

  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8EAF0',
    marginBottom: 11,
  },

  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 13,
  },

  courseIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  courseIconText: {
    color: '#4F46E5',
    fontSize: 17,
    fontWeight: '800',
  },

  courseDetails: {
    flex: 1,
    minWidth: 0,
  },

  courseName: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '700',
  },

  courseCode: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },

  coursePercentage: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '800',
  },

  courseProgressTrack: {
    height: 7,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },

  courseProgressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#5B5FEF',
  },

  pomodoroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    backgroundColor: '#312E81',
    borderRadius: 18,
    padding: 22,
    marginTop: 5,
    marginBottom: 24,
  },

  bannerContent: {
    flex: 1,
  },

  bannerEyebrow: {
    color: '#C7D2FE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 8,
  },

  bannerSubtitle: {
    color: '#E0E7FF',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },

  bannerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bannerButtonText: {
    color: '#4F46E5',
    fontSize: 18,
  },

  footer: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 18,
    marginTop: 4,
  },
});