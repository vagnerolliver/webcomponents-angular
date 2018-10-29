import { Component, OnInit } from '@angular/core';
import { BaseInput } from '../baseinput';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.sass']
})
export class InputTextareaComponent extends BaseInput implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
