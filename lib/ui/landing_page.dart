import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import 'package:get/get.dart';
import 'package:personal_web/inject.dart';

import 'package:personal_web/theme/app_theme.dart';
import 'package:personal_web/theme/theme_controller.dart';
import 'package:personal_web/ui/section/about/about.dart';
import 'package:personal_web/ui/section/contact/contact.dart';
import 'package:personal_web/ui/section/footer/footer.dart';
import 'package:personal_web/ui/section/home/home.dart';
import 'package:personal_web/ui/section/projects/portofolio.dart';
import 'package:personal_web/widgets/entrance_fader.dart';
import 'package:personal_web/widgets/navbar_logo.dart';
import 'package:remixicon/remixicon.dart';
import 'package:url_launcher/url_launcher_string.dart';
import 'package:web_smooth_scroll/web_smooth_scroll.dart';

import '../constants.dart';
import '../core/localization/generated/l10n.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({Key? key}) : super(key: key);

  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  bool isPressed = false;
  bool _isScrollingDown = false;
  late ScrollController _scrollController;
  final _appLocale = locator<AppLocalizations>();
  List<String> _sectionsName = [];

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
    _scrollController = ScrollController();

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
    _sectionsName = [
      _appLocale.home,
      _appLocale.about,
      _appLocale.projects,
      _appLocale.contact
    ];
    Get.put(ThemeController());
    return GetX<ThemeController>(
      builder: (controller) => Scaffold(
        extendBodyBehindAppBar: true,
        backgroundColor:
            controller.isDarkMode.value ? kBackgroundColor : kShadyWhite,
        appBar: MediaQuery.of(context).size.width < 760
            ? AppBar(
                iconTheme: IconThemeData(
                    color: controller.isDarkMode.isTrue
                        ? kShadyWhite
                        : kBackgroundColor),
                elevation: 0,
                backgroundColor: controller.isDarkMode.isTrue
                    ? kBackgroundColor.withOpacity(0.8)
                    : kShadyWhite.withOpacity(0.8),
                actions: [
                  NavBarLogo(),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.05,
                  )
                ],
              )
            : _appBarTabDesktop(controller),
        drawer: MediaQuery.of(context).size.width < 760
            ? _appBarMobile(controller)
            : null,
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
                  color: controller.isDarkMode.isTrue
                      ? kBackgroundColor
                      : kShadyWhite,
                ),
                onPressed: () {
                  setState(() {
                    _isScrollingDown = false;
                  });
                  _scroll(0);
                },
              )
            : null,
      ),
    );
  }

  Widget _appBarActions(
      String childText, int index, IconData icon, ThemeController controller) {
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
                    color: controller.isDarkMode.isTrue
                        ? kShadyWhite
                        : kBackgroundColor,
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
                      color: controller.isDarkMode.isTrue
                          ? kPrimaryColor
                          : kBackgroundColor,
                    ),
                    SizedBox(width: 8),
                    Text(
                      childText,
                      style: TextStyle(
                        color: controller.isDarkMode.isTrue
                            ? kShadyWhite
                            : kBackgroundColor,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ),
          );
  }

  PreferredSizeWidget _appBarTabDesktop(ThemeController controller) {
    return AppBar(
      elevation: 0.0,
      backgroundColor: controller.isDarkMode.isTrue
          ? kBackgroundColor.withOpacity(0.9)
          : kShadyWhite.withOpacity(0.9),
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
          _appBarActions(_sectionsName[i], i, _sectionsIcons[i], controller),
        EntranceFader(
          offset: Offset(0, -10),
          delay: Duration(milliseconds: 100),
          duration: Duration(milliseconds: 250),
          child: Container(
            height: 60.0,
            padding: const EdgeInsets.all(8.0),
            child: MaterialButton(
              hoverColor: kPrimaryColor.withAlpha(150),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5.0),
                  side: BorderSide(
                      color: controller.isDarkMode.isTrue
                          ? kPrimaryColor
                          : kBackgroundColor)),
              onPressed: () {
                if (Localizations.localeOf(context)
                    .countryCode!
                    .contains('ID')) {
                  launchUrlString(
                      "https://drive.google.com/file/d/1OfnKQa6Nk-YmzJYec7g6tzJU3J1wDzAD/view?usp=sharing");
                } else {
                  launchURL(
                      'https://drive.google.com/file/d/1p558eaBaZSyfYQyDs5rTHel0k7_tIQVY/view?usp=sharing');
                }
              },
              child: Text(
                _appLocale.myResume,
                style: TextStyle(
                  color: controller.isDarkMode.isTrue
                      ? kShadyWhite
                      : kBackgroundColor,
                  fontWeight: FontWeight.w300,
                ),
              ),
            ),
          ),
        ),
        EntranceFader(
          offset: Offset(0, -10),
          delay: Duration(milliseconds: 100),
          duration: Duration(milliseconds: 250),
          child: Container(
            height: 60.0,
            width: 80.0,
            padding: const EdgeInsets.all(8.0),
            child: MaterialButton(
              hoverColor: kPrimaryColor.withAlpha(150),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5.0),
                  side: BorderSide(
                      color: controller.isDarkMode.isTrue
                          ? kPrimaryColor
                          : kBackgroundColor)),
              onPressed: () {
                if (Localizations.localeOf(context)
                    .countryCode!
                    .contains('ID')) {
                  Get.updateLocale(Locale('en', 'US'));
                } else {
                  Get.updateLocale(Locale('id', 'ID'));
                }
              },
              child: Text(
                Localizations.localeOf(context).countryCode!.contains('ID')
                    ? 'ID'
                    : 'EN',
                style: TextStyle(
                  color: controller.isDarkMode.isTrue
                      ? kShadyWhite
                      : kBackgroundColor,
                  fontWeight: FontWeight.w300,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(width: 15.0),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Obx(() => Icon(
                  controller.isDarkMode.isTrue
                      ? Remix.sun_line
                      : Remix.sun_fill,
                  color: controller.isDarkMode.isTrue
                      ? kShadyWhite
                      : kBackgroundColor,
                )),
            const SizedBox(width: 5.0),
            GetX<ThemeController>(
              builder: (controller) => CupertinoSwitch(
                value: controller.isDarkMode.value,
                activeColor: controller.isDarkMode.isTrue
                    ? kSwitchTrackColor
                    : kBackgroundColor,
                trackColor: controller.isDarkMode.isTrue
                    ? kSwitchTrackColor
                    : kBackgroundColor,
                onChanged: (_) {
                  controller.toggleDarkMode();
                  setState(() {});
                },
              ),
            ),
            const SizedBox(width: 5.0),
            Obx(() => Icon(
                  controller.isDarkMode.isTrue
                      ? Remix.moon_fill
                      : Remix.moon_line,
                  color: controller.isDarkMode.isTrue
                      ? kShadyWhite
                      : kBackgroundColor,
                )),
          ],
        ),
        const SizedBox(width: 15.0),
      ],
    );
  }

  Widget _appBarMobile(ThemeController controller) {
    return Material(
      color: controller.isDarkMode.isTrue
          ? kBackgroundColor.withOpacity(0.95)
          : kShadyWhite.withOpacity(0.95),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 25.0, 0, 0),
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Obx(() => Icon(
                      controller.isDarkMode.isTrue
                          ? Remix.sun_line
                          : Remix.sun_fill,
                      color: controller.isDarkMode.isTrue
                          ? kShadyWhite
                          : kBackgroundColor,
                    )),
                const SizedBox(width: 5.0),
                GetX<ThemeController>(
                  builder: (controller) => CupertinoSwitch(
                    value: controller.isDarkMode.value,
                    activeColor: controller.isDarkMode.isTrue
                        ? kSwitchTrackColor
                        : kBackgroundColor,
                    trackColor: controller.isDarkMode.isTrue
                        ? kSwitchTrackColor
                        : kBackgroundColor,
                    onChanged: (_) {
                      controller.toggleDarkMode();
                      setState(() {});
                    },
                  ),
                ),
                const SizedBox(width: 5.0),
                Obx(() => Icon(
                      controller.isDarkMode.isTrue
                          ? Remix.moon_fill
                          : Remix.moon_line,
                      color: controller.isDarkMode.isTrue
                          ? kShadyWhite
                          : kBackgroundColor,
                    )),
              ],
            ),
            for (int i = 0; i < _sectionsName.length; i++)
              _appBarActions(
                  _sectionsName[i], i, _sectionsIcons[i], controller),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: MaterialButton(
                hoverColor: kPrimaryColor.withAlpha(150),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5.0),
                    side: BorderSide(
                        color: controller.isDarkMode.isTrue
                            ? kPrimaryColor
                            : kBackgroundColor)),
                onPressed: () {
                  if (Localizations.localeOf(context)
                      .countryCode!
                      .contains('ID')) {
                    launchUrlString(
                        "https://drive.google.com/file/d/1OfnKQa6Nk-YmzJYec7g6tzJU3J1wDzAD/view?usp=sharing");
                  } else {
                    launchURL(
                        'https://drive.google.com/file/d/1p558eaBaZSyfYQyDs5rTHel0k7_tIQVY/view?usp=sharing');
                  }
                },
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.book,
                        color: controller.isDarkMode.isTrue
                            ? kPrimaryColor
                            : kBackgroundColor,
                      ),
                      SizedBox(width: 8),
                      Text(
                        _appLocale.myResume,
                        style: TextStyle(
                          fontWeight: FontWeight.w300,
                          fontFamily: 'Montserrat',
                          color: controller.isDarkMode.isTrue
                              ? kShadyWhite
                              : kBackgroundColor,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 8.0, horizontal: 100.0),
              child: Container(
                height: 60.0,
                width: 80.0,
                child: MaterialButton(
                  hoverColor: kPrimaryColor.withAlpha(150),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(5.0),
                      side: BorderSide(
                          color: controller.isDarkMode.isTrue
                              ? kPrimaryColor
                              : kBackgroundColor)),
                  onPressed: () {
                    if (Localizations.localeOf(context)
                        .countryCode!
                        .contains('ID')) {
                      Get.updateLocale(Locale('en', 'US'));
                    } else {
                      Get.updateLocale(Locale('id', 'ID'));
                    }
                  },
                  child: Text(
                    Localizations.localeOf(context).countryCode!.contains('ID')
                        ? 'ID'
                        : 'EN',
                    style: TextStyle(
                      color: controller.isDarkMode.isTrue
                          ? kShadyWhite
                          : kBackgroundColor,
                      fontWeight: FontWeight.w300,
                    ),
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
                color: controller.isDarkMode.isTrue
                    ? kShadyWhite
                    : kBackgroundColor,
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
      child: WebSmoothScroll(
        controller: scrollController ?? ScrollController(),
        child: ListView.builder(
          physics: const NeverScrollableScrollPhysics(),
          controller: scrollController,
          itemCount: sectionsLength,
          itemBuilder: (context, index) => sectionWidget!(index),
        ),
      ),
    );
  }
}
