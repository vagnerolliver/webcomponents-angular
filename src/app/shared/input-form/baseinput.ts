import { Input, Output, EventEmitter } from '@angular/core';
import { InputSelectModel } from './input-select/input-select.model';

export abstract class BaseInput {

    @Input()
    value: string;

    @Input()
    placeholder: string;

    @Input()
    items: InputSelectModel;

    @Output() newValue: EventEmitter<any> = new EventEmitter();

    onChange(value: any) {
        this.newValue.emit(value);
    }

    onBlur(value: string) {
        this.newValue.emit(value);
    }

    onClick(value: string) {
        this.newValue.emit(value);
    }

    constructor() {}
}
