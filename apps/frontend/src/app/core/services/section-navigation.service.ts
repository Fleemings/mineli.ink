import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { SectionId } from '../../shared/types/section.model';

@Injectable({
  providedIn: 'root'
})
export class SectionNavigationService {
  private readonly activeSectionSignal = signal<SectionId>('landing');
  private readonly sectionRequestsSubject = new Subject<SectionId>();

  readonly activeSection = this.activeSectionSignal.asReadonly();
  readonly sectionRequests$ = this.sectionRequestsSubject.asObservable();

  requestSection(sectionId: SectionId): void {
    this.sectionRequestsSubject.next(sectionId);
  }

  setActiveSection(sectionId: SectionId): void {
    this.activeSectionSignal.set(sectionId);
  }
}
