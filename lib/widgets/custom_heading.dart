import 'package:flutter/material.dart';

import 'adaptive_text.dart';

class CustomSectionHeading extends StatelessWidget {
  final String text;

  const CustomSectionHeading({Key? key, required this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AdaptiveText(
      text,
      style: TextStyle(
        fontSize: MediaQuery.of(context).size.height * 0.075,
        fontFamily: 'Montserrat',
        fontWeight: FontWeight.w100,
        letterSpacing: 1.0,
        color: Colors.white,
      ),
    );
  }
}

class CustomSectionSubHeading extends StatelessWidget {
  final String text;

  const CustomSectionSubHeading({Key? key, required this.text})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AdaptiveText(
      text,
      style: TextStyle(
        fontWeight: FontWeight.w200,
        fontFamily: 'Montserrat',
        color: Colors.white,
      ),
    );
  }
}
