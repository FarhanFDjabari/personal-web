import 'package:flutter/material.dart';
import 'package:personal_web/core/localization/generated/l10n.dart';
import 'package:personal_web/inject.dart';
import 'package:url_launcher/url_launcher_string.dart';

final _appLocale = locator<AppLocalizations>();

const kSocialIcons = [
  "assets/img/instagram-new.png",
  "assets/img/linkedin.png",
  "assets/img/github.png",
];

const kSocialLinks = [
  "https://instagram.com/farhanfdjabari",
  "https://linkedin.com/in/farhanfdjabari",
  "https://github.com/FarhanFDjabari"
];

void launchURL(String _url) async => await canLaunchUrlString(_url)
    ? await launchUrlString(_url)
    : throw 'Could not launch $_url';

final kCommunityLogo = [
  'assets/img/bcc.png',
];

final kCommunityLinks = [
  "https://bccfilkom.net/",
];

final kTools = ["Flutter", "Dart", "Java", "Kotlin"];

final kProjectsBanner = [
  "assets/img/projects/notesgramB.png",
  "assets/img/projects/publicoB.png",
  "assets/img/projects/kalmB.png",
];

final kProjectsIcons = [
  "assets/img/projects/notesgram.png",
  "assets/img/projects/publico.png",
  "assets/img/projects/kalm.png",
];

final kProjectsTitles = [
  "Notesgram",
  "Publico",
  "Kalm",
];

final kProjectsDescriptions = [
  "Notesgram is a mobile-based application for studygram creators to share their work and earn income from their creations.",
  "Educational application to learn about economic development",
  "Mobile-based one stop mental health solution application that focuses on providing psychotherapy services with a cognitive behavioral approach to help improve the quality of users' mental health.",
];

final kProjectsLinks = [
  "https://github.com/FarhanFDjabari/notesgram",
  "https://github.com/FarhanFDjabari/Publico",
  "https://github.com/FarhanFDjabari/kalm-app",
];

final kContactIcons = [
  Icons.home,
  // Icons.phone,
  Icons.mail,
];

final kContactTitles = [
  _appLocale.contactTitleLocation,
  // _appLocale.contactTitlePhone,
  _appLocale.contactTitleEmail,
];

final kContactDetails = [
  "Balikpapan, Indonesia",
  // "(+62) 851 5602902",
  "djabari.dev@gmail.com"
];
