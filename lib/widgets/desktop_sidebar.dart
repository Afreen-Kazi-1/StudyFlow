import 'package:flutter/material.dart';

class DesktopSidebar extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onItemSelected;

  const DesktopSidebar({
    super.key,
    required this.selectedIndex,
    required this.onItemSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 240,
      color: Colors.white,
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(
                  Icons.school,
                  color: Colors.white,
                ),
              ),

              const SizedBox(width: 10),

              const Text(
                'StudyFlow',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),

          const SizedBox(height: 40),

          _item(
            icon: Icons.home_outlined,
            label: 'Dashboard',
            index: 0,
          ),

          _item(
            icon: Icons.check_circle_outline,
            label: 'Tasks',
            index: 1,
          ),

          _item(
            icon: Icons.timer_outlined,
            label: 'Pomodoro',
            index: 2,
          ),

          _item(
            icon: Icons.menu_book_outlined,
            label: 'Courses',
            index: 3,
          ),

          _item(
            icon: Icons.settings_outlined,
            label: 'Settings',
            index: 4,
          ),

          const Spacer(),

          const Text(
            'StudyFlow v1.0',
            style: TextStyle(
              color: Colors.grey,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _item({
    required IconData icon,
    required String label,
    required int index,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 6),
      child: ListTile(
        selected: selectedIndex == index,
        selectedTileColor: Colors.deepPurple.shade50,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        leading: Icon(icon),
        title: Text(label),
        onTap: () => onItemSelected(index),
      ),
    );
  }
}