import { Component, OnInit } from '@angular/core';
import { BaseInput } from '../baseinput';

@Component({
    selector: 'app-input-checkbox',
    templateUrl: './input-checkbox.component.html',
    styleUrls: ['./input-checkbox.component.sass']
})
export class InputCheckboxComponent extends BaseInput implements OnInit {

    constructor() {
        super();
    }

    isChecked(value: any) {
        let boolean = value;

        if ( !value ) {
            boolean = false;
        }

        this.onChange(boolean);
    }

    ngOnInit() {
    }

}
