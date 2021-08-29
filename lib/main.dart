import 'package:flutter/material.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/ui/landing_page.dart';
import 'package:url_strategy/url_strategy.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  setPathUrlStrategy();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Farhan Fadhilah Djabari\'s Website',
      theme: personalTheme,
      routes: {
        '/': (context) => LandingPage(),
      },
      initialRoute: '/',
    );
  }
}
