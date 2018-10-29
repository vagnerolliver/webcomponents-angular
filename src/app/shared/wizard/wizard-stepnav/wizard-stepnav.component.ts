import { Component } from '@angular/core';
import { WizardPageCollectionService } from '../wizard-page/wizard-page-collection.service';

@Component({
  selector: 'app-wizard-stepnav',
  templateUrl: 'wizard-stepnav.component.html',
  host: { class: 'wizard-stepnav' },
})
export class WizardStepnavComponent {
  constructor(public pageService: WizardPageCollectionService) { }
}
