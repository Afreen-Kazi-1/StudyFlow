# StudyFlow 📚

StudyFlow is a responsive student productivity app that helps students manage tasks, courses, schedules, and study progress through an adaptive interface optimized for mobile, tablet, and desktop devices.

## 🎯 Project Overview

StudyFlow was developed as part of **Experiment No. 3 – Developing Adaptive and Responsive Designs in Flutter**.

The application demonstrates how Flutter can create a single user interface that automatically adapts to different screen sizes and device orientations.

The application provides:

- 📊 Dashboard with study statistics
- ✅ Task management
- 📅 Daily schedule
- 📚 Course progress tracking
- ⚙️ Settings
- 📱 Mobile-specific navigation
- 📟 Tablet-specific navigation
- 🖥️ Desktop/web sidebar navigation
- 🔄 Portrait and landscape responsive layouts

---

## ✨ Features

### Dashboard

The dashboard provides an overview of the student's academic activity, including:

- Number of pending tasks
- Study hours
- Number of courses
- Overall study progress
- Today's focus
- Upcoming tasks
- Course progress

### Task Management

Students can view their academic tasks and filter them by:

- All
- Today
- Upcoming
- Completed

### Schedule

The schedule displays:

- Subject
- Class time
- Room
- Class type
- Daily progress

### Courses

Each course displays:

- Course name
- Course code
- Instructor
- Completion percentage
- Progress indicator

### Settings

The settings section provides basic options for:

- Profile
- Notifications
- Appearance
- Application information

---

# 📱 Responsive Design

StudyFlow uses Flutter's responsive and adaptive layout capabilities to provide different interfaces depending on the available screen size.

## Mobile

For screens below **600 dp**, the application uses:

- Bottom navigation
- Single-column layouts
- Vertically stacked cards

```text
┌──────────────────────┐
│      StudyFlow       │
├──────────────────────┤
│ Dashboard            │
│                      │
│ ┌──────────────────┐ │
│ │ Tasks            │ │
│ └──────────────────┘ │
│                      │
│ ┌──────────────────┐ │
│ │ Study Progress   │ │
│ └──────────────────┘ │
│                      │
├──────────────────────┤
│ Home Tasks Schedule  │
└──────────────────────┘