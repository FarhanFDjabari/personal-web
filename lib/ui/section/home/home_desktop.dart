import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/widgets/adaptive_text.dart';
import 'package:personal_web/widgets/animator.dart';
import 'package:personal_web/widgets/entrance_fader.dart';
import 'package:personal_web/widgets/social_media_icon.dart';

import '../../../constants.dart';

class HomeDesktop extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Container(
      height: height - 50,
      width: width,
      child: Container(
        margin: EdgeInsets.fromLTRB(0, height * 0.2, 0, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AdaptiveText(
                  "WELCOME TO MY WEBSITE! ",
                  style: TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: height * 0.03,
                    fontWeight: FontWeight.w300,
                    color: Colors.white,
                  ),
                ),
                EntranceFader(
                  offset: Offset(0, 0),
                  delay: Duration(seconds: 2),
                  duration: Duration(milliseconds: 800),
                  child: Image.asset(
                    "assets/img/hi.gif",
                    height: height * 0.05,
                  ),
                ),
              ],
            ),
            SizedBox(
              height: height * 0.04,
            ),
            AdaptiveText(
              "Farhan Fadhilah",
              style: TextStyle(
                  fontFamily: 'Montserrat',
                  fontSize: width < 1200 ? height * 0.085 : height * 0.095,
                  fontWeight: FontWeight.w100,
                  color: Colors.white,
                  letterSpacing: 4.0),
            ),
            AdaptiveText(
              "Djabari",
              style: TextStyle(
                  fontFamily: 'Montserrat',
                  color: Colors.white,
                  fontSize: width < 1200 ? height * 0.085 : height * 0.095,
                  fontWeight: FontWeight.w500,
                  letterSpacing: 5.0),
            ),
            SizedBox(height: 20),
            EntranceFader(
              offset: Offset(-10, 0),
              delay: Duration(seconds: 1),
              duration: Duration(milliseconds: 800),
              child: Row(
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
                            fontFamily: 'Montserrat',
                            fontSize: height * 0.03,
                            color: Colors.white,
                            fontWeight: FontWeight.w200),
                        speed: Duration(milliseconds: 50),
                      ),
                      TyperAnimatedText(
                        " Android Developer",
                        textStyle: TextStyle(
                            fontFamily: 'Montserrat',
                            fontSize: height * 0.03,
                            color: Colors.white,
                            fontWeight: FontWeight.w200),
                        speed: Duration(milliseconds: 50),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(
              height: height * 0.05,
            ),
            Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                kSocialIcons.length,
                (index) => WidgetAnimator(
                  child: SocialMediaIconBtn(
                    icon: kSocialIcons[index],
                    socialLink: kSocialLinks[index],
                    height: height * 0.035,
                    horizontalPadding: width * 0.005,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
