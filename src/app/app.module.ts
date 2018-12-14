import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccordionComponent } from './accordion/accordion.component';
import { PanelComponent } from './panel/panel.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './/app-routing.module';
import { DriveModalComponent } from './template/drive-modal/drive-modal.component';
import { DriveAccordionComponent } from './template/drive-accordion/drive-accordion.component';
import { DriveFormBuilderComponent } from './template/drive-form-builder/drive-form-builder.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DriveWizardComponent } from './template/drive-wizard/drive-wizard.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    PanelComponent,
    DriveModalComponent,
    DriveAccordionComponent,
    DriveFormBuilderComponent,
    DriveWizardComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
