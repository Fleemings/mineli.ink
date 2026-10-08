import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly currentTheme = signal<Theme>('dark');
  private readonly isBrowser: boolean;

  readonly theme = this.currentTheme.asReadonly();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeTheme();
  }

  toggleTheme(): void {
    const nextTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(nextTheme);
    this.applyTheme(nextTheme);
  }

  private initializeTheme(): void {
    if (!this.isBrowser) {
      this.applyTheme(this.currentTheme());
      return;
    }

    const storedTheme = localStorage.getItem('theme');
    const initialTheme: Theme = storedTheme === 'light' ? 'light' : 'dark';
    this.currentTheme.set(initialTheme);
    this.applyTheme(initialTheme);
  }

  private applyTheme(theme: Theme): void {
    this.document.documentElement.dataset['theme'] = theme;
    if (this.isBrowser) {
      localStorage.setItem('theme', theme);
    }
  }
}
