import { Injectable,
         Inject,
         Renderer2,
         ElementRef,
         RendererFactory2,
         OnInit,
         EventEmitter,
         Output } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { Modal, ModalActions } from './modal.model';

// let LABEL_SAVE_CONTINUE = '';
// let LABEL_SAVE_LEAVE = '';
let LABEL_SAVE = '';
let LABEL_CANCEL = '';
let LABEL_DELETE = '';
let LABEL_OK = '';

@Injectable()
export class ModalService implements OnInit {

    private renderer: Renderer2;
    private modal: ElementRef;

    private visible: boolean;

    private buttonClass: string;
    private id: string;

    cancelLabelKey: string;
    confirmLabelKey: string;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

    subject = new Subject<any>();
    modalCurrent;

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.isVisible = false;
        LABEL_SAVE = 'SALVAR';
        LABEL_OK = 'OK';
        LABEL_CANCEL = 'CANCEL';
        LABEL_DELETE = 'DELETE';
    }

    ngOnInit() {
    }

    set isVisible(value: boolean) {
        this.visible = value;
    }

    get isVisible(): boolean {
        return this.visible;
    }

    initModal(modal: any): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            const _modal: Modal = new Modal(modal);

            if (!this.isVisible) {
                this.build(_modal);
                this.isVisible = true;
            }

            this.onCancel.subscribe(() => {
                observer.next('cancel');
            });

            this.onConfirm.subscribe(() => {
                observer.next('confirm');
            });
        });

    }

    close() {
        this.renderer.removeChild(this.document.body, this.modal);
        this.renderer.removeClass(this.document.body.parentElement, 'is-clipped');
        this.isVisible = false;
    }

    cancel() {
        this.close();
        this.subject.next({ action: 'cancel', id: this.id });
        this.onCancel.emit({ result: this.id });
    }

    confirm() {
        this.close();
        this.subject.next({ action: 'confirm', id: this.id});
        this.onConfirm.emit({ result: this.id });
    }

    private listenClose(elem: ElementRef) {
        this.renderer.listen(elem, 'click', (event) => {
            this.close();
        });
    }

    private listencancel(elem: ElementRef) {
        this.renderer.listen(elem, 'click', (event) => {
            this.cancel();
        });
    }

    private listenconfirm(elem: ElementRef) {
        this.renderer.listen(elem, 'click', (event) => {
            this.confirm();
        });
    }

    private setModalActions(role: string, actions: ModalActions) {
        if (role === 'info') {
            if (actions.cancelLabelKey ) {
                this.cancelLabelKey = actions.cancelLabelKey || LABEL_CANCEL;
            }
            this.confirmLabelKey = actions.confirmLabelKey || LABEL_OK;
        }

        if (role === 'delete') {
            this.cancelLabelKey = actions.cancelLabelKey || LABEL_CANCEL;
            this.confirmLabelKey = actions.confirmLabelKey || LABEL_DELETE;
        }

        if (role === 'save') {
            this.cancelLabelKey  = actions.cancelLabelKey || LABEL_CANCEL;
            this.confirmLabelKey = actions.confirmLabelKey || LABEL_SAVE;
        }

        if (role === 'dialog') { // default
            this.cancelLabelKey = actions.cancelLabelKey || null;
            this.confirmLabelKey = actions.confirmLabelKey || null;
        }

        this.buttonClass = this.setColorButtonConfirm(role);
    }

    private setSize(size: string) {
        switch (size) {
            case 'small': size = 'is-small'; break;
            case 'medium': size = 'is-medium'; break;
            case 'large': size = 'is-large'; break;
            case 'fullwidth': size = 'is-fullwidth'; break;
            default: size = 'no-size';
        }
        return size;
    }

    private setColorButtonConfirm(role: string) {
        let color = '';

        switch (role) {
            case 'delete': color = 'is-danger'; break;
            case 'save': color = 'is-primary'; break;
            default: color = 'is-info';
        }
        return color;
    }

    private setActionsPosition(position: string) {
        switch (position) {
            case 'left': position = 'is-left'; break;
            case 'center': position = 'is-centered'; break;
            default: position = 'is-right';
        }
        return position;
    }

    private build(onModal: Modal) {
        const modalHeader  = onModal;
        const modalBody = onModal.content;
        const modalActions = onModal.actions;

        this.modal = this.renderer.createElement('modal');
        const body = this.document.body;
        this.renderer.addClass(body.parentElement, 'is-clipped');

        this.id = onModal.id;
        this.renderer.setAttribute(this.modal, 'id', this.id);

        this.renderer.addClass(this.modal, 'modal');
        this.renderer.addClass(this.modal, 'is-active');

        const size = this.setSize(onModal.size);
        this.renderer.addClass(this.modal, size);

        const elementModalCard = this.renderer.createElement('div');
        const elementBackground = this.renderer.createElement('div');

        this.renderer.addClass(elementModalCard, 'modal-card');
        this.renderer.addClass(elementBackground, 'modal-background');

        // Settings elements Header, Main, Footer
        const elementModalHeader = this.configHeader(modalHeader);
        const elementModalBody = this.configBody(modalBody);

        this.renderer.appendChild(elementModalCard, elementModalHeader);
        this.renderer.appendChild(elementModalCard, elementModalBody);

        this.setModalActions(onModal.role.toLowerCase(), modalActions);

        if (!modalActions.isHidden) {
            const elementActions = this.configActions(modalActions);

            if (modalActions.type === 'footer') {
                this.renderer.appendChild(elementModalCard, elementActions);
            } else {
                this.renderer.appendChild(elementModalBody, elementActions);
            }
        }

        this.renderer.appendChild(this.modal, elementBackground);
        this.renderer.appendChild(this.modal, elementModalCard);

        // render modal to body
        this.renderer.appendChild(body, this.modal);
    }

    /**
     * Create modal header arguments by component
     * TODO: Component send data text: string
     *
     * @private
     * @param {Modal} modal
     * @returns {ElementRef}
     * @memberof ModalService
     */
    private configHeader(modalHeader: Modal): ElementRef {

        const title = this.renderer.createText(modalHeader.title);

        const elemHeader = this.renderer.createElement('header');
        const elemTitle = this.renderer.createElement('h2');
        const elemBtClose = this.renderer.createElement('button');

        this.renderer.addClass(elemHeader, 'modal-card-head');
        this.renderer.addClass(elemTitle, 'modal-card-title');
        this.renderer.addClass(elemBtClose, 'delete');

        this.renderer.appendChild(elemTitle, title);
        this.renderer.appendChild(elemHeader, elemTitle);

        if (modalHeader.btClose ) {
            this.renderer.appendChild(elemHeader, elemBtClose);
            this.listenClose(elemBtClose);
        }

        return elemHeader;
    }

    /**
     * ElementRef text
     * TODO: Component send data text: string
     *
     * @private
     * @param {string} body
     * @returns {ElementRef}
     * @memberof ModalService
     */
    private  configBody(body: string): ElementRef {
        const textMain = this.renderer.createText(body);

        const elemMain = this.renderer.createElement('section');
        const elemParagraph = this.renderer.createElement('p');

        this.renderer.addClass(elemMain, 'modal-card-body');

        this.renderer.appendChild(elemParagraph, textMain);
        this.renderer.appendChild(elemMain, elemParagraph);

        return elemMain;
    }

    /**
     * Arguments actions true/false show buttons cancel and continue
     * TODO: Component need send data actions? :any[]
     *
     * @private
     * @param {Modal} modal
     * @returns {ElementRef}
     * @memberof ModalService
     */
    private  configActions(modalAction: ModalActions): ElementRef {

        // create elements
        const elemFooter = this.renderer.createElement('footer');
        const elemButtons = this.renderer.createElement('div');

        const elemBtCancel = this.renderer.createElement('button');
        const elemBtConfirm = this.renderer.createElement('button');

        const textCancel = this.renderer.createText(this.cancelLabelKey);
        const textSave = this.renderer.createText(this.confirmLabelKey);

        // add class elements
        this.renderer.addClass(elemFooter, 'modal-card-foot');
        this.renderer.addClass(elemButtons, 'buttons');

        const position = this.setActionsPosition(modalAction.position);
        this.renderer.addClass(elemButtons, position);

        if (modalAction.customClass.length > 0) {
            const arrayClass = modalAction.customClass.split(' ');

            for (let i = 0; i < arrayClass.length; i++) {
                this.renderer.addClass(elemButtons, arrayClass[i]);
            }
        }

        this.renderer.addClass(elemBtCancel, 'button');
        this.renderer.addClass(elemBtConfirm, 'button');

        this.renderer.addClass(elemBtConfirm, this.buttonClass);

        this.renderer.setAttribute(elemBtConfirm, 'type', 'button');
        this.renderer.setAttribute(elemBtConfirm, 'type', 'submit');

        // append child elements

        this.renderer.appendChild(elemBtCancel, textCancel);
        this.renderer.appendChild(elemBtConfirm, textSave);

        if (this.cancelLabelKey) {
            this.renderer.appendChild(elemButtons, elemBtCancel);
        }

        if (this.confirmLabelKey) {
            this.renderer.appendChild(elemButtons, elemBtConfirm);
        }

        this.renderer.appendChild(elemFooter, elemButtons);

        this.listencancel(elemBtCancel);
        this.listenconfirm(elemBtConfirm);

        // return ElementRef specific to use with modal-card-body or footer.modal-card-foot
        return modalAction.type === 'footer' ? elemFooter : elemButtons;
    }

    getModal(): Observable<any> {
        return this.subject.asObservable();
    }
}
