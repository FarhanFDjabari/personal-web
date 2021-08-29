import 'package:flutter/material.dart';
import 'package:personal_web/theme/app_theme.dart';

import 'adaptive_text.dart';

class ToolTechWidget extends StatelessWidget {
  final String? techName;

  const ToolTechWidget({Key? key, this.techName}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 12.0),
      child: Row(
        children: [
          Icon(
            Icons.play_arrow,
            color: kPrimaryColor,
            size: MediaQuery.of(context).size.height * 0.02,
          ),
          AdaptiveText(
            " $techName ",
            style: TextStyle(
              color: Colors.white,
            ),
          )
        ],
      ),
    );
  }
}
