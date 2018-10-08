import { Injectable, Renderer2, ElementRef, RendererFactory2, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class ModalService implements OnInit {

    renderer: Renderer2;
    modal: ElementRef;
    // el: ElementRef;
    visible: boolean;

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: any
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.visible = false;
    }

    ngOnInit() {
        this.listenClose(this.modal);
    }

    open(title: string) {
        if ( !this.visible ) {
            this.build(title);
            this.visible = true;
        }
    }

    close() {
        this.renderer.removeChild(this.document.body, this.modal);
        this.visible = false;
    }

    listenClose(elem: ElementRef) {
        this.renderer.listen(elem, 'click', (event) => {
            this.close();
        });
    }

    private build(title: string) {
        this.modal = this.renderer.createElement('modal');
        const text = this.renderer.createText(title);

        this.renderer.addClass(this.modal, 'my-modal');
        this.renderer.appendChild(this.modal, text);

        this.renderer.appendChild(this.document.body, this.modal);
    }

    // getModal(): Observable<any> {
    //     return this.subject.asObservable();
    // }
}
