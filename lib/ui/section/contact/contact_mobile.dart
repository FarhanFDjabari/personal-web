import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:personal_web/core/localization/generated/l10n.dart';
import 'package:personal_web/inject.dart';
import 'package:personal_web/widgets/custom_heading.dart';
import 'package:personal_web/widgets/project_card.dart';

import '../../../constants.dart';

class ContactMobileTab extends StatelessWidget {
  final _appLocale = locator<AppLocalizations>();

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Container(
      child: Column(
        children: [
          CustomSectionHeading(text: "\n${_appLocale.contactHeading}"),
          CustomSectionSubHeading(text: "${_appLocale.contactSubHeading}\n\n"),
          CarouselSlider.builder(
            itemCount: 3,
            itemBuilder: (BuildContext context, int itemIndex, int i) =>
                Padding(
              padding: const EdgeInsets.symmetric(vertical: 10.0),
              child: ProjectCard(
                cardWidth: width * 0.6,
                cardHeight: width * 0.65,
                projectIconData: kContactIcons[i],
                projectTitle: kContactTitles[i],
                projectDescription: kContactDetails[i],
              ),
            ),
            options: CarouselOptions(
                height: height * 0.3,
                autoPlay: true,
                pageSnapping: true,
                autoPlayInterval: Duration(seconds: 5),
                enlargeCenterPage: true,
                autoPlayCurve: Curves.fastOutSlowIn,
                autoPlayAnimationDuration: Duration(milliseconds: 800),
                enableInfiniteScroll: false),
          ),
        ],
      ),
    );
  }
}
