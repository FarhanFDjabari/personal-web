import 'package:flutter/material.dart';
import 'package:personal_web/ui/section/experience/experience_desktop.dart';
import 'package:personal_web/ui/section/experience/experience_mobile.dart';
import 'package:responsive_builder/responsive_builder.dart';

class Experience extends StatelessWidget {
  const Experience({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ScreenTypeLayout(
      mobile: ExperienceMobile(),
      desktop: ExperienceDesktop(),
    );
  }
}
