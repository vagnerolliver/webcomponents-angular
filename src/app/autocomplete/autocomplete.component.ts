import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ɵAnimationGroupPlayer} from '@angular/animations';

export const mockVarsAutocomplete: any = [
    '#{name}',
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
export class AutocompleteComponent implements OnInit {

    content: string;
    listVariables: any[];
    itemListVariablesSelected: number;

    query = {
      'text': '',
      'headPos': 0,
      'endPos': 0
    };

    constructor() {
        this.itemListVariablesSelected = 0;
        this.content = '';
    }

    ngOnInit() {}

    matcher(subtext: string): any {
      let flag = '#{'.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      flag = '(?:^|\\s)' + flag;

      const _a = decodeURI('%C3%80');
      const _y = decodeURI('%C3%BF');

      const space =  ' ';
      const regexp = new RegExp(flag + '([A-Za-z' + _a + '-' + _y + '0-9_' + space + '\'\.\+\-]*)$|' + flag + '([^\\x00-\\xff]*)$', 'gi');
      const match = regexp.exec(subtext);

      if (match) {
         return match[1];
      }

      return;
    }

    suggestionsVariables(content: string, event: any) {
        const selectionStart = event.target.selectionStart;
        const subtext = content.slice(0, selectionStart );
        const query = this.matcher(subtext);

        if ( typeof query === 'undefined') {
            this.query.text = '';
            return;
        }

        const start = selectionStart - query.length
        const end = start + query.length

        this.query = {
          'text': query,
          'headPos': start,
          'endPos': end
        };

        this.listVariables =  mockVarsAutocomplete.filter( res => {
          const result = res.substr(0, res.length).toUpperCase().indexOf(this.query.text.toUpperCase());
          return result > -1 ? res : null;
        });

        this.chooseVariable(event);
    }

    insertVariableAtContent(variable: string) {
        const startStr = this.content.slice(0, this.query.headPos - 2);
        this.content = startStr + variable + (this.content.slice(this.query.endPos || 0));
    }

    chooseVariable(e: any) {
        e.preventDefault();
        if (e.keyCode === 40) {
            this.itemListVariablesSelected++;
        } else if (e.keyCode === 38) {
            this.itemListVariablesSelected--;
        } else if (e.keyCode === 13) {
            if (this.itemListVariablesSelected > -1) {
                this.insertVariableAtContent(this.listVariables[this.itemListVariablesSelected]);
            }
            return false;
        }

        if (this.itemListVariablesSelected  >= this.listVariables.length) {
            this.itemListVariablesSelected = 0;
        }

        if (this.itemListVariablesSelected < 0)  {
            this.itemListVariablesSelected = (this.listVariables.length - 1);
        }

     }

    onClick(index: number) {
        this.insertVariableAtContent(this.listVariables[index]);
    }
}
