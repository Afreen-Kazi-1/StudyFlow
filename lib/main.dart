import 'package:flutter/material.dart';

import 'screens/dashboard_screen.dart';
import 'screens/tasks_screen.dart';
import 'screens/schedule_screen.dart';
import 'screens/courses_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/settings_screen.dart';
import 'widgets/desktop_sidebar.dart';

void main() {
  runApp(const StudyFlowApp());
}

// ============================================================
// APP
// ============================================================

class StudyFlowApp extends StatefulWidget {
  const StudyFlowApp({super.key});

  @override
  State<StudyFlowApp> createState() => _StudyFlowAppState();
}

class _StudyFlowAppState extends State<StudyFlowApp> {
  ThemeMode _themeMode = ThemeMode.light;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'StudyFlow',
      themeMode: _themeMode,

      theme: ThemeData(
        useMaterial3: true,

        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
        ),

        scaffoldBackgroundColor:
            const Color(0xFFF7F7FA),

        cardTheme: const CardThemeData(
          elevation: 0,
          margin: EdgeInsets.zero,
        ),
      ),

      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
        cardTheme: const CardThemeData(
          elevation: 0,
          margin: EdgeInsets.zero,
        ),
      ),

      home: MainScreen(
        isDarkMode: _themeMode == ThemeMode.dark,
        onThemeChanged: (isDark) {
          setState(() {
            _themeMode = isDark ? ThemeMode.dark : ThemeMode.light;
          });
        },
      ),
    );
  }
}

// ============================================================
// MAIN SCREEN
// ============================================================

class MainScreen extends StatefulWidget {
  final bool isDarkMode;
  final ValueChanged<bool> onThemeChanged;

  const MainScreen({
    super.key,
    required this.isDarkMode,
    required this.onThemeChanged,
  });

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int selectedIndex = 0;
  final List<String> _notifications = [
    'Your Flutter Lab is due today.',
    'Pomodoro reminder: take a short break.',
    'New course material is available.',
  ];

  final List<String> titles = [
    'Dashboard',
    'Tasks',
    'Pomodoro',
    'Courses',
    'Settings',
  ];

  List<Widget> get screens => [
    const DashboardScreen(),
    const TasksScreen(),
    const ScheduleScreen(),
    const CoursesScreen(),
    SettingsScreen(
      isDarkMode: widget.isDarkMode,
      onThemeChanged: widget.onThemeChanged,
      onProfileTap: _openProfile,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;

        // ======================================================
        // DESKTOP
        // ======================================================

        if (width > 1024) {
          return _desktopLayout();
        }

        // ======================================================
        // TABLET
        // ======================================================

        if (width >= 600) {
          return _tabletLayout();
        }

        // ======================================================
        // MOBILE
        // ======================================================

        return _mobileLayout();
      },
    );
  }

  // ==========================================================
  // DESKTOP
  // ==========================================================

  Widget _desktopLayout() {
    return Scaffold(
      body: Row(
        children: [
          DesktopSidebar(
            selectedIndex: selectedIndex,
            onItemSelected: (index) {
              setState(() {
                selectedIndex = index;
              });
            },
          ),

          const VerticalDivider(
            width: 1,
          ),

          Expanded(
            child: Column(
              children: [
                _desktopTopBar(),

                Expanded(
                  child: screens[selectedIndex],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ==========================================================
  // TABLET
  // ==========================================================

  Widget _tabletLayout() {
    return Scaffold(
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: selectedIndex,

            onDestinationSelected: (index) {
              setState(() {
                selectedIndex = index;
              });
            },

            labelType: NavigationRailLabelType.all,

            destinations: const [
              NavigationRailDestination(
                icon: Icon(Icons.home_outlined),
                selectedIcon: Icon(Icons.home),
                label: Text('Home'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.check_circle_outline),
                selectedIcon: Icon(Icons.check_circle),
                label: Text('Tasks'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.calendar_month_outlined),
                selectedIcon: Icon(Icons.calendar_month),
                label: Text('Pomodoro'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.menu_book_outlined),
                selectedIcon: Icon(Icons.menu_book),
                label: Text('Courses'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.settings_outlined),
                selectedIcon: Icon(Icons.settings),
                label: Text('Settings'),
              ),
            ],
          ),

          const VerticalDivider(
            width: 1,
          ),

          Expanded(
            child: Column(
              children: [
                _desktopTopBar(),

                Expanded(
                  child: screens[selectedIndex],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ==========================================================
  // MOBILE
  // ==========================================================

  Widget _mobileLayout() {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.school),
            SizedBox(width: 8),
            Text('StudyFlow', style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),

        actions: [
          IconButton(
            icon: const Icon(
              Icons.notifications_none,
            ),
            onPressed: _showNotifications,
          ),
        ],
      ),

      body: screens[selectedIndex],

      bottomNavigationBar: NavigationBar(
        selectedIndex: selectedIndex,

        onDestinationSelected: (index) {
          setState(() {
            selectedIndex = index;
          });
        },

        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.check_circle_outline),
            selectedIcon: Icon(Icons.check_circle),
            label: 'Tasks',
          ),
          NavigationDestination(
            icon: Icon(Icons.calendar_month_outlined),
            selectedIcon: Icon(Icons.calendar_month),
            label: 'Pomodoro',
          ),
          NavigationDestination(
            icon: Icon(Icons.menu_book_outlined),
            selectedIcon: Icon(Icons.menu_book),
            label: 'Courses',
          ),
          NavigationDestination(
            icon: Icon(Icons.settings_outlined),
            selectedIcon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }

  // ==========================================================
  // TOP BAR
  // ==========================================================

  Widget _desktopTopBar() {
    return Container(
      height: 72,
      padding: const EdgeInsets.symmetric(
        horizontal: 28,
      ),
      color: Colors.white,

      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(7),
            decoration: BoxDecoration(
              color: Colors.deepPurple,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.school, color: Colors.white, size: 20),
          ),
          const SizedBox(width: 10),
          const Text(
            'StudyFlow',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(width: 28),
          const VerticalDivider(width: 1),
          const SizedBox(width: 28),
          Text(
            titles[selectedIndex],
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),

          const Spacer(),

          IconButton(
            icon: const Icon(
              Icons.notifications_none,
            ),
            onPressed: _showNotifications,
          ),

          const SizedBox(width: 12),

          const CircleAvatar(
            child: Icon(Icons.school),
          ),
        ],
      ),
    );
  }

  void _showNotifications() {
    showModalBottomSheet<void>(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            return SafeArea(
              child: _notifications.isEmpty
                  ? const Padding(
                      padding: EdgeInsets.all(32),
                      child: Center(child: Text('No notifications')),
                    )
                  : ListView(
                      shrinkWrap: true,
                      padding: const EdgeInsets.all(16),
                      children: [
                        const Text(
                          'Notifications',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        ..._notifications.asMap().entries.map(
                          (entry) => Dismissible(
                            key: ValueKey(entry.key),
                            direction: DismissDirection.horizontal,
                            onDismissed: (_) {
                              setState(() => _notifications.removeAt(entry.key));
                              setSheetState(() {});
                            },
                            background: _dismissBackground(false),
                            secondaryBackground: _dismissBackground(true),
                            child: ListTile(
                              leading: const Icon(Icons.notifications_outlined),
                              title: Text(entry.value),
                            ),
                          ),
                        ),
                      ],
                    ),
            );
          },
        );
      },
    );
  }

  Widget _dismissBackground(bool right) {
    return Container(
      color: Colors.red.shade100,
      alignment: right ? Alignment.centerRight : Alignment.centerLeft,
      padding: EdgeInsets.only(left: right ? 0 : 20, right: right ? 20 : 0),
      child: const Icon(Icons.delete_outline),
    );
  }

  void _openProfile() {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => const ProfileScreen()),
    );
  }
}