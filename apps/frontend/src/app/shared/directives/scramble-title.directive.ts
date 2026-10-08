import { Directive, ElementRef, OnDestroy, afterRenderEffect, inject, input } from '@angular/core';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

/**
 * Animates its host element's text with a char-reveal + scramble effect (GSAP
 * SplitText/ScrambleText), replaying whenever the bound text changes (e.g. on a
 * locale switch).
 *
 * This directive is the SOLE owner of the host element's visual text content:
 * consumers must not also bind an Angular interpolation/text inside the host,
 * since GSAP's SplitText replaces the element's children to animate individual
 * characters. Provide an accessible name instead (e.g. `[attr.aria-label]`),
 * which takes precedence over child content for assistive tech.
 */
@Directive({
  selector: '[appScrambleTitle]',
  standalone: true
})
export class ScrambleTitleDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly text = input.required<string>({ alias: 'appScrambleTitle' });

  private split?: SplitText;
  private timeline?: gsap.core.Timeline;

  constructor() {
    afterRenderEffect(() => {
      this.play(this.text());
    });
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.split?.revert();
  }

  private play(text: string): void {
    const element = this.elementRef.nativeElement;

    this.timeline?.kill();
    this.split?.revert();

    element.textContent = text;
    this.split = SplitText.create(element, { type: 'words, chars' });

    this.timeline = gsap.timeline({
      onComplete: () => this.split?.revert()
    });

    this.timeline
      .from(this.split.chars, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power2.out'
      })
      .to(
        element,
        {
          duration: 2.8,
          scrambleText: {
            text,
            chars: 'XTRA',
            revealDelay: 0.2,
            speed: 0.22
          }
        },
        0
      );
  }
}
