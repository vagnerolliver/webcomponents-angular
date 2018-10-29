import { Component, OnInit } from '@angular/core';
import { BaseInput } from '../baseinput';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.sass']
})
export class InputRadioComponent extends BaseInput implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
