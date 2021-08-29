import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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
      child: Stack(
        children: [
          // Positioned(
          //   top: width < 1200 ? height * 0.15 : height * 0.1,
          //   right: width * 0.01,
          //   child: Opacity(
          //     opacity: 0.9,
          //     child: EntranceFader(
          //       offset: Offset(0, 0),
          //       delay: Duration(seconds: 1),
          //       duration: Duration(milliseconds: 800),
          //       child: Image.asset(
          //         'assets/img/1.png',
          //         height: width < 1200 ? height * 0.8 : height * 0.85,
          //       ),
          //     ),
          //   ),
          // ),
          Container(
            margin:
                EdgeInsets.fromLTRB(width * 0.1, height * 0.2, width * 0.1, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    AdaptiveText(
                      "WELCOME TO MY WEBSITE! ",
                      style: GoogleFonts.montserrat(
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
                  style: GoogleFonts.montserrat(
                      fontSize: width < 1200 ? height * 0.085 : height * 0.095,
                      fontWeight: FontWeight.w100,
                      color: Colors.white,
                      letterSpacing: 4.0),
                ),
                AdaptiveText(
                  "Djabari",
                  style: GoogleFonts.montserrat(
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
                            textStyle: GoogleFonts.montserrat(
                                fontSize: height * 0.03,
                                color: Colors.white,
                                fontWeight: FontWeight.w200),
                            speed: Duration(milliseconds: 50),
                          ),
                          TyperAnimatedText(
                            " Android Developer",
                            textStyle: GoogleFonts.montserrat(
                                fontSize: height * 0.03,
                                color: Colors.white,
                                fontWeight: FontWeight.w200),
                            speed: Duration(milliseconds: 50),
                          ),
                          TyperAnimatedText(
                            " Web Developer",
                            textStyle: GoogleFonts.montserrat(
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
        ],
      ),
    );
  }
}
