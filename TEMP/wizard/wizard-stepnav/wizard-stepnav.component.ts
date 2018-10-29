import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'zv-wizard-stepnav',
    template: `
        <ol class="clr-wizard-stepnav-list" role="tablist">
            <li *ngFor="let page of pageService.pages" clr-wizard-stepnav-item
            [page]="page" class="clr-wizard-stepnav-item"></li>
        </ol>
    `,
    host: { class: 'clr-wizard-stepnav' },
})
export class WizardStepnavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
