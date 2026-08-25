import 'package:flutter/material.dart';
import '../models/task.dart';

class TaskCard extends StatelessWidget {
  final Task task;
  final ValueChanged<bool> onChanged;

  const TaskCard({
    super.key,
    required this.task,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 18,
          vertical: 8,
        ),
        leading: Checkbox(
          value: task.completed,
          onChanged: (value) {
            if (value != null) {
              onChanged(value);
            }
          },
        ),
        title: Text(
          task.title,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
          ),
        ),
        subtitle: Text(
          '${task.subject} • Due ${task.dueDate}',
        ),
        trailing: const Icon(
          Icons.chevron_right,
        ),
      ),
    );
  }
}
