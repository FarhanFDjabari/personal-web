import 'package:get_it/get_it.dart';

import 'package:personal_web/core/localization/generated/l10n.dart';

GetIt locator = GetIt.instance;

void initInject() {
  locator.registerLazySingleton(() => AppLocalizations());
}
