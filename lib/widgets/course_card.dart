import 'package:flutter/material.dart';
import '../models/course.dart';

class CourseCard extends StatelessWidget {
  final Course course;

  const CourseCard({
    super.key,
    required this.course,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              child: Text(
                course.code.substring(0, 2),
              ),
            ),

            const SizedBox(height: 15),

            Text(
              course.name,
              style: const TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 4),

            Text(
              '${course.code} • ${course.instructor}',
              style: const TextStyle(
                color: Colors.grey,
                fontSize: 12,
              ),
            ),

            const Spacer(),

            const SizedBox(height: 15),

            Row(
              children: [
                Expanded(
                  child: LinearProgressIndicator(
                    value: course.progress,
                  ),
                ),

                const SizedBox(width: 10),

                Text(
                  '${(course.progress * 100).round()}%',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}