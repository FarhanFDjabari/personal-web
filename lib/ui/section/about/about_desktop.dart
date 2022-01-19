import 'package:flutter/material.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/widgets/about_me_metadata.dart';
import 'package:personal_web/widgets/adaptive_text.dart';
import 'package:personal_web/widgets/community_icon.dart';
import 'package:personal_web/widgets/custom_button.dart';
import 'package:personal_web/widgets/custom_heading.dart';
import 'package:personal_web/widgets/tools_tech.dart';
import 'package:universal_html/html.dart' as html;

import '../../../constants.dart';

class AboutDesktop extends StatelessWidget {
  final _communityLogoHeight = [60.0, 70.0, 30.0];

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: width * 0.02,
      ),
      child: Column(
        children: [
          CustomSectionHeading(text: "\nAbout Me"),
          CustomSectionSubHeading(text: "Get to know me"),
          SizedBox(height: 30.0),
          Row(
            children: [
              Expanded(
                flex: width < 1230 ? 2 : 1,
                child: Container(
                  padding: EdgeInsets.only(
                    left: width * 0.1,
                    right: width * 0.1,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      AdaptiveText(
                        "Who am I?",
                        style: TextStyle(
                          color: kPrimaryColor,
                          fontSize: height * 0.025,
                          fontFamily: 'Montserrat',
                        ),
                      ),
                      SizedBox(
                        height: height * 0.03,
                      ),
                      AdaptiveText(
                        "I'm Farhan Fadhilah Djabari, a Mobile Developer.",
                        style: TextStyle(
                          fontSize: height * 0.035,
                          fontFamily: 'Montserrat',
                          fontWeight: FontWeight.w400,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(
                        height: height * 0.02,
                      ),
                      AdaptiveText(
                        "I'm a Final Year Information Technology student who is currently enrolled in Brawijaya University, Malang. I've been developing mobile apps with flutter for about a year. I'm a person who has a very high curiosity and easily adapts to new technologies. I have a goal to become great mobile application developer, therefore I joined as a member of software developer community on my university called Basic Computing Community.",
                        style: TextStyle(
                          fontSize: height * 0.02,
                          fontFamily: 'Montserrat',
                          color: Colors.grey[500],
                          height: 2.0,
                        ),
                      ),
                      SizedBox(
                        height: height * 0.025,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(
                                color: Colors.grey[700]!, width: 2.0),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: height * 0.02,
                      ),
                      AdaptiveText(
                        "Technologies I have worked with:",
                        style: TextStyle(
                          color: kPrimaryColor,
                          fontSize: height * 0.018,
                          fontFamily: 'Montserrat',
                        ),
                      ),
                      Row(
                        children: [
                          for (int i = 0; i < kTools.length; i++)
                            ToolTechWidget(
                              techName: kTools[i],
                            ),
                        ],
                      ),
                      SizedBox(
                        height: height * 0.02,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(
                                color: Colors.grey[700]!, width: 2.0),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: height * 0.025,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          AboutMeMetaData(
                            data: "Full Name",
                            information: "Farhan Fadhilah Djabari",
                          ),
                          AboutMeMetaData(
                            data: "Personal Email",
                            information: "ffadhilah8@gmail.com",
                          ),
                        ],
                      ),
                      SizedBox(
                        height: height * 0.02,
                      ),
                      Row(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(right: 8.0),
                            child: OutlinedCustomBtn(
                              onPressed: () {
                                html.window.open(
                                    'https://drive.google.com/file/d/1p558eaBaZSyfYQyDs5rTHel0k7_tIQVY/view?usp=sharing',
                                    "pdf");
                              },
                              btnText: "Resume",
                            ),
                          ),
                          Container(
                            width: width * 0.05,
                            decoration: BoxDecoration(
                              border: Border(
                                bottom: BorderSide(
                                    color: Colors.grey[700]!, width: 2.0),
                              ),
                            ),
                          ),
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
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
