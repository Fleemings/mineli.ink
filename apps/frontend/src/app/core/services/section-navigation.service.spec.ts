import { TestBed } from '@angular/core/testing';

import { SectionNavigationService } from './section-navigation.service';
import { SectionId } from '../../shared/types/section.model';

describe('SectionNavigationService', () => {
  let service: SectionNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionNavigationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('defaults the active section to landing', () => {
    expect(service.activeSection()).toBe('landing');
  });

  it('updates the active section signal', () => {
    service.setActiveSection('booking');
    expect(service.activeSection()).toBe('booking');
  });

  it('emits requested sections through sectionRequests$', () => {
    const received: SectionId[] = [];
    const subscription = service.sectionRequests$.subscribe((sectionId) =>
      received.push(sectionId)
    );

    service.requestSection('faq');
    service.requestSection('landing');

    expect(received).toEqual(['faq', 'landing']);
    subscription.unsubscribe();
  });
});
