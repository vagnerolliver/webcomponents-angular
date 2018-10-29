import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

    private visible: boolean;

    constructor() { }

    ngOnInit() {}

    setVisible(value: boolean) {
        this.visible = true;
    }

    open() {
        this.setVisible(true);
    }

    close() {
        this.setVisible(false);
    }

}
