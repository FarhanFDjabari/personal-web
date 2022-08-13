// GENERATED CODE - DO NOT MODIFY BY HAND
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'intl/messages_all.dart';

// **************************************************************************
// Generator: Flutter Intl IDE plugin
// Made by Localizely
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, lines_longer_than_80_chars
// ignore_for_file: join_return_with_assignment, prefer_final_in_for_each
// ignore_for_file: avoid_redundant_argument_values, avoid_escaping_inner_quotes

class AppLocalizations {
  AppLocalizations();

  static AppLocalizations? _current;

  static AppLocalizations get current {
    assert(_current != null,
        'No instance of AppLocalizations was loaded. Try to initialize the AppLocalizations delegate before accessing AppLocalizations.current.');
    return _current!;
  }

  static const AppLocalizationDelegate delegate = AppLocalizationDelegate();

  static Future<AppLocalizations> load(Locale locale) {
    final name = (locale.countryCode?.isEmpty ?? false)
        ? locale.languageCode
        : locale.toString();
    final localeName = Intl.canonicalizedLocale(name);
    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      final instance = AppLocalizations();
      AppLocalizations._current = instance;

      return instance;
    });
  }

  static AppLocalizations of(BuildContext context) {
    final instance = AppLocalizations.maybeOf(context);
    assert(instance != null,
        'No instance of AppLocalizations present in the widget tree. Did you add AppLocalizations.delegate in localizationsDelegates?');
    return instance!;
  }

  static AppLocalizations? maybeOf(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  /// `HOME`
  String get home {
    return Intl.message(
      'HOME',
      name: 'home',
      desc: '',
      args: [],
    );
  }

  /// `ABOUT`
  String get about {
    return Intl.message(
      'ABOUT',
      name: 'about',
      desc: '',
      args: [],
    );
  }

  /// `PROJECTS`
  String get projects {
    return Intl.message(
      'PROJECTS',
      name: 'projects',
      desc: '',
      args: [],
    );
  }

  /// `CONTACT`
  String get contact {
    return Intl.message(
      'CONTACT',
      name: 'contact',
      desc: '',
      args: [],
    );
  }

  /// `MY RESUME`
  String get myResume {
    return Intl.message(
      'MY RESUME',
      name: 'myResume',
      desc: '',
      args: [],
    );
  }

  /// `WELCOME TO MY WEBSITE!`
  String get homeGreetings {
    return Intl.message(
      'WELCOME TO MY WEBSITE!',
      name: 'homeGreetings',
      desc: '',
      args: [],
    );
  }

  /// `About Me`
  String get aboutMeHeading {
    return Intl.message(
      'About Me',
      name: 'aboutMeHeading',
      desc: '',
      args: [],
    );
  }

  /// `Get to know me`
  String get aboutMeSubHeading {
    return Intl.message(
      'Get to know me',
      name: 'aboutMeSubHeading',
      desc: '',
      args: [],
    );
  }

  /// `Who am I?`
  String get aboutMeContentHeading {
    return Intl.message(
      'Who am I?',
      name: 'aboutMeContentHeading',
      desc: '',
      args: [],
    );
  }

  /// `I'm Farhan Fadhilah Djabari, a Mobile Developer.`
  String get aboutMeContentBody {
    return Intl.message(
      'I\'m Farhan Fadhilah Djabari, a Mobile Developer.',
      name: 'aboutMeContentBody',
      desc: '',
      args: [],
    );
  }

  /// `I'm a Final Year Information Technology student who is currently enrolled in Brawijaya University, Malang. I've been developing mobile apps with flutter for about a year. I'm a person who has a very high curiosity and easily adapts to new technologies. I have a goal to become great mobile application developer, therefore I joined as a member of software developer community on my university called Basic Computing Community.`
  String get aboutMeContentBody2 {
    return Intl.message(
      'I\'m a Final Year Information Technology student who is currently enrolled in Brawijaya University, Malang. I\'ve been developing mobile apps with flutter for about a year. I\'m a person who has a very high curiosity and easily adapts to new technologies. I have a goal to become great mobile application developer, therefore I joined as a member of software developer community on my university called Basic Computing Community.',
      name: 'aboutMeContentBody2',
      desc: '',
      args: [],
    );
  }

  /// `Technologies I have worked with:`
  String get aboutMeTechStack {
    return Intl.message(
      'Technologies I have worked with:',
      name: 'aboutMeTechStack',
      desc: '',
      args: [],
    );
  }

  /// `Full Name`
  String get aboutMeFullName {
    return Intl.message(
      'Full Name',
      name: 'aboutMeFullName',
      desc: '',
      args: [],
    );
  }

  /// `Personal Email`
  String get aboutMePersonalEmail {
    return Intl.message(
      'Personal Email',
      name: 'aboutMePersonalEmail',
      desc: '',
      args: [],
    );
  }

  /// `From`
  String get aboutMeFrom {
    return Intl.message(
      'From',
      name: 'aboutMeFrom',
      desc: '',
      args: [],
    );
  }

  /// `Here are few samples of my previous work`
  String get portfolioSubHeading {
    return Intl.message(
      'Here are few samples of my previous work',
      name: 'portfolioSubHeading',
      desc: '',
      args: [],
    );
  }

  /// `See More`
  String get portfolioSeeMore {
    return Intl.message(
      'See More',
      name: 'portfolioSeeMore',
      desc: '',
      args: [],
    );
  }

  /// `My Contact`
  String get contactHeading {
    return Intl.message(
      'My Contact',
      name: 'contactHeading',
      desc: '',
      args: [],
    );
  }

  /// `Let's build something together`
  String get contactSubHeading {
    return Intl.message(
      'Let\'s build something together',
      name: 'contactSubHeading',
      desc: '',
      args: [],
    );
  }

  /// `Location`
  String get contactTitleLocation {
    return Intl.message(
      'Location',
      name: 'contactTitleLocation',
      desc: '',
      args: [],
    );
  }

  /// `Phone`
  String get contactTitlePhone {
    return Intl.message(
      'Phone',
      name: 'contactTitlePhone',
      desc: '',
      args: [],
    );
  }

  /// `Email`
  String get contactTitleEmail {
    return Intl.message(
      'Email',
      name: 'contactTitleEmail',
      desc: '',
      args: [],
    );
  }

  /// `This website is built with`
  String get footerBody {
    return Intl.message(
      'This website is built with',
      name: 'footerBody',
      desc: '',
      args: [],
    );
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<AppLocalizations> {
  const AppLocalizationDelegate();

  List<Locale> get supportedLocales {
    return const <Locale>[
      Locale.fromSubtags(languageCode: 'en'),
      Locale.fromSubtags(languageCode: 'id'),
    ];
  }

  @override
  bool isSupported(Locale locale) => _isSupported(locale);
  @override
  Future<AppLocalizations> load(Locale locale) => AppLocalizations.load(locale);
  @override
  bool shouldReload(AppLocalizationDelegate old) => false;

  bool _isSupported(Locale locale) {
    for (var supportedLocale in supportedLocales) {
      if (supportedLocale.languageCode == locale.languageCode) {
        return true;
      }
    }
    return false;
  }
}
