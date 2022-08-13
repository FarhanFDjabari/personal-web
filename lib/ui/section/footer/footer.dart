import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:personal_web/core/localization/generated/l10n.dart';
import 'package:personal_web/inject.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/theme/theme_controller.dart';
import 'package:personal_web/widgets/adaptive_text.dart';

class Footer extends GetView<ThemeController> {
  final _appLocale = locator<AppLocalizations>();

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Container(
      margin: EdgeInsets.fromLTRB(0, height * 0.05, 0, 0),
      height: height * 0.07,
      width: width,
      color: controller.isDarkMode.isTrue ? kBackgroundColor : kShadyWhite,
      child: Center(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            AdaptiveText(
              _appLocale.footerBody,
              style: TextStyle(
                fontWeight: FontWeight.w300,
                fontFamily: 'Montserrat',
                color: controller.isDarkMode.isTrue
                    ? kShadyWhite
                    : kBackgroundColor,
              ),
            ),
            AdaptiveText(
              "Flutter",
              style: TextStyle(
                fontWeight: FontWeight.w500,
                fontFamily: 'Montserrat',
                color: Colors.blue,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
