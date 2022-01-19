import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/widgets/social_media_icon.dart';

import '../../../constants.dart';

class HomeTab extends StatelessWidget {
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
                  "WELCOME TO MY WEBSITE! ",
                  style: TextStyle(
                    fontSize: height * 0.03,
                    fontFamily: 'Montserrat',
                    fontWeight: FontWeight.w300,
                    color: Colors.white,
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
                  color: Colors.white,
                  letterSpacing: 1.5),
            ),
            Text(
              "Djabari",
              style: TextStyle(
                fontSize: height * 0.07,
                fontFamily: 'Montserrat',
                fontWeight: FontWeight.w500,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.play_arrow_rounded,
                  color: kPrimaryColor,
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
                          color: Colors.white,
                          fontWeight: FontWeight.w200),
                      speed: Duration(milliseconds: 50),
                    ),
                    TyperAnimatedText(
                      " Android Developer",
                      textStyle: TextStyle(
                          fontSize: height * 0.03,
                          fontFamily: 'Montserrat',
                          color: Colors.white,
                          fontWeight: FontWeight.w200),
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
                  )
              ],
            )
          ],
        ),
      ),
    );
  }
}
