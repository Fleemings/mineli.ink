import { TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';

describe('I18nService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  function createService(): I18nService {
    return TestBed.inject(I18nService);
  }

  it('should create', () => {
    expect(createService()).toBeTruthy();
  });

  it('translates a key for the active locale immediately (no async init needed)', () => {
    const service = createService();

    expect(service.translate('booking.form.sections.aboutYou')).not.toBe('booking.form.sections.aboutYou');
  });

  it('switches locale and updates the document language attribute', () => {
    const service = createService();

    service.setLocale('en-GB');

    expect(service.locale()).toBe('en-GB');
    expect(document.documentElement.getAttribute('lang')).toBe('en-GB');
    expect(localStorage.getItem('mineli.locale')).toBe('en-GB');
  });

  it('falls back to the translation key when no value exists in any locale', () => {
    const service = createService();

    expect(service.translate('this.key.does.not.exist')).toBe('this.key.does.not.exist');
  });

  it('returns a string even when params are passed to a template without placeholders', () => {
    const service = createService();

    const result = service.translate('booking.form.sections.aboutYou', { name: 'Ana' });
    expect(typeof result).toBe('string');
  });
});
