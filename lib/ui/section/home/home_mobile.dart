import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/widgets/social_media_icon.dart';

import '../../../constants.dart';

class HomeMobile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Container(
      height: height,
      width: width,
      child: Stack(
        children: [
          // Positioned(
          //   bottom: 0.0,
          //   right: -width * 0.25,
          //   child: Opacity(
          //     opacity: 0.9,
          //     child: Image.asset('assets/img/1.png', height: height * 0.65),
          //   ),
          // ),
          Container(
            margin: EdgeInsets.fromLTRB(width * 0.07, height * 0.12, 0, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      "WELCOME TO MY WEBSITE! ",
                      style: GoogleFonts.montserrat(
                          fontSize: height * 0.025,
                          color: Colors.white,
                          fontWeight: FontWeight.w200),
                    ),
                    Image.asset(
                      "assets/img/hi.gif",
                      height: height * 0.03,
                    ),
                  ],
                ),
                SizedBox(
                  height: height * 0.01,
                ),
                Text(
                  "Farhan Fadhilah",
                  style: GoogleFonts.montserrat(
                      fontSize: height * 0.055,
                      color: Colors.white,
                      fontWeight: FontWeight.w100,
                      letterSpacing: 1.1),
                ),
                Text(
                  "Djabari",
                  style: GoogleFonts.montserrat(
                      color: Colors.white,
                      fontSize: height * 0.055,
                      fontWeight: FontWeight.w500),
                ),
                SizedBox(height: 15),
                Row(
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
                SizedBox(
                  height: height * 0.035,
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    for (int i = 0; i < kSocialIcons.length; i++)
                      SocialMediaIconBtn(
                        icon: kSocialIcons[i],
                        socialLink: kSocialLinks[i],
                        height: height * 0.03,
                        horizontalPadding: 2.0,
                      )
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
