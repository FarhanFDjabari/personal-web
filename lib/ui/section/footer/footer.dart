import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:personal_web/widgets/adaptive_text.dart';

class Footer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Container(
      margin: EdgeInsets.fromLTRB(0, height * 0.05, 0, 0),
      height: height * 0.07,
      width: width,
      color: Color(0xFF012241),
      child: Center(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            AdaptiveText(
              "This website is built with",
              style: GoogleFonts.montserrat(
                fontWeight: FontWeight.w300,
                color: Colors.white,
              ),
            ),
            AdaptiveText(
              "Flutter",
              style: GoogleFonts.montserrat(
                fontWeight: FontWeight.w500,
                color: Colors.blue,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
