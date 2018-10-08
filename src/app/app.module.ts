import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccordionComponent } from './accordion/accordion.component';
import { PanelComponent } from './panel/panel.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './/app-routing.module';
import { DriveModalComponent } from './template/drive-modal/drive-modal.component';
import { DriveAccordionComponent } from './template/drive-accordion/drive-accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    PanelComponent,
    DriveModalComponent,
    DriveAccordionComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
