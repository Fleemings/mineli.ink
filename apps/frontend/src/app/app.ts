import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
  inject
} from '@angular/core';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { Subscription } from 'rxjs';
import { SectionNavigationService } from './core/services/section-navigation.service';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { SectionId } from './shared/types/section.model';
import { TemporaryBuilding } from './screens/temporary-building/temporary-building';
import { environment } from '../environments/environment';

gsap.registerPlugin(Observer, SplitText);

const SECTION_IDS: ReadonlySet<SectionId> = new Set(['landing', 'flashes', 'booking', 'faq']);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Footer, TemporaryBuilding],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly isUnderConstruction = environment.maintenanceMode;
  @ViewChildren('pageSection', { read: ElementRef })
  private readonly pageSections!: QueryList<ElementRef<HTMLElement>>;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sectionNavigation = inject(SectionNavigationService);
  private sectionOrder: SectionId[] = ['landing', 'flashes', 'booking', 'faq'];
  private observer?: Observer;
  private sectionRequestSubscription?: Subscription;
  private isAnimating = false;
  private currentIndex = -1;
  private wrapIndex = (value: number) => value;
  private sectionHeadings: Array<HTMLElement | null> = [];
  private headingSplits: Array<SplitText | null> = [];

  ngAfterViewInit(): void {
    if (this.isUnderConstruction || !isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.pageSections.length > 0) {
      this.initializeScrollSections();
      return;
    }

    // The full-site sections render inside an @defer block (see app.html) so the
    // maintenance-mode build never pays for their code/chunk. Wait for them to
    // actually attach before wiring up the GSAP scroll-jacking behavior.
    const subscription = this.pageSections.changes.subscribe(() => {
      subscription.unsubscribe();
      this.initializeScrollSections();
    });
  }

  private initializeScrollSections(): void {
    const sections = this.pageSections.toArray().map((section) => section.nativeElement);
    this.sectionOrder = sections
      .map((section) => section.id)
      .filter((id): id is SectionId => this.isSectionId(id));

    this.wrapIndex = gsap.utils.wrap(0, sections.length);
    this.sectionHeadings = sections.map((section) =>
      section.querySelector<HTMLElement>('[data-section-heading]')
    );
    this.headingSplits = this.sectionHeadings.map(() => null);

    gsap.set(sections, { autoAlpha: 0, zIndex: 0 });

    this.observer = Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      tolerance: 10,
      onDown: () => !this.isAnimating && this.handleOverlayScroll(this.currentIndex - 1, -1),
      onUp: () => !this.isAnimating && this.handleOverlayScroll(this.currentIndex + 1, 1),
      preventDefault: true
    });

    this.sectionRequestSubscription = this.sectionNavigation.sectionRequests$.subscribe(
      (sectionId) => {
        this.onSectionRequested(sectionId);
      }
    );

    this.handleOverlayScroll(0, 1);
  }

  ngOnDestroy(): void {
    this.observer?.kill();
    this.sectionRequestSubscription?.unsubscribe();
    for (const split of this.headingSplits) {
      split?.revert();
    }
  }

  private handleOverlayScroll(target: number, direction: 1 | -1): void {
    const sections = this.pageSections.toArray().map((section) => section.nativeElement);
    const index = this.wrapIndex(target);
    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;

    this.isAnimating = true;

    const tl = gsap.timeline({
      defaults: { duration: 1.0, ease: 'power1.inOut' },
      onComplete: () => {
        const split = this.headingSplits[index];
        split?.revert();
        this.headingSplits[index] = null;
        // Clear the settled section's inline transform so it no longer establishes a
        // containing block for descendant fixed/absolute-positioned content (e.g. native
        // <input type="date"> picker popups getting clipped/mispositioned).
        gsap.set(sections[index], { clearProps: 'transform' });
        this.isAnimating = false;
      }
    });

    if (this.currentIndex >= 0) {
      gsap.set(sections[this.currentIndex], { zIndex: 0 });
      tl.to(sections[this.currentIndex], { yPercent: -12 * dFactor, autoAlpha: 0 }, 0);
    }

    gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
    tl.fromTo(sections[index], { yPercent: 100 * dFactor }, { yPercent: 0 }, 0);
    this.animateSectionHeading(index, dFactor, tl);

    this.currentIndex = index;
    const sectionId = this.sectionOrder[index];
    if (sectionId) {
      this.sectionNavigation.setActiveSection(sectionId);
      this.cdr.detectChanges();
    }
  }

  protected onSectionRequested(sectionId: SectionId): void {
    const targetIndex = this.sectionOrder.indexOf(sectionId);
    if (targetIndex < 0 || this.isAnimating || targetIndex === this.currentIndex) return;
    const direction = this.currentIndex === -1 || targetIndex > this.currentIndex ? 1 : -1;
    this.handleOverlayScroll(targetIndex, direction);
  }

  private animateSectionHeading(
    index: number,
    dFactor: 1 | -1,
    timeline: gsap.core.Timeline
  ): void {
    const heading = this.sectionHeadings[index];
    if (!heading) {
      return;
    }

    this.headingSplits[index]?.revert();
    const split = SplitText.create(heading, { type: 'chars,words,lines', linesClass: 'clip-text' });
    this.headingSplits[index] = split;

    timeline.fromTo(
      split.chars,
      {
        autoAlpha: 0,
        yPercent: 150 * dFactor
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: 'power2',
        stagger: {
          each: 0.02,
          from: 'random'
        }
      },
      0.2
    );
  }

  private isSectionId(value: string): value is SectionId {
    return SECTION_IDS.has(value as SectionId);
  }
}
