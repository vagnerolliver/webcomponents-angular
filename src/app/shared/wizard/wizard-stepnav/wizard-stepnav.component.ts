import { Component } from '@angular/core';
import { WizardPageCollectionService } from '../wizard-page/wizard-page-collection.service';

@Component({
  selector: 'app-wizard-stepnav',
  template: `
      <ol class="wizard-stepnav-list" role="tablist">
            <li *ngFor="let page of pageService.pages"
                app-wizard-stepnav-item [page]="page"
                class="wizard-stepnav-item"></li>
      </ol>
  `,
  host: { class: 'wizard-stepnav' },
})
export class WizardStepnavComponent {

  constructor(public pageService: WizardPageCollectionService) { }

  ngOnInit() {
  }

}
