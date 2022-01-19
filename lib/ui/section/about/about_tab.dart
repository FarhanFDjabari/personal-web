import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/widgets/about_me_metadata.dart';
import 'package:personal_web/widgets/community_icon.dart';
import 'package:personal_web/widgets/custom_button.dart';
import 'package:personal_web/widgets/custom_heading.dart';
import 'package:personal_web/widgets/tools_tech.dart';

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
          SizedBox(
            height: height * 0.03,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              "Who am I?",
              style: TextStyle(
                color: kPrimaryColor,
                fontSize: height * 0.028,
                fontFamily: 'Montserrat',
              ),
            ),
          ),
          SizedBox(
            height: height * 0.032,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              "I'm Farhan Fadhilah Djabari, a Mobile Developer.",
              style: TextStyle(
                fontSize: height * 0.035,
                fontFamily: 'Montserrat',
                fontWeight: FontWeight.w400,
                color: Colors.white,
              ),
              textAlign: TextAlign.start,
            ),
          ),
          SizedBox(
            height: height * 0.02,
          ),
          Text(
            "I'm a Final Year Information Technology student who is currently enrolled in Brawijaya University, Malang. I've been developing mobile apps with flutter for about a year. I'm a person who has a very high curiosity and easily adapts to new technologies. I have a goal to become a great mobile application developer, therefore I joined as a member of software developer community on my university called Basic Computing Community.",
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
              style: TextStyle(
                color: kPrimaryColor,
                fontSize: height * 0.018,
                fontFamily: 'Montserrat',
              ),
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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AboutMeMetaData(
                data: "Full Name",
                information: "Farhan Fadhilah Djabari",
              ),
              SizedBox(
                width: width > 710 ? width * 0.2 : width * 0.05,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AboutMeMetaData(
                    data: "Personal Email",
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
                padding: const EdgeInsets.only(right: 8.0),
                child: OutlinedCustomBtn(
                    btnText: "Resume",
                    onPressed: () {
                      launchURL(
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
