import 'package:flutter/material.dart';
import 'package:personal_web/theme/app_theme.dart';

import '../constants.dart';

class SocialMediaIconBtn extends StatelessWidget {
  final String? icon;
  final String? socialLink;
  final double? height;
  final double? horizontalPadding;
  final Color? iconColor;

  SocialMediaIconBtn(
      {this.icon,
      this.iconColor,
      this.socialLink,
      this.height,
      this.horizontalPadding});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: horizontalPadding!),
      child: IconButton(
        icon: Image.asset(
          icon!,
          color: iconColor,
        ),
        iconSize: height!,
        onPressed: () => launchURL(socialLink!),
        hoverColor: kPrimaryColor,
      ),
    );
  }
}
