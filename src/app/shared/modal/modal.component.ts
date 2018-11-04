import { Component, OnInit, HostListener, Inject, Input, EventEmitter, Output } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onOpen: EventEmitter<any> = new EventEmitter<any>();

    visible: boolean;
    isCardHidden: boolean;

    @Input()
    title: string;

    @Input()
    message: string;

    @Input()
    hasFooter: boolean;

    @Input()
    actionCancel: string;

    @Input()
    actionConfirm: string;

    @Input('role')
    set role(value: string) {
        this.buttonConfirmColor = value;
        this._role = value;
    }
    private _role: string;
    get role(): string {
        return this._role;
    }

    @Input('buttonConfirmColor')
    set buttonConfirmColor(value: string) {
        switch (value) {
            case 'danger': value = 'is-danger'; break;
            case 'primary': value = 'is-primary'; break;
            case 'save': value = 'is-primary'; break;
            case 'delete': value = 'is-danger'; break;
            default: value = 'is-info';
        }
        this._btConfirmColor = value;
    }
    private _btConfirmColor: string;
    get buttonConfirmColor() {
        return this._btConfirmColor;
    }

    @Input('buttonsPosition')
    set buttonsPosition(value: string) {
        switch (value) {
            case 'left': value = 'is-left'; break;
            case 'center': value = 'is-centered'; break;
            default: value = 'is-right';
        }
        this._buttonsPosition = value;
    }
    private _buttonsPosition: string;
    get buttonsPosition(): string {
        return this._buttonsPosition;
    }

    @Input('size')
    set size(value: string) {
        switch (value) {
            case 'small': value = 'is-small'; break;
            case 'medium': value = 'is-medium'; break;
            case 'large': value = 'is-large'; break;
            case 'fullwidth': value = 'is-fullwidth'; break;
            default: value = '';
        }
        this._size = value;
    }
    private _size: string;
    get size(): string {
        return this._size;
    }

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngOnInit() {
        this.setVisible(false);
        this.setCardHidden(false);
        this.hasFooter = true;
        this.buttonConfirmColor = this.role || 'info';
        this.buttonsPosition = 'right';
    }

    setVisible(value: boolean) {
        this.visible = value;
    }

    setCardHidden(value: boolean) {
        this.isCardHidden = value;
    }

    /* Perform open modal dialog */
    fire() {
        this.setVisible(true);
        this.document.body.parentElement.classList.add('is-clipped');
        this.onOpen.emit({});
    }

    /* Perform close modal dialog */
    @HostListener('body:keyup.escape')
    public close() {
        this.setVisible(false);
        this.document.body.parentElement.classList.remove('is-clipped');
        this.onClose.emit({ result: 1 });
    }

    public cancel() {
        this.setVisible(false);
        this.document.body.parentElement.classList.remove('is-clipped');
        this.onCancel.emit({ result: 0 });
    }

    public transitionModalCard() {
        const TRANSITION_DELAY = 10;
        this.setCardHidden(true);

        setTimeout(() => {
            this.setCardHidden(false);
        }, TRANSITION_DELAY);
    }

}
