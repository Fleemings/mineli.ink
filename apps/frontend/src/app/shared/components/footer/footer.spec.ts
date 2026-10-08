import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Footer } from './footer';
import { environment } from '../../../../environments/environment';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the Instagram link using the configured environment URL', () => {
    const link: HTMLAnchorElement = fixture.debugElement.query(
      By.css('.app-footer__social-link')
    ).nativeElement;

    expect(link.getAttribute('href')).toBe(environment.social.instagramUrl);
  });

  it('opens the Instagram link safely in a new tab', () => {
    const link: HTMLAnchorElement = fixture.debugElement.query(
      By.css('.app-footer__social-link')
    ).nativeElement;

    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link.getAttribute('aria-label')).toBeTruthy();
  });

  it('renders an icon and a label for the Instagram link', () => {
    const link = fixture.debugElement.query(By.css('.app-footer__social-link')).nativeElement;

    expect(link.querySelector('.app-footer__social-icon')).toBeTruthy();
    expect(link.querySelector('.app-footer__social-label')?.textContent?.trim()).toBeTruthy();
  });
});
