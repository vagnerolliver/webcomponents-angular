import { ElementRef, Injector, Inject, Renderer2 } from '@angular/core';

// Services
import { ModalService } from './modal.service';
import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';

export abstract class ModalBase {

    modal: ElementRef;

    constructor(
        private renderer: Renderer2,
        private el: ElementRef,
        @Inject(DOCUMENT) private document: any
    ) {}

    open(title: string) {
        this.build(title);
    }

    close() {
        this.renderer.removeChild(this.el.nativeElement, this.modal);
    }

    private build(title: string) {
        this.modal = this.renderer.createElement('div');
        const text = this.renderer.createText(title);

        this.renderer.addClass(this.modal, 'my-modal');
        this.renderer.appendChild(this.modal, text);

        this.renderer.appendChild(this.el.nativeElement, this.modal);
        // this.body.appendChild(div);

        // TODO
        // build modal structure
    }

    // getModal(): Observable<any> {
    //     return this.subject.asObservable();
    // }

};