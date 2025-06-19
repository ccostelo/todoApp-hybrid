import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { UpgradeModule } from '@angular/upgrade/static';

import './assets/legacy/js/app.js';
import './assets/legacy/js/services/todoService.js';
import './assets/legacy/js/services/notificationService.js';
import './assets/legacy/js/services/storageService.js';

declare var angular: any;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((platformRef) => {
    const upgrade = platformRef.injector.get(UpgradeModule);
    upgrade.bootstrap(document.body, ['todoApp'])
  })
  .catch((err) => console.error(err));
