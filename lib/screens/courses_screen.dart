import 'package:flutter/material.dart';

import '../data/sample_data.dart';
import '../widgets/course_card.dart';

class CoursesScreen extends StatelessWidget {
  const CoursesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;

        final columns = width < 600
            ? 1
            : width < 1000
                ? 2
                : 3;

        return SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'My Courses',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 8),

              const Text(
                'Track your academic progress.',
                style: TextStyle(
                  color: Colors.grey,
                ),
              ),

              const SizedBox(height: 24),

              if (columns == 1)
                Column(
                  children: sampleCourses
                      .map(
                        (course) => Padding(
                          padding:
                              const EdgeInsets.only(bottom: 16),
                          child: SizedBox(
                            height: 190,
                            child: CourseCard(
                              course: course,
                            ),
                          ),
                        ),
                      )
                      .toList(),
                )
              else
                GridView.builder(
                  shrinkWrap: true,
                  physics:
                      const NeverScrollableScrollPhysics(),
                  itemCount: sampleCourses.length,
                  gridDelegate:
                      SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: columns,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16,
                    mainAxisExtent: 190,
                  ),
                  itemBuilder: (context, index) {
                    return CourseCard(
                      course: sampleCourses[index],
                    );
                  },
                ),
            ],
          ),
        );
      },
    );
  }
}