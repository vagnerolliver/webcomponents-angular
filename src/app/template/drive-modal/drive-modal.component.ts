import { Component, OnInit, Renderer2, ElementRef, Inject } from '@angular/core';
import { ModalService } from '../../shared/modal/modal.service';
import { ModalBase } from '../../shared/modal/modal.base';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-drive-modal',
    templateUrl: './drive-modal.component.html',
    styleUrls: ['./drive-modal.component.sass']
})
export class DriveModalComponent extends ModalBase implements OnInit {

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

}
