import { Component, OnInit } from '@angular/core';
import { BaseInput } from '../baseinput';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.sass']
})
export class InputTextComponent extends BaseInput implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
