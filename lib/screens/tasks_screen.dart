import 'package:flutter/material.dart';

import '../data/sample_data.dart';
import '../models/task.dart';
import '../widgets/task_card.dart';

class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> {
  final List<Task> _tasks = List.of(sampleTasks);
  String _selectedFilter = 'All';

  List<Task> get _visibleTasks {
    return _tasks.where((task) {
      switch (_selectedFilter) {
        case 'Today':
          return task.dueDate == 'Today';
        case 'Tomorrow':
          return task.dueDate == 'Tomorrow';
        case 'Upcoming':
          return task.dueDate != 'Today';
        case 'Completed':
          return task.completed;
        default:
          return true;
      }
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        const Text(
          'Tasks',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Keep track of your assignments and study goals.',
          style: TextStyle(
            color: Colors.grey,
          ),
        ),
        const SizedBox(height: 24),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  for (final filter in [
                    'All',
                    'Today',
                    'Tomorrow',
                    'Upcoming',
                    'Completed',
                  ])
                    FilterChip(
                      label: Text(filter),
                      selected: _selectedFilter == filter,
                      onSelected: (_) {
                        setState(() => _selectedFilter = filter);
                      },
                    ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            FilledButton.icon(
              onPressed: _showAddTaskDialog,
              icon: const Icon(Icons.add),
              label: const Text('Add task'),
            ),
          ],
        ),
        const SizedBox(height: 20),
        if (_visibleTasks.isEmpty)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 32),
            child: Center(
              child: Text('No tasks match this filter.'),
            ),
          )
        else
          ..._visibleTasks.map(
            (task) => TaskCard(
              task: task,
              onChanged: (completed) {
                setState(() {
                  final index = _tasks.indexOf(task);
                  _tasks[index] = task.copyWith(completed: completed);
                });
              },
            ),
          ),
      ],
    );
  }

  Future<void> _showAddTaskDialog() async {
    final task = await showDialog<Task>(
      context: context,
      builder: (_) => const _AddTaskDialog(),
    );

    if (task != null && mounted) {
      setState(() => _tasks.add(task));
    }
  }
}

class _AddTaskDialog extends StatefulWidget {
  const _AddTaskDialog();

  @override
  State<_AddTaskDialog> createState() => _AddTaskDialogState();
}

class _AddTaskDialogState extends State<_AddTaskDialog> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _subjectController = TextEditingController();
  final _dueDateController = TextEditingController(text: 'Today');

  @override
  void dispose() {
    _titleController.dispose();
    _subjectController.dispose();
    _dueDateController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Add task'),
      content: Form(
        key: _formKey,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
            TextFormField(
              controller: _titleController,
              autofocus: true,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(labelText: 'Task'),
              validator: (value) => value == null || value.trim().isEmpty
                  ? 'Enter a task name'
                  : null,
            ),
            TextFormField(
              controller: _subjectController,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(labelText: 'Subject'),
              validator: (value) => value == null || value.trim().isEmpty
                  ? 'Enter a subject'
                  : null,
            ),
            TextFormField(
              controller: _dueDateController,
              textInputAction: TextInputAction.done,
              onFieldSubmitted: (_) => _submit(),
              decoration: const InputDecoration(
                labelText: 'Due date',
                hintText: 'Today, Tomorrow, or Aug 28',
              ),
              validator: (value) => value == null || value.trim().isEmpty
                  ? 'Enter a due date'
                  : null,
            ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Cancel'),
        ),
        FilledButton(
          onPressed: _submit,
          child: const Text('Add'),
        ),
      ],
    );
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      Navigator.pop(
        context,
        Task(
          title: _titleController.text.trim(),
          subject: _subjectController.text.trim(),
          dueDate: _dueDateController.text.trim(),
        ),
      );
    }
  }
}
