import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/ui/section/about/about.dart';
import 'package:personal_web/ui/section/contact/contact.dart';
import 'package:personal_web/ui/section/footer/footer.dart';
import 'package:personal_web/ui/section/home/home.dart';
import 'package:personal_web/ui/section/projects/portofolio.dart';
import 'package:personal_web/widgets/entrance_fader.dart';
import 'package:personal_web/widgets/navbar_logo.dart';

import '../constants.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({Key? key}) : super(key: key);

  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  bool isPressed = false;
  bool _isScrollingDown = false;
  ScrollController _scrollController = ScrollController();

  final List<String> _sectionsName = ["HOME", "ABOUT", "PROJECTS", "CONTACT"];

  final List<IconData> _sectionsIcons = [
    Icons.home,
    Icons.person,
    Icons.build,
    Icons.article,
    Icons.phone,
  ];

  void _scroll(int i) {
    _scrollController.animateTo(
      i == 0
          ? 0.0
          : i == 1
              ? MediaQuery.of(context).size.height * 0.95
              : i == 2
                  ? MediaQuery.of(context).size.height * 1.80
                  : MediaQuery.of(context).size.height * 2.9,
      duration: Duration(seconds: 1),
      curve: Curves.easeInOut,
    );
  }

  Widget sectionWidget(int i) {
    if (i == 0) {
      return Home();
    } else if (i == 1) {
      return About();
    } else if (i == 2) {
      return Portfolio();
    } else if (i == 3) {
      return Contact();
    } else if (i == 4) {
      return Footer();
    } else {
      return Container();
    }
  }

  @override
  void initState() {
    _scrollController.addListener(() {
      if (_scrollController.position.userScrollDirection ==
          ScrollDirection.reverse) {
        if (!_isScrollingDown) {
          _isScrollingDown = true;
          setState(() {});
        }
      }

      if (_scrollController.position.userScrollDirection ==
          ScrollDirection.forward) {
        if (_isScrollingDown) {
          _isScrollingDown = false;
          setState(() {});
        }
      }
    });
    super.initState();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _scrollController.removeListener(() {});
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: kBackgroundColor,
      appBar: MediaQuery.of(context).size.width < 760
          ? AppBar(
              iconTheme: IconThemeData(color: Colors.white),
              elevation: 0,
              backgroundColor: kBackgroundColor.withOpacity(0.8),
              actions: [
                NavBarLogo(),
                SizedBox(
                  width: MediaQuery.of(context).size.width * 0.05,
                )
              ],
            )
          : _appBarTabDesktop(),
      drawer: MediaQuery.of(context).size.width < 760 ? _appBarMobile() : null,
      body: SectionsBody(
        scrollController: _scrollController,
        sectionsLength: _sectionsIcons.length,
        sectionWidget: sectionWidget,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      floatingActionButton: _isScrollingDown
          ? FloatingActionButton(
              backgroundColor: kPrimaryColor,
              child: Icon(
                Icons.arrow_drop_up_outlined,
                size: MediaQuery.of(context).size.height * 0.075,
                color: kBackgroundColor,
              ),
              onPressed: () {
                setState(() {
                  _isScrollingDown = false;
                });
                _scroll(0);
              },
            )
          : null,
    );
  }

  Widget _appBarActions(String childText, int index, IconData icon) {
    return MediaQuery.of(context).size.width > 760
        ? EntranceFader(
            offset: Offset(0, -10),
            delay: Duration(milliseconds: 100),
            duration: Duration(milliseconds: 250),
            child: Container(
              padding: const EdgeInsets.all(8.0),
              height: 60.0,
              child: MaterialButton(
                hoverColor: kPrimaryColor,
                onPressed: () {
                  if (index > 0) {
                    _isScrollingDown = true;
                  } else {
                    _isScrollingDown = false;
                  }
                  setState(() {});
                  _scroll(index);
                },
                child: Text(
                  childText,
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          )
        : Padding(
            padding: const EdgeInsets.all(8.0),
            child: MaterialButton(
              hoverColor: kPrimaryColor.withAlpha(70),
              onPressed: () {
                if (index > 0) {
                  _isScrollingDown = true;
                } else {
                  _isScrollingDown = false;
                }
                _scroll(index);
                Navigator.pop(context);
                setState(() {});
              },
              child: Padding(
                padding: const EdgeInsets.all(15.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      icon,
                      color: kPrimaryColor,
                    ),
                    SizedBox(width: 8),
                    Text(
                      childText,
                      style: TextStyle(
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ),
          );
  }

  PreferredSizeWidget _appBarTabDesktop() {
    return AppBar(
      elevation: 0.0,
      backgroundColor: kBackgroundColor.withOpacity(0.9),
      title: MediaQuery.of(context).size.width < 780
          ? EntranceFader(
              duration: Duration(milliseconds: 250),
              offset: Offset(0, -10),
              delay: Duration(seconds: 3),
              child: NavBarLogo(
                height: 20.0,
              ))
          : EntranceFader(
              offset: Offset(0, -10),
              duration: Duration(milliseconds: 250),
              delay: Duration(milliseconds: 100),
              child: NavBarLogo(
                height: MediaQuery.of(context).size.height * 0.035,
              ),
            ),
      actions: [
        for (int i = 0; i < _sectionsName.length; i++)
          _appBarActions(_sectionsName[i], i, _sectionsIcons[i]),
        EntranceFader(
          offset: Offset(0, -10),
          delay: Duration(milliseconds: 100),
          duration: Duration(milliseconds: 250),
          child: Container(
            height: 60.0,
            width: 120.0,
            padding: const EdgeInsets.all(8.0),
            child: MaterialButton(
              hoverColor: kPrimaryColor.withAlpha(150),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5.0),
                  side: BorderSide(color: kPrimaryColor)),
              onPressed: () {
                launchURL(
                    'https://drive.google.com/file/d/1p558eaBaZSyfYQyDs5rTHel0k7_tIQVY/view?usp=sharing');
              },
              child: Text(
                "MY RESUME",
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w300,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(width: 15.0),
      ],
    );
  }

  Widget _appBarMobile() {
    return Material(
      color: kBackgroundColor.withOpacity(0.95),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 25.0, 0, 0),
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            for (int i = 0; i < _sectionsName.length; i++)
              _appBarActions(_sectionsName[i], i, _sectionsIcons[i]),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: MaterialButton(
                hoverColor: kPrimaryColor.withAlpha(150),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5.0),
                    side: BorderSide(color: kPrimaryColor)),
                onPressed: () {
                  launchURL(
                      "https://drive.google.com/file/d/1p558eaBaZSyfYQyDs5rTHel0k7_tIQVY/view?usp=sharing");
                },
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.book,
                        color: Color(0xFF95E786),
                      ),
                      SizedBox(width: 8),
                      Text(
                        "MY RESUME",
                        style: TextStyle(
                          fontWeight: FontWeight.w300,
                          fontFamily: 'Montserrat',
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(height: 30),
            IconButton(
              padding: EdgeInsets.zero,
              splashRadius: 30,
              icon: Icon(
                Icons.arrow_back_ios_new_rounded,
              ),
              alignment: Alignment.center,
              onPressed: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }
}

class SectionsBody extends StatelessWidget {
  final ScrollController? scrollController;
  final int? sectionsLength;
  final Widget Function(int)? sectionWidget;

  const SectionsBody({
    Key? key,
    this.scrollController,
    this.sectionsLength,
    this.sectionWidget,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height,
      width: MediaQuery.of(context).size.width,
      child: ListView.builder(
        physics: ScrollPhysics(),
        controller: scrollController,
        itemCount: sectionsLength,
        itemBuilder: (context, index) => sectionWidget!(index),
      ),
    );
  }
}
