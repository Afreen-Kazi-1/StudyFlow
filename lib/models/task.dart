class Task {
  final String title;
  final String subject;
  final String dueDate;
  final bool completed;

  Task({
    required this.title,
    required this.subject,
    required this.dueDate,
    this.completed = false,
  });

  Task copyWith({
    String? title,
    String? subject,
    String? dueDate,
    bool? completed,
  }) {
    return Task(
      title: title ?? this.title,
      subject: subject ?? this.subject,
      dueDate: dueDate ?? this.dueDate,
      completed: completed ?? this.completed,
    );
  }
}
