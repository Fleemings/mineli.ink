import { Component, inject, signal } from '@angular/core';
import { SectionNavigationService } from '../../../core/services/section-navigation.service';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { Language } from '../language/language';
import { ThemeMode } from '../theme-mode/theme-mode';
import { SectionId } from '../../types/section.model';

const LOGO_SRC = 'assets/images/butterfly-logo-light.jpeg';
const LOGO_SRC_NEGATIVE = 'assets/images/butterfly-logo-dark.jpeg';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeMode, Language, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.sass'
})
export class Header {
  protected readonly sectionNavigation = inject(SectionNavigationService);
  private readonly themeService = inject(ThemeService);

  private readonly isMobileMenuOpenSignal = signal(false);
  readonly isMobileMenuOpen = this.isMobileMenuOpenSignal.asReadonly();

  protected scrollToSection(event: Event, sectionId: SectionId): void {
    event.preventDefault();
    this.sectionNavigation.requestSection(sectionId);
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpenSignal.update((isOpen) => !isOpen);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpenSignal.set(false);
  }

  protected logoSrc(): string {
    return this.themeService.theme() === 'dark' ? LOGO_SRC_NEGATIVE : LOGO_SRC;
  }
}
