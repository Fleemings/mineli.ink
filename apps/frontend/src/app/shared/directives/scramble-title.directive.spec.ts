import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambleTitleDirective } from './scramble-title.directive';

@Component({
  standalone: true,
  imports: [ScrambleTitleDirective],
  template: `<h1 [appScrambleTitle]="text()"></h1>`
})
class HostComponent {
  readonly text = signal('Hello world');
}

describe('ScrambleTitleDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let element: HTMLHeadingElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('h1');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('writes the initial text into the host element', () => {
    expect(element.textContent?.trim()).toBe('Hello world');
  });

  it('replays the animation with the new text when the input changes', async () => {
    host.text.set('Bonjour le monde');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(element.textContent?.trim()).toBe('Bonjour le monde');
  });

  it('does not leave stale text from a previous value after multiple updates', async () => {
    host.text.set('First update');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    host.text.set('Second update');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(element.textContent?.trim()).toBe('Second update');
  });

  it('cleans up the GSAP timeline and split on destroy without throwing', () => {
    expect(() => fixture.destroy()).not.toThrow();
  });
});
