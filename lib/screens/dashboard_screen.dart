import 'package:flutter/material.dart';

import '../data/sample_data.dart';
import '../widgets/dashboard_card.dart';
import '../widgets/progress_card.dart';
import '../widgets/task_card.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return OrientationBuilder(
          builder: (context, orientation) {
            final width = constraints.maxWidth;

            final isMobile = width < 600;
            final isLandscape =
                orientation == Orientation.landscape;

            int columns;

            if (isMobile) {
              columns = isLandscape ? 2 : 1;
            } else if (width < 1024) {
              columns = 2;
            } else {
              columns = 3;
            }

            return SingleChildScrollView(
              padding: EdgeInsets.all(
                isMobile ? 16 : 28,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _welcomeSection(),

                  const SizedBox(height: 24),

                  _summaryCards(columns),

                  const SizedBox(height: 24),

                  _mainContent(
                    isMobile: isMobile,
                    columns: columns,
                  ),

                  const SizedBox(height: 24),

                  _upcomingTasks(),
                ],
              ),
            );
          },
        );
      },
    );
  }

  // ------------------------------------------------------------
  // WELCOME
  // ------------------------------------------------------------

  Widget _welcomeSection() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Good morning! 👋',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 6),
        Text(
          'Here is your study overview for today.',
          style: TextStyle(
            color: Colors.grey,
          ),
        ),
      ],
    );
  }

  // ------------------------------------------------------------
  // SUMMARY CARDS
  // ------------------------------------------------------------

  Widget _summaryCards(int columns) {
    final cards = [
      const DashboardCard(
        title: 'Tasks',
        value: '4',
        subtitle: '2 due today',
        icon: Icons.check_circle_outline,
      ),
      const DashboardCard(
        title: 'Study Hours',
        value: '24h',
        subtitle: '+4h this week',
        icon: Icons.access_time,
      ),
      const DashboardCard(
        title: 'Courses',
        value: '6',
        subtitle: '4 in progress',
        icon: Icons.menu_book_outlined,
      ),
    ];

    return GridView.count(
      crossAxisCount: columns,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisSpacing: 16,
      mainAxisSpacing: 16,
      childAspectRatio: 1.8,
      children: cards,
    );
  }

  // ------------------------------------------------------------
  // MAIN CONTENT
  // ------------------------------------------------------------

  Widget _mainContent({
    required bool isMobile,
    required int columns,
  }) {
    if (columns == 1) {
      return const Column(
        children: [
          ProgressCard(),
          SizedBox(height: 16),
          _FocusCard(),
        ],
      );
    }

    return const Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          flex: 1,
          child: ProgressCard(),
        ),
        SizedBox(width: 16),
        Expanded(
          flex: 2,
          child: _FocusCard(),
        ),
      ],
    );
  }

  // ------------------------------------------------------------
  // UPCOMING TASKS
  // ------------------------------------------------------------

  Widget _upcomingTasks() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Upcoming Tasks',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),

        const SizedBox(height: 14),

        ...sampleTasks
            .take(3)
            .map(
              (task) => TaskCard(
                task: task,
                onChanged: (value) {},
              ),
            ),
      ],
    );
  }
}

// ============================================================
// FOCUS CARD
// ============================================================

class _FocusCard extends StatelessWidget {
  const _FocusCard();

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(22),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Text(
                  'Today\'s Focus',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Spacer(),
                Icon(Icons.more_horiz),
              ],
            ),

            const SizedBox(height: 22),

            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                Chip(
                  avatar: Icon(
                    Icons.code,
                    size: 16,
                  ),
                  label: const Text('DSA'),
                ),
                Chip(
                  avatar: Icon(
                    Icons.smart_toy,
                    size: 16,
                  ),
                  label: const Text('Machine Learning'),
                ),
                Chip(
                  avatar: Icon(
                    Icons.precision_manufacturing,
                    size: 16,
                  ),
                  label: const Text('Robotics'),
                ),
                Chip(
                  avatar: Icon(
                    Icons.phone_android,
                    size: 16,
                  ),
                  label: const Text('Flutter'),
                ),
              ],
            ),

            const SizedBox(height: 22),

            const Text(
              'You have completed 78% of your weekly study target.',
              style: TextStyle(
                color: Colors.grey,
              ),
            ),

            const SizedBox(height: 16),

            const LinearProgressIndicator(
              value: 0.78,
            ),
          ],
        ),
      ),
    );
  }
}