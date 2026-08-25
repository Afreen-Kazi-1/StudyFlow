import '../models/task.dart';
import '../models/course.dart';
import '../models/schedule_item.dart';

final List<Task> sampleTasks = [
  Task(
    title: 'Complete Flutter Lab',
    subject: 'Mobile Computing',
    dueDate: 'Today',
  ),
  Task(
    title: 'Revise Binary Trees',
    subject: 'Data Structures',
    dueDate: 'Tomorrow',
  ),
  Task(
    title: 'Prepare ML Assignment',
    subject: 'Machine Learning',
    dueDate: 'Aug 28',
  ),
  Task(
    title: 'Submit Robotics Report',
    subject: 'Robotics',
    dueDate: 'Aug 30',
  ),
];

final List<Course> sampleCourses = [
  Course(
    name: 'Data Structures',
    code: 'CS301',
    instructor: 'Dr. Sharma',
    progress: 0.82,
  ),
  Course(
    name: 'Machine Learning',
    code: 'CS305',
    instructor: 'Dr. Mehta',
    progress: 0.68,
  ),
  Course(
    name: 'Mobile Computing',
    code: 'CS307',
    instructor: 'Prof. Rao',
    progress: 0.74,
  ),
  Course(
    name: 'Robotics',
    code: 'RO301',
    instructor: 'Dr. Patel',
    progress: 0.61,
  ),
];

final List<ScheduleItem> scheduleItems = [
  ScheduleItem(
    subject: 'Machine Learning',
    time: '10:00 AM',
    room: 'Room 204',
    type: 'Lecture',
  ),
  ScheduleItem(
    subject: 'Data Structures',
    time: '12:00 PM',
    room: 'Room 101',
    type: 'Lecture',
  ),
  ScheduleItem(
    subject: 'Robotics',
    time: '02:00 PM',
    room: 'Robotics Lab',
    type: 'Lab',
  ),
  ScheduleItem(
    subject: 'Mobile Computing',
    time: '04:00 PM',
    room: 'Room 305',
    type: 'Practical',
  ),
];