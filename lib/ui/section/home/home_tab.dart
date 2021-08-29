import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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
      child: Stack(
        children: [
          // Positioned(
          //   bottom: width < 740 ? height * 0.1 : height * 0.15,
          //   right: width < 740 ? -width * 0.2 : -width * 0.1,
          //   child: Opacity(
          //     opacity: 0.9,
          //     child: Image.asset('assets/img/1.png', height: height * 0.75),
          //   ),
          // ),
          Container(
            margin: EdgeInsets.fromLTRB(
                width * 0.1, width < 740 ? height * 0.15 : height * 0.2, 0, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      "WELCOME TO MY WEBSITE! ",
                      style: GoogleFonts.montserrat(
                        fontSize: height * 0.03,
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
                  style: GoogleFonts.montserrat(
                      fontSize: height * 0.07,
                      fontWeight: FontWeight.w100,
                      color: Colors.white,
                      letterSpacing: 1.5),
                ),
                Text(
                  "Djabari",
                  style: GoogleFonts.montserrat(
                    fontSize: height * 0.07,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 20),
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
                  height: height * 0.045,
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
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
        ],
      ),
    );
  }
}
