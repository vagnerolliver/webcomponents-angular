import { Component, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
    selector: 'app-accordion',
    template: '<ng-content></ng-content>',
    styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements AfterContentInit {

    @Input()
    collapsed: boolean;

    @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

    constructor() {
        // Define standard to toggleCollapse;
        this.collapsed = true;
    }

    ngAfterContentInit() {
        this.panels.toArray().forEach((panel: PanelComponent) => {
            panel.toggle.subscribe(() => {
                if (this.collapsed) {
                    this.toggleCollapse(panel);
                    return false;
                }

                this.toggleMultiTarget(panel);
            });
        });
    }

    toggleMultiTarget(panel: PanelComponent) {
        panel.opened = !panel.opened;
    }

    toggleCollapse(panel: PanelComponent) {
        const opened = panel.opened;

        this.panels.toArray().forEach(p => p.opened = false);

        panel.opened = !opened;
    }
}
