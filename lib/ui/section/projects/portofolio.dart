import 'package:flutter/material.dart';
import 'package:personal_web/ui/section/projects/portofolio_desktop.dart';
import 'package:personal_web/ui/section/projects/portofolio_mobile.dart';
import 'package:responsive_builder/responsive_builder.dart';

class Portfolio extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ScreenTypeLayout(
      mobile: PortfolioMobileTab(),
      tablet: PortfolioMobileTab(),
      desktop: PortfolioDesktop(),
    );
  }
}
