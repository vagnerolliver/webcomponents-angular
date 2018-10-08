import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-panel',
    template: `
    <div class="panel panel-info">
        <div class="panel-heading" (click)="toggle.emit()">
            {{ title }}
        </div>
        <div class="panel-body" *ngIf="opened">
            <ng-content></ng-content>
        </div>
    <div>
    `,
    styleUrls: ['./panel.component.sass']
})
export class PanelComponent {
    @Input()  opened = false;
    @Input()  title: string;
    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }
}
