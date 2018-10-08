import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalComponent],
  providers: [ModalService]
})
export class SharedModule { }
