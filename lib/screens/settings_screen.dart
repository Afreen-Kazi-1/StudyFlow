import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  final bool isDarkMode;
  final ValueChanged<bool> onThemeChanged;
  final VoidCallback onProfileTap;

  const SettingsScreen({
    super.key,
    required this.isDarkMode,
    required this.onThemeChanged,
    required this.onProfileTap,
  });

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _notificationsEnabled = true;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        const Text(
          'Settings',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
        ),

        const SizedBox(height: 24),

        Card(
          child: Column(
            children: [
              ListTile(
                leading: Icon(Icons.person_outline),
                title: Text('Profile'),
                subtitle: Text('Manage your profile'),
                trailing: Icon(Icons.chevron_right),
                onTap: widget.onProfileTap,
              ),

              const Divider(height: 1),

              SwitchListTile(
                value: _notificationsEnabled,
                onChanged: (enabled) {
                  setState(() => _notificationsEnabled = enabled);
                },
                secondary: const Icon(
                  Icons.notifications_outlined,
                ),
                title: const Text('Notifications'),
                subtitle: const Text(
                  'Receive study reminders',
                ),
              ),

              const Divider(height: 1),

              SwitchListTile(
                value: widget.isDarkMode,
                onChanged: widget.onThemeChanged,
                secondary: const Icon(Icons.dark_mode_outlined),
                title: Text('Appearance'),
                subtitle: Text(widget.isDarkMode ? 'Dark mode' : 'Light mode'),
              ),
            ],
          ),
        ),

        const SizedBox(height: 20),

        const Card(
          child: ListTile(
            leading: Icon(Icons.info_outline),
            title: Text('About StudyFlow'),
            subtitle: Text(
              'Responsive Flutter application • v1.0',
            ),
          ),
        ),
      ],
    );
  }
}