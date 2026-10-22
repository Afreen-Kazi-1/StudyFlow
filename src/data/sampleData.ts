export type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  instructor: string;
  progress: number;
};

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Complete React Native Lab',
    subject: 'Mobile Computing',
    dueDate: 'Today',
    completed: false,
  },
  {
    id: '2',
    title: 'Revise Binary Trees',
    subject: 'Data Structures',
    dueDate: 'Tomorrow',
    completed: false,
  },
  {
    id: '3',
    title: 'Prepare ML Assignment',
    subject: 'Machine Learning',
    dueDate: 'Friday',
    completed: true,
  },
  {
    id: '4',
    title: 'Complete Robotics Report',
    subject: 'Robotics',
    dueDate: 'Saturday',
    completed: false,
  },
];

export const sampleCourses: Course[] = [
  {
    id: '1',
    name: 'Data Structures',
    code: 'CS301',
    instructor: 'Dr. Sharma',
    progress: 0.82,
  },
  {
    id: '2',
    name: 'Machine Learning',
    code: 'CS305',
    instructor: 'Dr. Mehta',
    progress: 0.68,
  },
  {
    id: '3',
    name: 'Mobile Computing',
    code: 'CS307',
    instructor: 'Prof. Rao',
    progress: 0.74,
  },
  {
    id: '4',
    name: 'Robotics',
    code: 'RO301',
    instructor: 'Dr. Patel',
    progress: 0.61,
  },
];