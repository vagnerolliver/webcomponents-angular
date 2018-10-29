import { Component, OnInit } from '@angular/core';

import { WizardPageCollectionService } from '../wizard-page-collection.service';
import { WizardNavigationService } from '../wizard-navigation.service';
import { ButtonHubService } from '../button-hub.service';

@Component({
  selector: 'zv-wizard-page',
  template: '<ng-content></ng-content>',
  host: {
    '[id]': 'id',
     role: 'tabpanel',
    '[attr.aria-hidden]': '!current',
    '[attr.aria-labelledby]': 'stepItemId',
    '[class.active]': 'current',
    '[class.clr-wizard-page]': 'true',
  },
})
export class WizardPageComponent implements OnInit {

   /**
     * Creates an instance of WizardComponent.
     *
     * @memberof WizardComponent
     */

    constructor(
      public  wizardPageCollection: WizardPageCollectionService,
      public  wizardNavigation: WizardNavigationService,
      public  buttonService: ButtonHubService
  ) { }

    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * @memberof WizardPage
     *
     */
    public ngOnInit(): void {
      const navService = this.wizardNavigation;
      if (!navService.currentPage && !navService.navServiceLoaded) {
        this.makeCurrent();
        this.wizardNavigation.navServiceLoaded = true;
      }
    }

    /**
     * A read-only getter that returns the id used by the step nav item associated with the page.
     *
     * ClrWizardPage needs this ID string for aria information.
     *
     * @memberof WizardPage
     *
     */
    public get stepItemId(): string {
        return this.wizardPageCollection.getStepItemIdForPage(this);
    }

}
