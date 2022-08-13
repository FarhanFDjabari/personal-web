import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:personal_web/inject.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/theme/theme_controller.dart';
import 'package:personal_web/widgets/about_me_metadata.dart';
import 'package:personal_web/widgets/community_icon.dart';
import 'package:personal_web/widgets/custom_button.dart';
import 'package:personal_web/widgets/custom_heading.dart';
import 'package:personal_web/widgets/tools_tech.dart';

import '../../../constants.dart';
import '../../../core/localization/generated/l10n.dart';

class AboutMobile extends GetView<ThemeController> {
  final _communityLogoHeight = [40.0];
  final _appLocale = locator<AppLocalizations>();

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: width * 0.05,
      ),
      child: Column(
        children: [
          CustomSectionHeading(text: "\n${_appLocale.aboutMeHeading}"),
          CustomSectionSubHeading(text: _appLocale.aboutMeSubHeading),
          SizedBox(
            height: height * 0.03,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              _appLocale.aboutMeContentHeading,
              style: TextStyle(
                color: kPrimaryColor,
                fontFamily: 'Montserrat',
                fontSize: height * 0.025,
              ),
            ),
          ),
          SizedBox(
            height: height * 0.028,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              _appLocale.aboutMeContentBody,
              style: TextStyle(
                fontSize: height * 0.022,
                fontFamily: 'Montserrat',
                fontWeight: FontWeight.w400,
                color: controller.isDarkMode.isTrue
                    ? kShadyWhite
                    : kBackgroundColor,
              ),
            ),
          ),
          SizedBox(
            height: height * 0.02,
          ),
          Text(
            _appLocale.aboutMeContentBody2,
            style: TextStyle(
              fontSize: height * 0.018,
              fontFamily: 'Montserrat',
              color: controller.isDarkMode.isTrue
                  ? Colors.grey[500]
                  : kBackgroundColor,
              height: 1.5,
            ),
          ),
          SizedBox(
            height: height * 0.025,
          ),
          Container(
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(color: Colors.grey[700]!, width: 1.0),
              ),
            ),
          ),
          SizedBox(
            height: height * 0.015,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              _appLocale.aboutMeTechStack,
              style: TextStyle(
                color: kPrimaryColor,
                fontSize: height * 0.015,
                fontFamily: 'Montserrat',
              ),
            ),
          ),
          Row(
            children: [
              for (int i = 0; i < 4; i++)
                ToolTechWidget(
                  techName: kTools[i],
                ),
            ],
          ),
          SizedBox(
            height: height * 0.015,
          ),
          Container(
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                    color: controller.isDarkMode.isTrue
                        ? Colors.grey[700]!
                        : kBackgroundColor,
                    width: 1.0),
              ),
            ),
          ),
          SizedBox(
            height: height * 0.02,
          ),
          AboutMeMetaData(
            data: _appLocale.aboutMeFullName,
            information: "Farhan Fadhilah Djabari",
            alignment: Alignment.centerLeft,
          ),
          AboutMeMetaData(
            data: _appLocale.aboutMePersonalEmail,
            information: "ffadhilah8@gmail.com",
            alignment: Alignment.centerLeft,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Row(
              children: [
                Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: OutlinedCustomBtn(
                      btnText: "Resume",
                      onPressed: () {
                        launchURL(
                            'https://drive.google.com/file/d/1p558eaBaZSyfYQyDs5rTHel0k7_tIQVY/view?usp=sharing');
                      }),
                ),
                Container(
                  width: width * 0.2,
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(
                          color: controller.isDarkMode.isTrue
                              ? Colors.grey[700]!
                              : kBackgroundColor,
                          width: 2.0),
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(
            height: height * 0.02,
          ),
          Row(
            children: [
              for (int i = 0; i < kCommunityLogo.length; i++)
                CommunityIconBtn(
                  icon: kCommunityLogo[i],
                  link: kCommunityLinks[i],
                  height: _communityLogoHeight[i],
                ),
            ],
          ),
        ],
      ),
    );
  }
}
