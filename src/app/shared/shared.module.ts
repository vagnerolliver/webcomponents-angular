import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { InputFormComponent } from './input-form/input-form.component';
import { InputTextComponent } from './input-form/input-text/input-text.component';
import { InputSelectComponent } from './input-form/input-select/input-select.component';
import { InputCheckboxComponent } from './input-form/input-checkbox/input-checkbox.component';
import { InputRadioComponent } from './input-form/input-radio/input-radio.component';
import { InputTextareaComponent } from './input-form/input-textarea/input-textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WizardComponent } from './wizard/wizard.component';
import { WizardPageComponent } from './wizard/wizard-page/wizard-page.component';
import { WizardStepnavComponent } from './wizard/wizard-stepnav/wizard-stepnav.component';
import { WizardStepnavItemComponent } from './wizard/wizard-stepnav/wizard-stepnav-item.component';
import { WizardPageNavTitleDirective } from './wizard/wizard-page-nav-title.directive';
import { WizardPageButtonComponent } from './wizard/wizard-page-buttons/wizard-page-buttons.component';
import { WizardPageButtonsDirective } from 'src/app/shared/wizard/wizard-page-buttons/wizard-page-buttons.directive';
import {HighlightComponent} from './highlight/highlight.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalComponent,
    InputFormComponent,
    InputTextComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputTextareaComponent,
    WizardComponent,
    WizardPageComponent,
    WizardStepnavComponent,
    WizardStepnavItemComponent,
    WizardPageNavTitleDirective,
    WizardPageButtonComponent,
    WizardPageButtonsDirective,
    HighlightComponent
  ],
  exports: [
    ModalComponent,
    InputFormComponent,
    InputTextComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputTextareaComponent,
    WizardComponent,
    WizardPageComponent,
    WizardStepnavComponent,
    WizardStepnavItemComponent,
    WizardPageNavTitleDirective,
    WizardPageButtonComponent,
    WizardPageButtonsDirective,
    HighlightComponent
  ],
  providers: [ModalService]
})
export class SharedModule { }
