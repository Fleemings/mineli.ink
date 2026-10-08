import { Component, inject } from '@angular/core';
import { I18nService, Locale } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-language',
  standalone: true,
  templateUrl: './language.html',
  styleUrl: './language.sass'
})
export class Language {
  private readonly i18n = inject(I18nService);
  protected readonly localeOptions: ReadonlyArray<{ value: Locale; code: string }> = [
    { value: 'pt-BR', code: 'PT' },
    { value: 'es-MX', code: 'ES' },
    { value: 'en-GB', code: 'EN' }
  ];
  protected readonly selectedLocale = this.i18n.locale;

  protected onLocaleSelect(locale: Locale): void {
    this.i18n.setLocale(locale);
  }
}
