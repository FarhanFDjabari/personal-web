import 'package:flutter/material.dart';

final personalDarkTheme = ThemeData.dark().copyWith(
  brightness: Brightness.dark,
  primaryColorDark: kPrimaryColor,
  primaryColor: kPrimaryColor,
  highlightColor: kPrimaryColor,
  canvasColor: Colors.white,
  backgroundColor: kBackgroundColor,
  textTheme: personalTextTheme,
  colorScheme: ColorScheme.fromSwatch(
          primarySwatch: Colors.green, brightness: Brightness.dark)
      .copyWith(
    secondary: kPrimaryColor,
  ),
);

final personalLightTheme = ThemeData.light().copyWith(
  brightness: Brightness.light,
  primaryColorDark: kBackgroundColor,
  primaryColor: kBackgroundColor,
  highlightColor: kPrimaryColor,
  canvasColor: Colors.white,
  backgroundColor: kShadyWhite,
  textTheme: personalTextTheme,
  colorScheme: ColorScheme.fromSwatch(
          primarySwatch: Colors.green, brightness: Brightness.light)
      .copyWith(
    secondary: kBackgroundColor,
  ),
);

final personalTextTheme = TextTheme();

const kPrimaryColor = Color(0xFF5FBE94);
const kShadyWhite = Color(0xFFe8e8e8);
const kBackgroundColor = Color(0xFF00203F);
const kSwitchTrackColor = Color(0xFF499171);
