import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { FlashRequestModal } from './flash-request-modal';
import { Flash } from '../flashes.model';
import { I18nService } from '../../../core/services/i18n.service';

const SAMPLE_FLASH: Flash = {
  id: 'flash-1',
  name: 'Borboleta',
  imageUrl: '/img.jpg',
  size: '6cm',
  price: 250,
  status: 'available'
};

function createSubmitEvent(): Event {
  return { preventDefault: () => undefined } as unknown as Event;
}

describe('FlashRequestModal', () => {
  let fixture: ComponentFixture<FlashRequestModal>;
  let component: FlashRequestModal;
  let i18n: I18nService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashRequestModal]
    }).compileComponents();

    fixture = TestBed.createComponent(FlashRequestModal);
    component = fixture.componentInstance;
    i18n = TestBed.inject(I18nService);
    fixture.componentRef.setInput('flash', null);
    fixture.detectChanges();
  });

  function getDialog(): HTMLDialogElement {
    return fixture.nativeElement.querySelector('dialog');
  }

  function fillValidForm(): void {
    (component as any).requestForm.name().value.set('Jane Doe');
    (component as any).requestForm.email().value.set('jane@example.com');
    (component as any).requestForm.phoneNumber().value.set('+55 11 99999-0000');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is closed by default and opens when a flash is set', () => {
    expect(getDialog().open).toBe(false);

    fixture.componentRef.setInput('flash', SAMPLE_FLASH);
    fixture.detectChanges();

    expect(getDialog().open).toBe(true);
    expect(fixture.nativeElement.querySelector('.flash-request-modal__title').textContent).toContain(
      i18n.translate('flashes.requestModal.title', { name: SAMPLE_FLASH.name })
    );
  });

  it('does not emit submitted when required fields are missing', () => {
    fixture.componentRef.setInput('flash', SAMPLE_FLASH);
    fixture.detectChanges();

    const spy = vi.fn();
    component.submitted.subscribe(spy);

    (component as any).onSubmit(createSubmitEvent());

    expect(spy).not.toHaveBeenCalled();
  });

  it('rejects an invalid phone number', () => {
    fixture.componentRef.setInput('flash', SAMPLE_FLASH);
    fixture.detectChanges();

    fillValidForm();
    (component as any).requestForm.phoneNumber().value.set('abc');

    const spy = vi.fn();
    component.submitted.subscribe(spy);
    (component as any).onSubmit(createSubmitEvent());

    expect(spy).not.toHaveBeenCalled();
  });

  it('emits submitted with a trimmed payload when the form is valid', () => {
    fixture.componentRef.setInput('flash', SAMPLE_FLASH);
    fixture.detectChanges();

    fillValidForm();
    (component as any).requestForm.description().value.set('  Quero esse na coxa  ');

    const spy = vi.fn();
    component.submitted.subscribe(spy);
    (component as any).onSubmit(createSubmitEvent());

    expect(spy).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phoneNumber: '+55 11 99999-0000',
      description: 'Quero esse na coxa'
    });
  });

  it('does not submit while already submitting', () => {
    fixture.componentRef.setInput('flash', SAMPLE_FLASH);
    fixture.componentRef.setInput('submitting', true);
    fixture.detectChanges();

    fillValidForm();

    const spy = vi.fn();
    component.submitted.subscribe(spy);
    (component as any).onSubmit(createSubmitEvent());

    expect(spy).not.toHaveBeenCalled();
  });

  it('renders the submit error message when set', () => {
    fixture.componentRef.setInput('flash', SAMPLE_FLASH);
    fixture.componentRef.setInput('submitError', 'flashes.requestModal.errors.submitFailed');
    fixture.detectChanges();

    const errorEl: HTMLElement = fixture.nativeElement.querySelector('.flash-request-modal__error--submit');
    expect(errorEl.textContent).toContain(i18n.translate('flashes.requestModal.errors.submitFailed'));
  });

  it('emits closed on Escape', () => {
    fixture.componentRef.setInput('flash', SAMPLE_FLASH);
    fixture.detectChanges();

    const closedSpy = vi.fn();
    component.closed.subscribe(closedSpy);

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    getDialog().dispatchEvent(escapeEvent);
    fixture.detectChanges();

    expect(closedSpy).toHaveBeenCalledTimes(1);
    expect(getDialog().open).toBe(false);
  });
});
