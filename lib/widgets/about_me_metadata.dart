import 'package:flutter/material.dart';

class AboutMeMetaData extends StatelessWidget {
  final String? data;
  final String? information;
  final Alignment? alignment;

  const AboutMeMetaData({Key? key, this.data, this.information, this.alignment})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;

    return Align(
      alignment: alignment ?? Alignment.center,
      child: RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: "$data: ",
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontFamily: 'Montserrat',
                fontSize: height * 0.018,
                color: Colors.white,
              ),
            ),
            TextSpan(
              text: " $information\n",
              style: TextStyle(
                fontWeight: FontWeight.w300,
                fontFamily: 'Montserrat',
                fontSize: height * 0.018,
                letterSpacing: 1.0,
                color: Colors.white,
                overflow: TextOverflow.fade,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
