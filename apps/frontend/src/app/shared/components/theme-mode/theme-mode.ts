import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-mode',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './theme-mode.html',
  styleUrl: './theme-mode.sass'
})
export class ThemeMode {
  protected readonly themeService = inject(ThemeService);
}
