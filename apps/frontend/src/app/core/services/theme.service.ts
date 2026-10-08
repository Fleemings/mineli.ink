import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly currentTheme = signal<Theme>('dark');

  readonly theme = this.currentTheme.asReadonly();

  constructor() {
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
