// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:studyflow/screens/tasks_screen.dart';

void main() {
  testWidgets('tasks can be completed and filtered', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(body: TasksScreen()),
      ),
    );

    expect(find.text('Complete Flutter Lab'), findsOneWidget);
    await tester.tap(find.byType(Checkbox).first);
    await tester.pump();

    await tester.tap(find.text('Completed'));
    await tester.pump();
    expect(find.text('Complete Flutter Lab'), findsOneWidget);
    expect(find.text('Revise Binary Trees'), findsNothing);

    await tester.tap(find.text('Tomorrow'));
    await tester.pump();
    expect(find.text('Revise Binary Trees'), findsOneWidget);
    expect(find.text('Complete Flutter Lab'), findsNothing);
  });

  testWidgets('a task can be added', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(body: TasksScreen()),
      ),
    );

    await tester.tap(find.text('Add task'));
    await tester.pumpAndSettle();
    await tester.enterText(
      find.byType(TextFormField).at(0),
      'Read chapter five',
    );
    await tester.enterText(find.byType(TextFormField).at(1), 'Physics');
    await tester.enterText(find.byType(TextFormField).at(2), 'Today');
    await tester.tap(find.text('Add').last);
    await tester.pumpAndSettle();

    expect(find.text('Read chapter five'), findsOneWidget);
  });
}
