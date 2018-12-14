import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'appHighlight',
  templateUrl: './highlight.component.html'
})

export class HighlightComponent implements OnInit, OnChanges {

    @Input()
    listVariables: any;

    @Input()
    content: any;

    @Output() action: EventEmitter<any> = new EventEmitter();

    @Output()
    highlight: any;

    constructor() {
    }

    ngOnInit() {
        this.highlight = this.filter(this.content);
    }

    //
    // addChave(content: string) {
    //      if ( content.indexOf('#{') !== -1) {
    //          this.content += '}';
    //          this.action.emit(this.content);
    //      }
    // }

    ngOnChanges() {
        this.highlight = this.filter(this.content);
    }

    escapeHtml(content: any) {

        return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    filter(content: any) {
        const regex = /#{[^}]+}/g;
        const str = this.escapeHtml(this.content);

        return str.replace(regex, '<span class="highlighted">$&</span>');
    }

}
