import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          const CircleAvatar(radius: 42, child: Icon(Icons.person, size: 42)),
          const SizedBox(height: 16),
          const Center(
            child: Text('Alex Johnson', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(height: 4),
          const Center(child: Text('Computer Science Student')),
          const SizedBox(height: 28),
          Card(
            child: Column(
              children: const [
                ListTile(
                  leading: Icon(Icons.email_outlined),
                  title: Text('Email'),
                  subtitle: Text('alex.johnson@example.com'),
                ),
                Divider(height: 1),
                ListTile(
                  leading: Icon(Icons.school_outlined),
                  title: Text('Program'),
                  subtitle: Text('BSc Computer Science'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
