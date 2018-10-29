import { Component, OnInit, ContentChild, TemplateRef, Output, EventEmitter, Input } from '@angular/core';

import { WizardPageCollectionService } from './wizard-page-collection.service';
import { WizardPageNavTitleDirective } from '../wizard-page-nav-title.directive';
import { WizardNavigationService } from '../wizard-stepnav/wizard-navigation.service';
import { WizardPageButtonsDirective } from '../wizard-page-buttons/wizard-page-buttons.directive';
import { WizardPageButtonsService } from '../wizard-page-buttons/wizard-page-buttons.service';

let wizardPageIndex = 0;

@Component({
  selector: 'app-wizard-page',
  template: '<ng-content></ng-content>',
  host: {
    '[id]': 'id',
    role: 'tabpanel',
    '[attr.aria-hidden]': '!current',
    '[attr.aria-labelledby]': 'stepItemId',
    '[class.is-active]': 'current',
    '[class.wizard-page]': 'true',
  },
})
export class WizardPageComponent implements OnInit {

    /**
     * Emits an event when a next, finish, or danger button is clicked and the
     * WizardPage is the wizard's current page.
     *
     * Can be used in conjunction with the WizardPage.preventDefault
     * (WizardPagePagePreventDefault) input to implement custom forwards
     * or finish navigation at the page level, regardless of the type of
     * primary button.
     *
     * This is useful if you would like to do validation, save data, or warn
     * users before allowing them to go to the next page in the wizard or
     * finish the wizard.
     *
     * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
     * Wizard.forceNext() or Wizard.next() from the host component. This
     * combination creates a full replacement of the forward navigation and
     * finish functionality.
     *
     * @memberof WizardPageComponentComponent
     *
     */
    @Output('wizardPagePrimary') primaryButtonClicked: EventEmitter<string> = new EventEmitter();

    @Output('wzardPageFinish') finishButtonClicked: EventEmitter<WizardPageComponent> = new EventEmitter();

    @Output('wizardPageDanger') dangerButtonClicked: EventEmitter<WizardPageComponent> = new EventEmitter();

    @Output('wizardPageNext') nextButtonClicked: EventEmitter<WizardPageComponent> = new EventEmitter();

    @Output('wizardPagePrevious') previousButtonClicked: EventEmitter<WizardPageComponent> = new EventEmitter();

    /**
     *
     * @memberof WizardPageComponent
     *
     */
    private _stopNext = false;

    /**
     * A getter that tells you whether the page is preventing the next action.
     *
     * @memberof WizardPageComponent
     *
     */
    public get stopNext(): boolean {
        return this._stopNext;
    }

    /**
     *
     * @memberof WizardPageComponent
     *
     */
    private _stopCancel = false;

    /**
     * A getter that retrieves whether the page is preventing the cancel action.
     *
     * @memberof WizardPageComponent
     *
     */
    public get stopCancel(): boolean {
        return this._stopCancel;
    }

    /**
     * Creates an instance of WizardComponent.
     *
     * @memberof WizardComponent
     */

    /**
   * Overrides all actions from the page level, so you can use an alternate function for
   * validation or data-munging with a WizardPage.onCommit (WizardPageOnCommit output),
   * WizardPage.onCancel (WizardPageOnCancel output), or one
   * of the granular page-level button click event emitters.
   *
   * @memberof WizardPageComponent
   *
   */
    @Input('wizardPagePreventDefault') public preventDefault: boolean = false;

     /**
     * An event emitter carried over from a legacy version of WizardPage.
     * Fires an event on WizardPage whenever the next or finish buttons
     * are clicked and the page is the current page of the Wizard.
     *
     * Note that this does not automatically emit an event when a custom
     * button is used in place of a next or finish button.
     *
     * @memberof WizardPageComponent
     *
     */
    @Output('WizardPageOnCommit') onCommit: EventEmitter<string> = new EventEmitter<string>(false);


    /**
     * Emits an event when the WizardPage invokes the cancel routine for the wizard.
     *
     * Can be used in conjunction with the WizardPage.stopCancel
     * (WizardPagePreventDefaultCancel) or WizardPage.preventDefault
     * (WizardPagePagePreventDefault) inputs to implement custom cancel
     * functionality at the page level. This is useful if you would like to do
     * validation, save data, or warn users before cancelling the wizard.
     *
     * Note that this requires you to call Wizard.close() from the host component.
     * This constitues a full replacement of the cancel functionality.
     *
     * @memberof WizardPageComponent
     *
     */
    @Output('WizardPageOnCancel') pageOnCancel: EventEmitter<WizardPageComponent> = new EventEmitter();

    constructor(
        public pageService: WizardPageCollectionService,
        public navService: WizardNavigationService,
        public buttonService: WizardPageButtonsService
    ) {}

    /**
     * Contains a reference to the desired title for the page's step in the
     * navigation on the left side of the wizard. Can be projected to change the
     * navigation link's text.
     *
     * If not defined, then WizardPage.pageTitle will be displayed in the stepnav.
     *
     * @memberof WizardPageComponent
     *
     */
    @ContentChild(WizardPageNavTitleDirective) public pageNavTitle: WizardPageNavTitleDirective;

    /**
     *
     * @memberof WizardPageComponent
     *
     */
    public get navTitle(): TemplateRef<any> {
        if (this.pageNavTitle) {
            return this.pageNavTitle.pageNavTitleTemplateRef;
        }
    }

    /**
     * Contains a reference to the buttons defined within the page. If not defined,
     * the wizard defaults to the set of buttons defined as a direct child of the
     * wizard.
     *
     * @memberof WizardPageComponent
     *
     */
    @ContentChild(WizardPageButtonsDirective) public _buttons: WizardPageButtonsDirective;

    /**
     *
     * @memberof WizardPageComponent
     *
     */
    public get buttons(): TemplateRef<any> {
        if (!this._buttons) {
        return;
        }
        return this._buttons.pageButtonsTemplateRef;
    }

    /**
     * A read-only getter that returns a boolean that says whether or
     * not the WizardPage includes buttons. Used to determine if the
     * Wizard should override the default button set defined as
     * its direct children.
     *
     * @memberof WizardPageComponent
     *
     */
    public get hasButtons(): boolean {
        return !!this._buttons;
    }

    /**
     *
     * @memberof WizardPageComponent
     *
     */
    private _previousStepDisabled = false;


    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the previous page.
     *
     * Useful for in-page validation because it prevents backward navigation
     * and visibly disables the previous button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using WizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * @memberof WizardPageComponent
     *
     */
    public get previousStepDisabled(): boolean {
        return this._previousStepDisabled;
    }

    /**
     * Sets whether the page should allow backward navigation.
     *
     * @memberof WizardPageComponent
     *
     */
    @Input('WizardPagePreviousDisabled')
    public set previousStepDisabled(val: boolean) {
        const valBool = !!val;
        if (valBool !== this._previousStepDisabled) {
            this._previousStepDisabled = valBool;
            this.previousStepDisabledChange.emit(valBool);
        }
    }

    /**
     * Emits when the value of WizardPage.previousStepDisabled changes.
     * Should emit the new value of previousStepDisabled.
     *
     * @memberof WizardPageComponent
     *
     */
    @Output('WizardPagePreviousDisabledChange')
    public previousStepDisabledChange: EventEmitter<boolean> = new EventEmitter();


    /**
     * Checks with the navigation service to see if it is the current page.
     *
     * @memberof WizardPageComponent
     *
     */
    public get current(): boolean {
        return this.navService.currentPage === this;
    }

    public get disabled(): boolean {
        return !this.enabled;
    }

    /**
     *
     * @memberof WizardPageComponent
     *
     */
    private _complete: boolean = false;

    /**
     * A page is marked as completed if it is both readyToComplete and completed,
     * as in the next or finish action has been executed while this page was current.
     *
     * Note there is and open question about how to handle pages that are marked
     * complete but who are no longer readyToComplete. This might indicate an error
     * state for the WizardPage. Currently, the wizard does not acknowledge this state
     * and only returns that the page is incomplete.
     *
     * @memberof WizardPageComponent
     *
     */
    public get completed(): boolean {
        return this._complete && this.readyToComplete;

        // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
        // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
        // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
        // FIRST QUESTION: AM I GREY OR COLORED?
        // SECOND QUESTION: AM I GREEN OR RED?
    }

    /**
     * A WizardPage can be manually set to completed using this boolean setter.
     * It is recommended that users rely on the convenience functions in the wizard
     * and navigation service instead of manually setting pages’ completion state.
     *
     * @memberof WizardPageComponent
     */
    public set completed(value: boolean) {
        this._complete = value;
    }

    /**
     *
     * @memberof WizardPageComponent
     *
     */
    private _nextStepDisabled = false;

    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the next page.
     *
     * Useful for in-page validation because it prevents forward navigation
     * and visibly disables the next button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using WizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * @memberof WizardPageComponent
     *
     */
    public get nextStepDisabled(): boolean {
        return this._nextStepDisabled;
    }

    /**
     * Sets whether the page should allow forward navigation.
     *
     * @memberof WizardPageComponent
     *
     */
    @Input('WizardPageNextDisabled')
    public set nextStepDisabled(val: boolean) {
        const valBool = !!val;
        if (valBool !== this._nextStepDisabled) {
            this._nextStepDisabled = valBool;
            // this.nextStepDisabledChange.emit(valBool);
        }
    }

    /**
     * A read-only getter that serves as a convenience for those who would rather
     * not think in the terms of !WizardPage.nextStepDisabled. For some use cases,
     * WizardPage.readyToComplete is more logical and declarative.
     *
     * @memberof WizardPageComponent
     *
     */
    public get readyToComplete(): boolean {
        return !this.nextStepDisabled;
    }

    /**
     * A read-only getter that returns whether or not the page is navigable
     * in the wizard. A wizard page can be navigated to if it is completed
     * or the page before it is completed.
     *
     * This getter handles the logic for enabling or disabling the links in
     * the step nav on the left Side of the wizard.
     *
     * @memberof WizardPageComponent
     *
     */
    public get enabled(): boolean {
        return this.current || this.completed || this.previousCompleted;
    }

    /**
     * A read-only getter that returns whether or not the page before this
     * WizardPage is completed. This is useful for determining whether or not
     * a page is navigable if it is not current or already completed.
     *
     * @memberof WizardPageComponent
     *
     */
    public get previousCompleted(): boolean {
        const previousPage = this.pageService.getPreviousPage(this);

        if (!previousPage) {
            return true;
        }

        return previousPage.completed;
    }


    /**
     * Emits an event when wizardPageOnLoad becomes the current page of the
     * Wizard.
     *
     * @memberof WizardPageComponent
     *
     */
    @Output('wizardPageOnLoad') onLoad: EventEmitter<string> = new EventEmitter();

     /**
     * An input value that is used internally to generate the WizardPage ID as
     * well as the step nav item ID.
     *
     * Typed as any because it should be able to accept numbers as well as
     * strings. Passing an index for wizard whose pages are created with an
     * ngFor loop is a common use case.
     *
     * @memberof WizardPageComponent
     *
     */
    @Input('id') _id: any = (wizardPageIndex++).toString();

    /**
     * A read-only getter that generates an ID string for the wizard page from
     * either the value passed to the WizardPage "id" input or a wizard page
     * counter shared across all wizard pages in the application.
     *
     * Note that the value passed into the ID input Will be prefixed with
     * "app-wizard-page-".
     *
     * @readonly
     *
     * @memberof WizardPageComponentComponent
     */
    public get id() {
        // covers things like null, undefined, false, and empty string
        // while allowing zero to pass
        const idIsNonZeroFalsy = !this._id && this._id !== 0;

        // in addition to non-zero falsy we also want to make sure _id is not a negative
        // number.
        if (idIsNonZeroFalsy || this._id < 0) {
            // guard here in the event that input becomes undefined or null by accident
            this._id = (wizardPageIndex++).toString();
        }
        return `app-wizard-page-${this._id}`;
    }

    /**
     * A read-only getter that returns the id used by the step nav item associated with the page.
     *
     * WizardPage needs this ID string for aria information.
     *
     * @memberof WizardPageComponent
     *
     */
    public get stepItemId(): string {
        return this.pageService.getStepItemIdForPage(this);
    }


    /**
     * Uses the nav service to make the WizardPage the current page in the
     * wizard. Bypasses all checks but still emits the WizardPage.onLoad
     * (WizardPageOnLoad) output.
     *
     * In most cases, it is better to use the default navigation functions
     * in Wizard.
     *
     * @memberof WizardPageComponent
     *
     */
    public makeCurrent(): void {
        this.navService.currentPage = this;
    }

    ngOnInit() {
        const navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
            this.buttonService.buttonsReady = true;
        }
    }
}
