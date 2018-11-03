import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WizardNavigationService } from '../wizard-stepnav/wizard-navigation.service';
import { WizardPageButtonsService } from './wizard-page-buttons.service';

export const DEFAULT_BUTTON_TYPES: any = {
  cancel: 'cancel',
  previous: 'previous',
  next: 'next',
  finish: 'finish',
  danger: 'danger',
};

export const CUSTOM_BUTTON_TYPES: any = {
  cancel: 'custom-cancel',
  previous: 'custom-previous',
  next: 'custom-next',
  finish: 'custom-finish',
  danger: 'custom-danger',
};

@Component({
  selector: 'app-wizard-page-button',
  template: `
    <button
        type="button"
        class="btn wizard-btn"
        [class.btn-link]="isCancel"
        [class.wizard-btn--tertiary]="isCancel"
        [class.btn-outline]="isPrevious"
        [class.wizard-btn--secondary]="isPrevious"
        [class.btn-primary]="isPrimaryAction"
        [class.wizard-btn--primary]="isPrimaryAction"
        [class.btn-success]="isFinish"
        [class.btn-danger]="isDanger"
        [class.disabled]="isDisabled"
        [attr.disabled]="_disabledAttribute"
        (click)="click()">
        <ng-content></ng-content>
    </button>`,
  host: { class: 'wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
  styleUrls: ['./wizard-page.component.sass']
})
export class WizardPageButtonComponent {
    @Input('type') public type: string = '';

    @Input('clrWizardButtonDisabled') public disabled: boolean = false;

    @Input('clrWizardButtonHidden') public hidden: boolean = false;

    // EventEmitter which is emitted when a button is clicked.
    @Output('clrWizardButtonClicked') wasClicked: EventEmitter<string> = new EventEmitter<string>(false);

    constructor(
        private navService: WizardNavigationService,
        private buttonService: WizardPageButtonsService
    ) { }

    private checkDefaultAndCustomType(valueToCheck: string = '', typeToLookUp: string) {
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    }

    public get isCancel(): boolean {
        return this.checkDefaultAndCustomType(this.type, 'cancel');
      }

      public get isNext(): boolean {
        return this.checkDefaultAndCustomType(this.type, 'next');
      }

      public get isPrevious(): boolean {
        return this.checkDefaultAndCustomType(this.type, 'previous');
      }

      public get isFinish(): boolean {
        return this.checkDefaultAndCustomType(this.type, 'finish');
      }

      public get isDanger(): boolean {
        return this.checkDefaultAndCustomType(this.type, 'danger');
      }

      public get isPrimaryAction(): boolean {
        return this.isNext || this.isDanger || this.isFinish;
      }

      public get _disabledAttribute(): string | null {
        if (this.isDisabled) {
          return '';
        }
        return null;
      }

      public get isDisabled(): boolean {
        // dealing with negatives here. cognitively easier to think of it like this...
        const disabled = true;
        const nav = this.navService;
        const page = this.navService.currentPage;

        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
          return !disabled;
        }

        if (this.disabled || nav.wizardStopNavigation || !page) {
          return true;
        }

        if (this.isCancel) {
          return !disabled;
        }

        if (this.isPrevious && (nav.currentPageIsFirst || page.previousStepDisabled)) {
          return disabled;
        }

        if (this.isDanger && !page.readyToComplete) {
          return disabled;
        }

        if (this.isNext && (nav.currentPageIsLast || !page.readyToComplete)) {
          return disabled;
        }

        if (this.isFinish && (!nav.currentPageIsLast || !page.readyToComplete)) {
          return disabled;
        }

        return !disabled;
      }

      public get isHidden(): boolean {
        // dealing with negatives here. cognitively easier to think of it like this...
        const hidden = true;
        const nav = this.navService;

        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !hidden;
        }

        if (this.hidden) {
          return true;
        }

        if (this.isCancel) {
          return !hidden;
        }

        if (this.isPrevious && nav.currentPageIsFirst) {
          return hidden;
        }

        if (this.isNext && nav.currentPageIsLast) {
          return hidden;
        }

        if (this.isFinish && !nav.currentPageIsLast) {
          return hidden;
        }

        return !hidden;
    }

    click(): void {
        if (this.isDisabled) {
            return;
        }

        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    }
}
