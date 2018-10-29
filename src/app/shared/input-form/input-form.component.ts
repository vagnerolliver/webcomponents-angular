import { Component, OnInit, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'app-input-form',
    templateUrl: './input-form.component.html',
    styleUrls: ['./input-form.component.sass'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFormComponent),
            multi: true
        }
    ]
})
export class InputFormComponent implements OnInit {

    value: string;

    @Input()
    type: string;

    @Input()
    label: string;

    @Input()
    tooltip: string;

    @Input()
    hint: string;

    @Input()
    items: any[];

    @Input()
    required: boolean;

    @Input()
    placeholder: string;

    @Output() newValue: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.required = false;
        this.value = '';
    }

    update(value: any) {
        this.onChange(value);
        this.newValue.emit(value);
    }

    onChange = (_: any) => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        // do nothing
    }

}

