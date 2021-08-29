import 'package:flutter/material.dart';
import 'package:responsive_builder/responsive_builder.dart';

import 'about_desktop.dart';
import 'about_mobile.dart';
import 'about_tab.dart';

class About extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ScreenTypeLayout(
      mobile: AboutMobile(),
      tablet: AboutTab(),
      desktop: AboutDesktop(),
    );
  }
}
