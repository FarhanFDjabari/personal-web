import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

const kSocialIcons = [
  "https://img.icons8.com/ios-glyphs/480/ffffff/instagram-new.png",
  "https://img.icons8.com/metro/308/ffffff/linkedin.png",
  "https://img.icons8.com/material-rounded/384/ffffff/github.png",
];

const kSocialLinks = [
  "https://instagram.com/farhanfdjabari",
  "https://linkedin.com/in/farhanfdjabari",
  "https://github.com/FarhanFDjabari"
];

void launchURL(String _url) async =>
    await canLaunch(_url) ? await launch(_url) : throw 'Could not launch $_url';

final kCommunityLogo = [
  'assets/img/bcc.png',
];

final kCommunityLinks = [
  "https://www.bcc.filkom.ub.ac.id/",
];

final kTools = [
  "Flutter",
  "Dart",
  "Java",
  "Kotlin",
  "HTML",
  "CSS",
  "Bootstrap"
];

final kProjectsBanner = [
  "assets/img/projects/partnerinB.png",
  "assets/img/projects/restaurantappB.png",
  "assets/img/projects/covidB.png",
];

final kProjectsIcons = [
  "assets/img/projects/partnerin.png",
  "assets/img/projects/restaurantapp.png",
  "assets/img/projects/covidnewsapp.png",
];

final kProjectsTitles = [
  "Partnerin",
  "Restaurant App",
  "Covid News App",
];

final kProjectsDescriptions = [
  "Partnerin was developed to overcome the problems of prospective entrepreneurs who have a high business desire.",
  "Restaurant app is an app built with flutter that can display a list of restaurants, also send daily notifications related to restaurant information",
  "Covid News App is an application built with native android that can display global statistical information about Covid and news related to the topic."
];

final kProjectsLinks = [
  "https://github.com/FarhanFDjabari/partnerin",
  "https://github.com/FarhanFDjabari/restaurant-app",
  "https://github.com/FarhanFDjabari/CovidNewsApp"
];

final kContactIcons = [
  Icons.home,
  Icons.phone,
  Icons.mail,
];

final kContactTitles = [
  "Location",
  "Phone",
  "Email",
];

final kContactDetails = [
  "Balikpapan, Indonesia",
  "(+62) 851 5602902",
  "ffadhilah8@gmail.com"
];
