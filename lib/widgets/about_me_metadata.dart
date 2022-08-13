import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/theme/theme_controller.dart';

class AboutMeMetaData extends GetView<ThemeController> {
  final String? data;
  final String? information;
  final Alignment? alignment;

  const AboutMeMetaData({Key? key, this.data, this.information, this.alignment})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;

    return Align(
      alignment: alignment ?? Alignment.center,
      child: RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: "$data: ",
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontFamily: 'Montserrat',
                fontSize: height * 0.018,
                color: controller.isDarkMode.isTrue
                    ? kShadyWhite
                    : kBackgroundColor,
              ),
            ),
            TextSpan(
              text: " $information\n",
              style: TextStyle(
                fontWeight: FontWeight.w300,
                fontFamily: 'Montserrat',
                fontSize: height * 0.018,
                letterSpacing: 1.0,
                color: controller.isDarkMode.isTrue
                    ? kShadyWhite
                    : kBackgroundColor,
                overflow: TextOverflow.fade,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
