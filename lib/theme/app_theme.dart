import 'package:flutter/material.dart';

final personalTheme = ThemeData(
  brightness: Brightness.dark,
  primaryColorDark: kPrimaryColor,
  primaryColor: kPrimaryColor,
  highlightColor: kPrimaryColor,
  canvasColor: Colors.white,
  textTheme: personalTextTheme,
  colorScheme: ColorScheme.fromSwatch(
          primarySwatch: Colors.green, brightness: Brightness.dark)
      .copyWith(
    secondary: kPrimaryColor,
  ),
);

final personalTextTheme = TextTheme();

const kPrimaryColor = Color(0xFF5FBE94);
const kBackgroundColor = Color(0xFF00203F);
