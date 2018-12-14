import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ɵAnimationGroupPlayer} from '@angular/animations';

export const mockVarsAutocomplete: any = [
    '#{name} ola tudo bem',
    '#{name_first}',
    '#{name_last}',
    '#{name_middle}',
    '#{date_time}',
    '#{time}',
    '#{date}',
    '#{zenbot}',
    '#{empty_var}'
];

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    // styleUrls: ['./autocomplete.component.sass']
})
export class AutocompleteComponent implements OnInit, OnChanges {

    content: string;
    listVariables: any[];
    selectedVariable: string;
    itemListCurrentFocus: number;

    @ViewChild('textAreaElement') textAreaElement;

    constructor() {
        this.itemListCurrentFocus = 0;
        this.content = ' ';
        this.listVariables = mockVarsAutocomplete;

    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }

    removePosContent(arrayContent: any[], posRemove: number) {
        arrayContent.splice(posRemove, 1);
        this.content = arrayContent.join(' ');
    }

    verifyContentKey(char: string, event: any) {
        const arrayContent = this.content.split('');
        const prevChar = this.textAreaElement.nativeElement.selectionStart - 1;

        console.log(this.textAreaElement.nativeElement.selectionStart);
        console.log('prevChar');
        console.log(arrayContent[prevChar]);

        if (char === '{') {
            console.log('entrou aqui');
            console.log(char);

             if ( arrayContent[prevChar] === '#' ) {
                 console.log('entrou aqui também');
                 console.log(arrayContent[prevChar]);

                console.log('start autocomplete'); // chama o autocomplete
             }
        }

        // console.log('Content arrayContent');
        // console.log(arrayContent);
    }

    matcher(flag: string, subtext: string) {
      const regex = /#{+/g;
      const match = regex.exec(subtext);

      if ( match !== null )  {
          return match;
      }

      return null;
    }

    getQuery(text: string, selectionStart: number) {
        const content = text;
        const caretPos = selectionStart;

        const subtext = content.slice(0, caretPos);

        const match = this.matcher('#{', subtext);

        const isValid = typeof match !== null;

        if ( !isValid ) {
            return false;
        }

        const query = match.input;
        const start = match.index;
        
        if (isString && _query.length < 0) {
            return false;
        } else if (isString && _query.length > 0) {

            const end = _start + _query.length;

            const q = {
                'text': query,
                'headPos': index,
                'endPos': end
            };

            return query;
        } else {
            return false;
        }
    }

    filterVars(text: string, event: any) {
        const query = this.getQuery(text, this.textAreaElement.nativeElement.selectionStart);

        console.log('query');
        console.log(query);

        return false;

        const { key } = event;

        this.verifyContentKey(key, event);

        // console.log(event);
        //
        // console.log('this.textAreaElement.nativeElement.selectionStart');
        // console.log(this.textAreaElement.nativeElement.selectionStart);
        //
        // console.log('this.textAreaElement.nativeElement.selectionEnd');
        // console.log(this.textAreaElement.nativeElement.selectionEnd);
        //
        // console.log('text length');
        // console.log(text.length);
        // console.log(text.split('').length);
        //
        // console.log('event.key');
        // console.log(event.key);

        // console.log('this.content');
        // console.log(this.content);

        if ( text.length < 3 ) {
            this.itemListCurrentFocus = -1;
            this.selectedVariable = '';
        } else {
            this.listVariables =  mockVarsAutocomplete.filter( res => {
                return res.substr(0, text.length).toUpperCase() === text.toUpperCase();
            });
        }
    }

    onKeyDown(e: any) {
        if (e.keyCode === 40) {
            this.itemListCurrentFocus++;
        } else if (e.keyCode === 38) {
            this.itemListCurrentFocus--;
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (this.itemListCurrentFocus > -1) {
                this.content = this.selectedVariable = this.listVariables[this.itemListCurrentFocus];
            }
            return false;
        }

        if (this.itemListCurrentFocus  >= this.listVariables.length) {
            this.itemListCurrentFocus = 0;
        }

        if (this.itemListCurrentFocus < 0)  {
            this.itemListCurrentFocus = (this.listVariables.length - 1);
        }

     }

    onPressKey(): any {
        if ( this.content !== this.selectedVariable && this.listVariables.length > 0 ) {
            return true;
        }
    }

    onClick(e: any) {
        this.content = this.selectedVariable = this.listVariables[this.itemListCurrentFocus];
    }
}
