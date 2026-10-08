import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeMode } from './theme-mode';

describe('ThemeMode', () => {
  let component: ThemeMode;
  let fixture: ComponentFixture<ThemeMode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeMode]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeMode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
