import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-drive-form-builder',
    templateUrl: './drive-form-builder.component.html',
    styleUrls: ['./drive-form-builder.component.sass']
})
export class DriveFormBuilderComponent implements OnInit {

    form: FormGroup;

    dataStates: any[];
    chooseMultiple: any[];

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.dataStates = [
            { key: 'Rio Grande do Sul', value: 'RS' },
            { key: 'Santa Catarina', value: 'SC' },
            { key: 'Paraná', value: 'PR' }
        ];

        this.createFormFields();
    }

    createFormFields() {
        this.form = this.fb.group({
            // 'firstName': ['Vagner'],
            // 'lastName': [''],
            'description': ['texto description'],
            'street': [''],
            'cep': [''],
            'state': ['RS'],
            'sexo': [''],
            'defaultValue': '',
            'city': [''],
        }, { });
    }
}
