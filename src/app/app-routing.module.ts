import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriveModalComponent } from './template/drive-modal/drive-modal.component';
import { DriveAccordionComponent } from './template/drive-accordion/drive-accordion.component';
import { AppComponent } from './app.component';
import { DriveFormBuilderComponent } from './template/drive-form-builder/drive-form-builder.component';
import { DriveWizardComponent } from './template/drive-wizard/drive-wizard.component';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';

const routes: Routes = [
  { path: 'wizard', component: DriveWizardComponent },
  { path: 'form', component: DriveFormBuilderComponent },
  { path: 'modal', component: DriveModalComponent },
  { path: 'accordion', component: DriveAccordionComponent },
  { path: 'autocomplete', component: AutocompleteComponent},
  { path: '**', component: DriveWizardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
