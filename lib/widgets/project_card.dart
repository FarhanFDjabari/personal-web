import 'package:flutter/material.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:url_launcher/url_launcher.dart';

import 'adaptive_text.dart';

class ProjectCard extends StatefulWidget {
  final String? projectIcon;
  final IconData? projectIconData;
  final String? projectTitle;
  final String? projectDescription;
  final String? projectLink;
  final double? cardWidth;
  final double? cardHeight;
  final String? backImage;
  final Widget? bottomWidget;

  const ProjectCard(
      {Key? key,
      this.backImage,
      this.bottomWidget,
      this.projectIcon,
      this.projectTitle,
      this.projectDescription,
      this.projectLink,
      this.projectIconData,
      this.cardWidth,
      this.cardHeight})
      : super(key: key);
  @override
  _ProjectCardState createState() => _ProjectCardState();
}

class _ProjectCardState extends State<ProjectCard> {
  bool isHover = false;

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return InkWell(
      onTap: () =>
          widget.projectLink != null ? launch(widget.projectLink!) : null,
      onHover: (isHovering) {
        if (isHovering) {
          setState(() {
            isHover = true;
          });
        } else {
          setState(() {
            isHover = false;
          });
        }
      },
      child: Container(
        width: widget.cardWidth,
        height: widget.cardHeight,
        padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
        decoration: BoxDecoration(
          color: Color(0xFF012C56),
          border: Border(
            bottom: isHover
                ? BorderSide(
                    color: Color(0xFF012C56),
                    width: 3.0,
                  )
                : BorderSide(
                    color: Color(0xFF012C56).withOpacity(0.75),
                  ),
          ),
          boxShadow: isHover
              ? [
                  BoxShadow(
                    color: kPrimaryColor.withAlpha(100),
                    blurRadius: 12.0,
                    offset: Offset(0.0, 0.0),
                  )
                ]
              : [
                  BoxShadow(
                    color: Color(0xFF012C56).withAlpha(100),
                    blurRadius: 12.0,
                    offset: Offset(0.0, 0.0),
                  )
                ],
        ),
        child: Stack(
          fit: StackFit.expand,
          children: [
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  widget.projectIcon != null
                      ? (width > 1135 || width < 950)
                          ? Image.asset(
                              widget.projectIcon!,
                              height: height * 0.05,
                            )
                          : Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Image.asset(
                                  widget.projectIcon!,
                                  height: height * 0.03,
                                ),
                                SizedBox(
                                  width: width * 0.01,
                                ),
                                Text(
                                  widget.projectTitle!,
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontSize: height * 0.015,
                                    fontFamily: 'Montserrat',
                                    letterSpacing: 1.5,
                                    fontWeight: FontWeight.w400,
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            )
                      : Container(),
                  widget.projectIconData != null
                      ? Icon(
                          widget.projectIconData,
                          color: kPrimaryColor,
                          size: height * 0.1,
                        )
                      : Container(),
                  (width > 1135 || width < 950)
                      ? SizedBox(
                          height: height * 0.02,
                        )
                      : SizedBox(),
                  (width > 1135 || width < 950)
                      ? AdaptiveText(
                          widget.projectTitle!,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: height * 0.02,
                            fontFamily: 'Montserrat',
                            letterSpacing: 1.5,
                            fontWeight: FontWeight.w400,
                            color: Colors.white,
                          ),
                        )
                      : Container(),
                  SizedBox(
                    height: height * 0.01,
                  ),
                  AdaptiveText(
                    widget.projectDescription!,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: height * 0.015,
                        fontFamily: 'Montserrat',
                        letterSpacing: 2.0,
                        color: Colors.white,
                        fontWeight: FontWeight.w300,
                        height: width >= 600 ? 2.0 : 1.2),
                  ),
                  SizedBox(
                    height: height * 0.01,
                  ),
                  widget.bottomWidget ?? Container(),
                ],
              ),
            ),
            AnimatedOpacity(
              duration: Duration(milliseconds: 400),
              opacity: isHover ? 0.015 : 1.0,
              child: FittedBox(
                fit: BoxFit.fill,
                child: widget.backImage != null
                    ? Image.asset(
                        widget.backImage!,
                        filterQuality: FilterQuality.medium,
                        scale: 2,
                        fit: BoxFit.contain,
                      )
                    : Container(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
