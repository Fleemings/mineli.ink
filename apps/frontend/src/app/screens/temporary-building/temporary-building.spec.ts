import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TemporaryBuilding } from './temporary-building';
import { environment } from '../../../environments/environment';

describe('TemporaryBuilding', () => {
  let component: TemporaryBuilding;
  let fixture: ComponentFixture<TemporaryBuilding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporaryBuilding]
    }).compileComponents();

    fixture = TestBed.createComponent(TemporaryBuilding);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the title and subtitle text', () => {
    const title: HTMLElement = fixture.debugElement.query(
      By.css('.temporary-building__title')
    ).nativeElement;
    const subtitle: HTMLElement = fixture.debugElement.query(
      By.css('.temporary-building__subtitle')
    ).nativeElement;

    expect(title.textContent?.trim()).toBeTruthy();
    expect(subtitle.textContent?.trim()).toBeTruthy();
  });

  it('renders the language selector so visitors can switch translations', () => {
    expect(fixture.debugElement.query(By.css('app-language'))).toBeTruthy();
  });

  it('renders the Instagram link using the configured environment URL', () => {
    const link: HTMLAnchorElement = fixture.debugElement.query(
      By.css('.temporary-building__social-link')
    ).nativeElement;

    expect(link.getAttribute('href')).toBe(environment.social.instagramUrl);
  });

  it('opens the Instagram link safely in a new tab', () => {
    const link: HTMLAnchorElement = fixture.debugElement.query(
      By.css('.temporary-building__social-link')
    ).nativeElement;

    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link.getAttribute('aria-label')).toBeTruthy();
  });
});
