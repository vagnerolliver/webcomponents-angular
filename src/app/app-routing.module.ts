import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriveModalComponent } from './template/drive-modal/drive-modal.component';
import { DriveAccordionComponent } from './template/drive-accordion/drive-accordion.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'modal', component: DriveModalComponent },
  { path: 'accordion', component: DriveAccordionComponent },
  { path: '**', component: DriveModalComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
