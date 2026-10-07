import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';
import { environment } from '../../../environments/environment';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Language } from '../../shared/components/language/language';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

@Component({
  selector: 'app-temporary-building',
  imports: [TranslatePipe, Language],
  templateUrl: './temporary-building.html',
  styleUrl: './temporary-building.sass'
})
export class TemporaryBuilding implements AfterViewInit, OnDestroy {
  private readonly i18n = inject(I18nService);
  protected readonly instagramUrl = environment.social.instagramUrl;

  @ViewChild('title', { static: true })
  private readonly title!: ElementRef<HTMLHeadingElement>;

  private titleSplit?: SplitText;
  private titleTimeline?: gsap.core.Timeline;

  ngAfterViewInit(): void {
    this.playTitleAnimation();
  }

  ngOnDestroy(): void {
    this.titleTimeline?.kill();
    this.titleSplit?.revert();
  }

  // Mirrors landing-area's title reveal (char fade/slide-in + scramble-text resolve),
  // just slowed down slightly to suit a single, calmer placeholder screen.
  private playTitleAnimation(): void {
    const titleElement = this.title.nativeElement;
    const titleText = this.i18n.translate('temporaryBuilding.title');

    this.titleTimeline?.kill();
    this.titleSplit?.revert();

    titleElement.textContent = titleText;
    this.titleSplit = SplitText.create(titleElement, { type: 'words, chars' });

    this.titleTimeline = gsap.timeline({
      onComplete: () => this.titleSplit?.revert()
    });

    this.titleTimeline
      .from(this.titleSplit.chars, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power2.out'
      })
      .to(
        titleElement,
        {
          duration: 2.8,
          scrambleText: {
            text: titleText,
            chars: 'XTRA',
            revealDelay: 0.2,
            speed: 0.22
          }
        },
        0
      );
  }
}
