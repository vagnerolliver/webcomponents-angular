import { Component, OnInit, Renderer2, ElementRef, Inject, ViewChild } from '@angular/core';
import { ModalService } from '../../shared/modal/modal.service';
import { ModalBase } from '../../shared/modal/modal.base';
import { DOCUMENT } from '@angular/platform-browser';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
    selector: 'app-drive-modal',
    templateUrl: './drive-modal.component.html',
    styleUrls: ['./drive-modal.component.sass']
})
export class DriveModalComponent extends ModalBase implements OnInit {

    @ViewChild('meuModal') meuModal: any;

    constructor(
        render: Renderer2,
        elem: ElementRef,
        @Inject(DOCUMENT) document: ElementRef
    ) {
        super(render, elem, document);
    }

    ngOnInit() {}

    onModal(title: string) {
        this.open(title);
    }

    onClose() {
        this.close();
        // this.modal.close();
    }

    openModalTemplate() {
        this.meuModal.open();
    }

}
