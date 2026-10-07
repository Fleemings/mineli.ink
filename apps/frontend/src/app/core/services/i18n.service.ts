import { DOCUMENT, registerLocaleData } from '@angular/common';
import localeEnGb from '@angular/common/locales/en-GB';
import localeEsMx from '@angular/common/locales/es-MX';
import localePtBr from '@angular/common/locales/pt';
import { Injectable, computed, inject, signal } from '@angular/core';

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

const TRANSLATION_LOADERS: Readonly<Record<Locale, () => Promise<TranslationDictionary>>> = {
  'pt-BR': async () => (await import('../../assets/i18n/pt-BR.json')).default as TranslationDictionary,
  'es-MX': async () => (await import('../../assets/i18n/es-MX.json')).default as TranslationDictionary,
  'en-GB': async () => (await import('../../assets/i18n/en-GB.json')).default as TranslationDictionary
};

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly currentLocale = signal<Locale>(this.resolvePreferredLocale());
  private readonly translationsByLocale = signal<Partial<Record<Locale, TranslationDictionary>>>({});

  readonly locale = this.currentLocale.asReadonly();

  constructor() {
    this.registerLocales();
    this.updateDocumentLanguage(this.currentLocale());
    this.persistLocale(this.currentLocale());
  }

  async initialize(): Promise<void> {
    await Promise.all([this.ensureLocaleLoaded(this.currentLocale()), this.ensureLocaleLoaded(DEFAULT_LOCALE)]);
  }

  async setLocale(locale: Locale): Promise<void> {
    await this.ensureLocaleLoaded(locale);
    this.currentLocale.set(locale);
    this.updateDocumentLanguage(locale);
    this.persistLocale(locale);
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const locale = this.currentLocale();
    const activeValue = this.resolveNestedValue(this.translationsByLocale()[locale], key);
    const fallbackValue = this.resolveNestedValue(this.translationsByLocale()[DEFAULT_LOCALE], key);
    const text = typeof activeValue === 'string' ? activeValue : typeof fallbackValue === 'string' ? fallbackValue : key;
    return this.applyParams(text, params);
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

  private async ensureLocaleLoaded(locale: Locale): Promise<void> {
    if (this.translationsByLocale()[locale]) {
      return;
    }

    const dictionary = await TRANSLATION_LOADERS[locale]();
    this.translationsByLocale.update((current) => ({ ...current, [locale]: dictionary }));
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

  private resolveNestedValue(dictionary: TranslationDictionary | undefined, dottedKey: string): unknown {
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

    return template.replace(/\{([a-zA-Z0-9_]+)}/g, (_, token: string) => {
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
