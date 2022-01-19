import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

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

void launchURL(String _url) async =>
    await canLaunch(_url) ? await launch(_url) : throw 'Could not launch $_url';

final kCommunityLogo = [
  'assets/img/bcc.png',
];

final kCommunityLinks = [
  "https://bccfilkom.net/",
];

final kTools = ["Flutter", "Dart", "Java", "Kotlin"];

final kProjectsBanner = [
  "assets/img/projects/kalmB.png",
  "assets/img/projects/publicoB.png",
  "assets/img/projects/partnerinB.png",
];

final kProjectsIcons = [
  "assets/img/projects/kalm.png",
  "assets/img/projects/publico.png",
  "assets/img/projects/partnerin.png",
];

final kProjectsTitles = [
  "Kalm",
  "Publico",
  "Partnerin",
];

final kProjectsDescriptions = [
  "Mobile-based one stop mental health solution application that focuses on providing psychotherapy services with a cognitive behavioral approach to help improve the quality of users' mental health.",
  "Educational application to learn about economic development",
  "Partnerin was developed to overcome the problems of prospective entrepreneurs who have a high business desire.",
];

final kProjectsLinks = [
  "https://github.com/FarhanFDjabari/kalm-app",
  "https://github.com/FarhanFDjabari/Publico",
  "https://github.com/FarhanFDjabari/partnerin",
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
  "djabari.dev@gmail.com"
];
