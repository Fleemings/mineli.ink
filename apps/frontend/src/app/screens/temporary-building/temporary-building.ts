import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ScrambleTitleDirective } from '../../shared/directives/scramble-title.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Language } from '../../shared/components/language/language';

@Component({
  selector: 'app-temporary-building',
  imports: [TranslatePipe, Language, ScrambleTitleDirective],
  templateUrl: './temporary-building.html',
  styleUrl: './temporary-building.sass'
})
export class TemporaryBuilding {
  protected readonly instagramUrl = environment.social.instagramUrl;
}
