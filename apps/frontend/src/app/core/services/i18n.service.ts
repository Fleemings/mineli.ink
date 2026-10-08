import { DOCUMENT, registerLocaleData } from '@angular/common';
import localeEnGb from '@angular/common/locales/en-GB';
import localeEsMx from '@angular/common/locales/es-MX';
import localePtBr from '@angular/common/locales/pt';
import { Injectable, inject, signal } from '@angular/core';

import enGB from '../../assets/i18n/en-GB.json';
import esMX from '../../assets/i18n/es-MX.json';
import ptBR from '../../assets/i18n/pt-BR.json';

type TranslationDictionary = Record<string, unknown>;

export type Locale = 'pt-BR' | 'es-MX' | 'en-GB';

const DEFAULT_LOCALE: Locale = 'pt-BR';
const STORAGE_KEY = 'mineli.locale';

const SUPPORTED_LOCALES: ReadonlyArray<Locale> = ['pt-BR', 'es-MX', 'en-GB'];

const LOCALE_BY_LANGUAGE: Readonly<Record<string, Locale>> = {
  pt: 'pt-BR',
  es: 'es-MX',
  en: 'en-GB'
};

// All three locale catalogs are tiny (a few KB each), so they're bundled directly
// instead of lazily loaded — no async loading state (and no APP_INITIALIZER) needed.
const TRANSLATIONS: Readonly<Record<Locale, TranslationDictionary>> = {
  'pt-BR': ptBR,
  'es-MX': esMX,
  'en-GB': enGB
};

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly currentLocale = signal<Locale>(this.resolvePreferredLocale());

  readonly locale = this.currentLocale.asReadonly();

  constructor() {
    this.registerLocales();
    this.updateDocumentLanguage(this.currentLocale());
    this.persistLocale(this.currentLocale());
  }

  setLocale(locale: Locale): void {
    this.currentLocale.set(locale);
    this.updateDocumentLanguage(locale);
    this.persistLocale(locale);
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const activeValue = this.resolveNestedValue(TRANSLATIONS[this.currentLocale()], key);
    const text = this.resolveText(activeValue, key);
    return this.applyParams(text, params);
  }

  private resolveText(activeValue: unknown, key: string): string {
    if (typeof activeValue === 'string') {
      return activeValue;
    }

    const fallbackValue = this.resolveNestedValue(TRANSLATIONS[DEFAULT_LOCALE], key);
    return typeof fallbackValue === 'string' ? fallbackValue : key;
  }

  private resolvePreferredLocale(): Locale {
    const storedLocale = this.readStoredLocale();
    if (storedLocale) {
      return storedLocale;
    }

    if (typeof navigator === 'undefined') {
      return DEFAULT_LOCALE;
    }

    for (const localeInput of [...(navigator.languages ?? []), navigator.language]) {
      const locale = this.normalizeLocale(localeInput);
      if (locale) {
        return locale;
      }
    }

    return DEFAULT_LOCALE;
  }

  private normalizeLocale(input: string): Locale | null {
    const normalized = input.trim().toLowerCase();
    if (!normalized) {
      return null;
    }

    const exact = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === normalized);
    if (exact) {
      return exact;
    }

    const language = normalized.split('-')[0];
    return LOCALE_BY_LANGUAGE[language] ?? null;
  }

  private resolveNestedValue(dictionary: TranslationDictionary, dottedKey: string): unknown {
    return dottedKey.split('.').reduce<unknown>((accumulator, keyPart) => {
      if (typeof accumulator !== 'object' || accumulator === null) {
        return undefined;
      }
      return (accumulator as Record<string, unknown>)[keyPart];
    }, dictionary);
  }

  private applyParams(template: string, params?: Record<string, string | number>): string {
    if (!params) {
      return template;
    }

    return template.replace(/\{(\w+)}/g, (_, token: string) => {
      const value = params[token];
      return value === undefined ? `{${token}}` : String(value);
    });
  }

  private registerLocales(): void {
    registerLocaleData(localePtBr, 'pt-BR');
    registerLocaleData(localeEsMx, 'es-MX');
    registerLocaleData(localeEnGb, 'en-GB');
  }

  private updateDocumentLanguage(locale: Locale): void {
    this.document?.documentElement?.setAttribute('lang', locale);
  }

  private persistLocale(locale: Locale): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(STORAGE_KEY, locale);
  }

  private readStoredLocale(): Locale | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? this.normalizeLocale(value) : null;
  }
}
