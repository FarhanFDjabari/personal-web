import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:personal_web/theme/app_theme.dart';

class ThemeController extends GetxController {
  RxBool isDarkMode = true.obs;

  void toggleDarkMode() {
    isDarkMode(!isDarkMode.value);
    if (isDarkMode.isTrue) {
      Get.changeTheme(personalDarkTheme);
    } else {
      Get.changeTheme(personalLightTheme);
    }
  }
}
