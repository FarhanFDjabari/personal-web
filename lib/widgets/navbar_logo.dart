import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class NavBarLogo extends StatelessWidget {
  final double? height;
  NavBarLogo({this.height});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(
          MediaQuery.of(context).size.width < 1100 ? 0.0 : 20.0, 20.0, 0, 0),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            "Djabari",
            style: GoogleFonts.aguafinaScript(
              textStyle: TextStyle(
                fontFamily: "Agustina",
                fontSize: height ?? 20,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
