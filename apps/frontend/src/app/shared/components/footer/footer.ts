import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.sass'
})
export class Footer {
  protected readonly instagramUrl = environment.social.instagramUrl;
  protected readonly currentYear = new Date().getFullYear();
}
