import 'package:flutter/material.dart';

final personalTheme = ThemeData(
  brightness: Brightness.dark,
  primarySwatch: Colors.green,
  primaryColorDark: kPrimaryColor,
  primaryColor: kPrimaryColor,
  accentColor: kPrimaryColor,
  highlightColor: kPrimaryColor,
  canvasColor: Colors.white,
  textTheme: personalTextTheme,
);

final personalTextTheme = TextTheme();

const kPrimaryColor = Color(0xFF5FBE94);
const kBackgroundColor = Color(0xFF00203F);
