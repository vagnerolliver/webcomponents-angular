import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appWizardPageNavTitle]'
})
export class WizardPageNavTitleDirective {
  constructor(public pageNavTitleTemplateRef: TemplateRef<any>) {}
}
