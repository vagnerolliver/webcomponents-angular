import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ModalService } from '../../shared/modal/modal.service';

@Component({
  selector: 'app-drive-accordion',
  templateUrl: './drive-accordion.component.html',
  styleUrls: ['./drive-accordion.component.sass']
})
export class DriveAccordionComponent implements OnInit {

    constructor(private modal: ModalService) {}

    ngOnInit() {}

    onModal(title: string) {
        this.modal.open(title);
    }

    onClose() {
        this.modal.close();
    }

}
