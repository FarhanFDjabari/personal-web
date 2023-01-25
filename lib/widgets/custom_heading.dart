import 'package:flutter/material.dart';
import 'package:get/state_manager.dart';
import 'package:personal_web/theme/theme_controller.dart';

import '../theme/app_theme.dart';
import 'adaptive_text.dart';

class CustomSectionHeading extends GetView<ThemeController> {
  final String text;

  const CustomSectionHeading({Key? key, required this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AdaptiveText(
      text,
      style: TextStyle(
        fontSize: MediaQuery.of(context).size.height * 0.075,
        fontFamily: 'Montserrat',
        fontWeight: FontWeight.w100,
        letterSpacing: 1.0,
        color: controller.isDarkMode.isTrue ? kShadyWhite : kBackgroundColor,
      ),
    );
  }
}

class CustomSectionSubHeading extends GetView<ThemeController> {
  final String text;

  const CustomSectionSubHeading({Key? key, required this.text})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AdaptiveText(
      text,
      style: TextStyle(
        fontWeight:
            controller.isDarkMode.isTrue ? FontWeight.w200 : FontWeight.w400,
        fontFamily: 'Montserrat',
        color: controller.isDarkMode.isTrue ? kShadyWhite : kBackgroundColor,
      ),
    );
  }
}
