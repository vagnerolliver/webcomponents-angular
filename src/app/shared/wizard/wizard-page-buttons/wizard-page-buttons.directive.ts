import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appWizardPageButtons]'
})
export class WizardPageButtonsDirective {
  constructor(public pageButtonsTemplateRef: TemplateRef<any>) {}
}
