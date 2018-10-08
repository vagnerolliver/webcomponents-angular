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
        const modal = this.modal = this.renderer.createElement('modal');
        const body = this.document.body;

        this.renderer.addClass(modal, 'modal-card');

        const contentHeader = this.getContentHeader();
        const contentMain = this.getContentMain();
        const contentFooter = this.getContentFooter();

        const elementHeader = this.renderer.createElement('header');
        const elementMain = this.renderer.createElement('main');
        const elementFooter = this.renderer.createElement('footer');

        this.renderer.addClass(elementHeader, 'card-header');
        this.renderer.addClass(elementMain, 'card-main');
        this.renderer.addClass(elementFooter, 'card-footer');

        this.renderer.appendChild(elementHeader, contentHeader);
        this.renderer.appendChild(elementMain, contentMain);
        this.renderer.appendChild(elementFooter, contentFooter);

        this.renderer.appendChild(modal, elementHeader);
        this.renderer.appendChild(modal, elementMain);
        this.renderer.appendChild(modal, elementFooter);

        this.renderer.appendChild(body, modal);
    }

    getContentHeader() {
        // TODO structure setting
        return this.renderer.createText('header');
    }

    getContentMain() {
        return this.renderer.createText('main');
    }

    getContentFooter() {
        return this.renderer.createText('footer');
    }

    // getModal(): Observable<any> {
    //     return this.subject.asObservable();
    // }
}
