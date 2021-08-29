import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/widgets/about_me_metadata.dart';
import 'package:personal_web/widgets/community_icon.dart';
import 'package:personal_web/widgets/custom_button.dart';
import 'package:personal_web/widgets/custom_heading.dart';
import 'package:personal_web/widgets/tools_tech.dart';
import 'package:universal_html/html.dart' as html;

import '../../../constants.dart';

class AboutTab extends StatelessWidget {
  final _communityLogoHeight = [60.0, 70.0, 30.0];

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
          CustomSectionHeading(text: "\nAbout Me"),
          CustomSectionSubHeading(text: "Get to know me"),
          // Image.asset(
          //   'assets/img/mob.png',
          //   height: height * 0.3,
          // ),
          SizedBox(
            height: height * 0.03,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              "Who am I?",
              style: GoogleFonts.montserrat(
                  color: kPrimaryColor, fontSize: height * 0.028),
            ),
          ),
          SizedBox(
            height: height * 0.032,
          ),
          Text(
            "I'm Farhan Fadhilah Djabari, a Front-end mobile developer.",
            style: GoogleFonts.montserrat(
              fontSize: height * 0.035,
              fontWeight: FontWeight.w400,
              color: Colors.white,
            ),
          ),
          SizedBox(
            height: height * 0.02,
          ),
          Text(
            "I'm a Final Year Information Technology student who is currently enrolled in Brawijaya University, Malang. I've been developing mobile apps with flutter for about a year. I'm a person who has a very high curiosity and easily adapts to new technologies. I have a goal to become a mobile application developer, therefore I joined as a member of one software developer community on my university called Basic Computing Community.",
            style: GoogleFonts.montserrat(
              fontSize: height * 0.02,
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
                bottom: BorderSide(color: Colors.grey[700]!, width: 2.0),
              ),
            ),
          ),
          SizedBox(
            height: height * 0.02,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              "Technologies I have worked with:",
              style: GoogleFonts.montserrat(
                  color: kPrimaryColor, fontSize: height * 0.018),
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
                bottom: BorderSide(color: Colors.grey[700]!, width: 2.0),
              ),
            ),
          ),
          SizedBox(
            height: height * 0.025,
          ),
          Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AboutMeMetaData(
                    data: "Name",
                    information: "Farhan Fadhilah Djabari",
                  ),
                  AboutMeMetaData(
                    data: "Age",
                    information: "20",
                  ),
                ],
              ),
              SizedBox(
                width: width > 710 ? width * 0.2 : width * 0.05,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AboutMeMetaData(
                    data: "Email",
                    information: "ffadhilah8@gmail.com",
                  ),
                  AboutMeMetaData(
                    data: "From",
                    information: "Balikpapan, ID",
                  ),
                ],
              ),
            ],
          ),
          SizedBox(
            height: height * 0.02,
          ),
          Row(
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: OutlinedCustomBtn(
                    btnText: "Resume",
                    onPressed: () {
                      kIsWeb
                          ? html.window.open(
                              'https://drive.google.com/file/d/1p558eaBaZSyfYQyDs5rTHel0k7_tIQVY/view?usp=sharing',
                              "pdf")
                          : launchURL(
                              'https://drive.google.com/file/d/1p558eaBaZSyfYQyDs5rTHel0k7_tIQVY/view?usp=sharing');
                    }),
              ),
              Container(
                width: width * 0.05,
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(color: Colors.grey[700]!, width: 2.0),
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
          )
        ],
      ),
    );
  }
}
