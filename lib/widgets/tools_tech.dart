import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/theme/theme_controller.dart';

import 'adaptive_text.dart';

class ToolTechWidget extends GetView<ThemeController> {
  final String? techName;

  const ToolTechWidget({Key? key, this.techName}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 12.0),
      child: Row(
        children: [
          Icon(
            Icons.play_arrow,
            color:
                controller.isDarkMode.isTrue ? kPrimaryColor : kBackgroundColor,
            size: MediaQuery.of(context).size.height * 0.02,
          ),
          AdaptiveText(
            " $techName ",
            style: TextStyle(
              color:
                  controller.isDarkMode.isTrue ? kShadyWhite : kBackgroundColor,
            ),
          )
        ],
      ),
    );
  }
}
