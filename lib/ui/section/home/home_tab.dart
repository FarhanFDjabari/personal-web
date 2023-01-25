import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:personal_web/inject.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/theme/theme_controller.dart';
import 'package:personal_web/widgets/social_media_icon.dart';

import '../../../constants.dart';
import '../../../core/localization/generated/l10n.dart';

class HomeTab extends GetView<ThemeController> {
  final _appLocale = locator<AppLocalizations>();

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Container(
      height: height,
      width: width,
      child: Container(
        margin: EdgeInsets.fromLTRB(
            0, width < 740 ? height * 0.15 : height * 0.2, 0, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "${_appLocale.homeGreetings} ",
                  style: TextStyle(
                    fontSize: height * 0.03,
                    fontFamily: 'Montserrat',
                    fontWeight: FontWeight.w300,
                    color: controller.isDarkMode.isTrue
                        ? kShadyWhite
                        : kBackgroundColor,
                  ),
                ),
                Image.asset(
                  "assets/img/hi.gif",
                  height: height * 0.05,
                ),
              ],
            ),
            SizedBox(
              height: height * 0.04,
            ),
            Text(
              "Farhan Fadhilah",
              style: TextStyle(
                  fontSize: height * 0.07,
                  fontFamily: 'Montserrat',
                  fontWeight: FontWeight.w100,
                  color: controller.isDarkMode.isTrue
                      ? kShadyWhite
                      : kBackgroundColor,
                  letterSpacing: 1.5),
            ),
            Text(
              "Djabari",
              style: TextStyle(
                fontSize: height * 0.07,
                fontFamily: 'Montserrat',
                fontWeight: FontWeight.w500,
                color: controller.isDarkMode.isTrue
                    ? kShadyWhite
                    : kBackgroundColor,
              ),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.play_arrow_rounded,
                  color: controller.isDarkMode.isTrue
                      ? kPrimaryColor
                      : kBackgroundColor,
                ),
                AnimatedTextKit(
                  isRepeatingAnimation: true,
                  repeatForever: true,
                  animatedTexts: [
                    TyperAnimatedText(
                      " Flutter Developer",
                      textStyle: TextStyle(
                          fontSize: height * 0.03,
                          fontFamily: 'Montserrat',
                          color: controller.isDarkMode.isTrue
                              ? kShadyWhite
                              : kBackgroundColor,
                          fontWeight: controller.isDarkMode.isTrue
                              ? FontWeight.w200
                              : FontWeight.w300),
                      speed: Duration(milliseconds: 50),
                    ),
                    TyperAnimatedText(
                      " Android Developer",
                      textStyle: TextStyle(
                          fontSize: height * 0.03,
                          fontFamily: 'Montserrat',
                          color: controller.isDarkMode.isTrue
                              ? kShadyWhite
                              : kBackgroundColor,
                          fontWeight: controller.isDarkMode.isTrue
                              ? FontWeight.w200
                              : FontWeight.w300),
                      speed: Duration(milliseconds: 50),
                    ),
                  ],
                ),
              ],
            ),
            SizedBox(
              height: height * 0.045,
            ),
            Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (int i = 0; i < kSocialIcons.length; i++)
                  SocialMediaIconBtn(
                    icon: kSocialIcons[i],
                    socialLink: kSocialLinks[i],
                    height: height * 0.035,
                    horizontalPadding: width * 0.01,
                    iconColor: controller.isDarkMode.isTrue
                        ? kShadyWhite
                        : kBackgroundColor,
                  )
              ],
            )
          ],
        ),
      ),
    );
  }
}
