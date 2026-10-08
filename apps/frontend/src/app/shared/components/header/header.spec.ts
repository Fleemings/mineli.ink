import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with the mobile menu closed', () => {
    fixture.detectChanges();

    const toggle: HTMLButtonElement = fixture.debugElement.query(
      By.css('.app-header__menu-toggle')
    ).nativeElement;
    expect(component.isMobileMenuOpen()).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens the mobile menu when the toggle button is clicked', () => {
    fixture.detectChanges();

    const toggle: HTMLButtonElement = fixture.debugElement.query(
      By.css('.app-header__menu-toggle')
    ).nativeElement;
    toggle.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes the mobile menu after a navigation link is clicked', () => {
    fixture.detectChanges();

    const toggle: HTMLButtonElement = fixture.debugElement.query(
      By.css('.app-header__menu-toggle')
    ).nativeElement;
    toggle.click();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(true);

    const bookingLink: HTMLAnchorElement = fixture.debugElement.queryAll(
      By.css('.app-header__link')
    )[1].nativeElement;
    bookingLink.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(false);
  });
});
