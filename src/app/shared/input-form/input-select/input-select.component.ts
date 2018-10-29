import { Component, OnInit, Input } from '@angular/core';
import { InputSelectModel } from './input-select.model';
import { BaseInput } from '../baseinput';

@Component({
    selector: 'app-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.sass']
})
export class InputSelectComponent extends BaseInput implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
