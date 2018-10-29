import { Component, OnInit, Input } from '@angular/core';
import { WizardNavigationService } from '../wizard-stepnav/wizard-navigation.service';
import { WizardPageCollectionService } from '../wizard-page/wizard-page-collection.service';
import { WizardPageComponent } from '../wizard-page/wizard-page.component';

@Component({
  selector: '[app-wizard-stepnav-item]',
  template: `
    <button type="button" class="btn btn-link wizard-stepnav-link" (click)="click()">
      <ng-template [ngTemplateOutlet]="page.navTitle"></ng-template>
    </button>
  `,
  host: {
    '[id]': 'id',
    '[attr.aria-selected]': 'isCurrent',
    '[attr.aria-controls]': 'id',
    role: 'tab',
    '[class.wizard-nav-link]': 'true',
    '[class.nav-item]': 'true',
    '[class.is-active]': 'isCurrent',
    '[class.disabled]': 'isDisabled',
    '[class.no-click]': '!canNavigate',
    '[class.complete]': 'isComplete',
  },
 })
export class WizardStepnavItemComponent {

    @Input('page') public page: WizardPageComponent;

    constructor(
        public navService: WizardNavigationService,
        public pageService: WizardPageCollectionService
    ) {}

    private pageGuard(): void {
      if (!this.page) {
        throw new Error('Wizard stepnav item is not associated with a wizard page.');
      }
    }

    public get id(): string {
      this.pageGuard();
      return this.pageService.getStepItemIdForPage(this.page);
    }

    public get isDisabled(): boolean {
      this.pageGuard();
      return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
    }

    public get isCurrent(): boolean {
      this.pageGuard();
      return this.page.current;
    }

    public get isComplete(): boolean {
      this.pageGuard();
      return this.page.completed;
    }

    public get canNavigate(): boolean {
      this.pageGuard();
      return this.pageService.previousPageIsCompleted(this.page);
    }

    click(): void {
      this.pageGuard();

      // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
      if (this.isDisabled || this.isCurrent) {
        return;
      }

      this.navService.goTo(this.page);
    }
}
