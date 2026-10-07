import {
  APP_INITIALIZER,
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { I18nService } from './core/services/i18n.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (i18n: I18nService) => () => i18n.initialize(),
      deps: [I18nService],
      multi: true
    },
    {
      provide: LOCALE_ID,
      useFactory: () => inject(I18nService).locale()
    }
  ]
};
