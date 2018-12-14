import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from 'src/app/shared/wizard/wizard.component';

@Component({
  selector: 'app-drive-wizard',
  templateUrl: './drive-wizard.component.html',
  styleUrls: ['./drive-wizard.component.sass']
})
export class DriveWizardComponent implements OnInit {
  @ViewChild('wizard') wizard: WizardComponent;

  public handleDangerClick(): void {
    this.wizard.finish(false);
  }

  public showWarning = false;

  public doCustomClick(buttonType: string): void {

    debugger;

    if ('custom-next' === buttonType) {
      this.wizard.next(false);
    }

    if ('custom-previous' === buttonType) {
      this.wizard.previous();
    }

    if ('custom-danger' === buttonType) {
      this.showWarning = true;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
