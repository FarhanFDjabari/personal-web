import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:personal_web/core/localization/generated/l10n.dart';
import 'package:personal_web/inject.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/theme/theme_controller.dart';
import 'package:personal_web/widgets/animator.dart';
import 'package:personal_web/widgets/custom_heading.dart';
import 'package:personal_web/widgets/project_card.dart';

import '../../../constants.dart';

class ContactDesktop extends GetView<ThemeController> {
  final _appLocale = locator<AppLocalizations>();

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Container(
      padding: EdgeInsets.symmetric(
          horizontal: width * 0.02, vertical: height * 0.02),
      child: Column(
        children: [
          CustomSectionHeading(text: "\n${_appLocale.contactHeading}"),
          CustomSectionSubHeading(text: "${_appLocale.contactSubHeading}\n\n"),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              kContactIcons.length,
              (index) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12.0),
                child: WidgetAnimator(
                  child: ProjectCard(
                    cardWidth: width < 1200 ? width * 0.25 : width * 0.2,
                    cardHeight: width < 1200 ? height * 0.28 : height * 0.25,
                    projectIconData: kContactIcons[index],
                    projectTitle: kContactTitles[index],
                    projectDescription: kContactDetails[index],
                    backgroundColor: controller.isDarkMode.value
                        ? kPrimaryColor
                        : kBackgroundColor,
                    accentColor: controller.isDarkMode.value
                        ? kPrimaryColor
                        : kBackgroundColor,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
