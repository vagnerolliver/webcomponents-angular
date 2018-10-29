import {
    Component,
    OnInit,
    OnDestroy,
    AfterContentInit,
    DoCheck,
    ElementRef,
    IterableDiffers,
    ContentChildren,
    QueryList,
    Output,
    EventEmitter,
    Input} from '@angular/core';
import { WizardPageCollectionService } from './wizard-page/wizard-page-collection.service';
import { WizardNavigationService } from './wizard-stepnav/wizard-navigation.service';
import { WizardPageComponent } from './wizard-page/wizard-page.component';
import { WizardPageButtonsService } from './wizard-page-buttons/wizard-page-buttons.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-wizard',
    providers: [
        WizardNavigationService,
        WizardPageCollectionService,
        WizardPageButtonsService
    ],
    templateUrl: './wizard.component.html',
    host: {
        '[class.app-wizard]': 'true',
        '[class.lastPage]': 'navService.currentPageIsLast',
    },
})
export class WizardComponent implements OnInit, OnDestroy, AfterContentInit, DoCheck {

    private goNextSubscription: Subscription;
    private goPreviousSubscription: Subscription;
    private cancelSubscription: Subscription;
    private currentPageSubscription: Subscription;
    private wizardFinishedSubscription: Subscription;

    @ContentChildren(WizardPageComponent) public pages: QueryList<WizardPageComponent>;

    /**
     * Emits when the current page has changed. Can be observed through the wizardCurrentPageChanged
     * output. This can happen on .next() or .previous().
     * Useful for non-blocking validation.
     *
     * @memberof Wizard
     *
     */
    @Output('wizardCurrentPageChanged') currentPageChanged: EventEmitter<any> = new EventEmitter<any>(false);

    /**
     * Emits when the wizard moves to the next page. Can be observed through the wizardOnNext
     * output.
     *
     * Can be combined with the wizardPreventDefaultNext input to create
     * wizard-level custom navigation routines, which are useful for validation.
     *
     * @memberof Wizard
     *
     */
    @Output('wizardOnNext') onMoveNext: EventEmitter<any> = new EventEmitter<any>(false);

    /**
     * Emits when the wizard moves to the previous page. Can be observed through the
     * wizardOnPrevious output.
     *
     * Can be useful for validation.
     *
     * @memberof Wizard
     *
     */
    @Output('wizardOnPrevious') onMovePrevious: EventEmitter<any> = new EventEmitter<any>(false);

    /**
     * Emits when the wizard is completed. Can be observed through the wizardOnFinish
     * output.
     *
     * Can be combined with the wizardPreventDefaultNext input to create
     * wizard-level custom completion routines.
     *
     * @memberof Wizard
     *
     */
    @Output('wizardOnFinish') wizardFinished: EventEmitter<any> = new EventEmitter<any>(false);

    /**
     * Emits when the wizard is canceled. Can be observed through the clrWizardOnCancel
     * output.
     *
     * Can be combined with the clrWizardPreventDefaultCancel input to create
     * wizard-level custom cancel routines.
     *
     * @memberof Wizard
     *
     */
    @Output('wizardOnCancel') onCancel: EventEmitter<any> = new EventEmitter<any>(false);


    /**
     * Used for marking when the collection of wizard pages has been added to or deleted from
     *
     * @memberof Wizard
     *
     */

    differ: any;

    /**
     * Prevents ClrWizard from moving to the next page or closing itself on finishing.
     * Set using the wizardPreventDefaultNext input.
     *
     * Note that using stopNext will require you to create your own calls to
     * .next() and .finish() in your host component to make the ClrWizard work as
     * expected.
     *
     * Primarily used for validation.
     *
     * @memberof Wizard
     *
     */
    @Input('wizardPreventDefaultNext')
    set stopNext(value: boolean) {
        this._stopNext = !!value;
        this.navService.wizardHasAltNext = value;
    }
    private _stopNext: boolean = false;
    get stopNext(): boolean {
        return this._stopNext;
    }

    /**
     * Prevents Wizard from performing any form of navigation away from the current
     * page. Set using the wizardPreventNavigation input.
     *
     * Note that stopNavigation is meant to freeze the wizard in place, typically
     * during a long validation or background action where you want the wizard to
     * display loading content but not allow the user to execute navigation in
     * the stepnav, close X, or the  back, finish, or next buttons.
     *
     * @memberof Wizard
     *
     */
    @Input('wizardPreventNavigation')
    set stopNavigation(value: boolean) {
        this._stopNavigation = !!value;
        this.navService.wizardStopNavigation = value;
    }
    private _stopNavigation: boolean = false;
    get stopNavigation(): boolean {
        return this._stopNavigation;
    }

    /**
     * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
     * Set using the clrWizardPreventDefaultCancel input.
     *
     * Note that using stopCancel will require you to create your own calls to
     * .close() in your host component to make the ClrWizard work as expected.
     *
     * Useful for doing checks or prompts before closing a ClrWizard.
     *
     * @memberof Wizard
     *
     */
    @Input('clrWizardPreventDefaultCancel')
    set stopCancel(value: boolean) {
        this._stopCancel = !!value;
        this.navService.wizardHasAltCancel = value;
    }
    private _stopCancel: boolean = false;
    get stopCancel(): boolean {
        return this._stopCancel;
    }
    constructor(
        public navService: WizardNavigationService,
        public pageService: WizardPageCollectionService,
        private elementRef: ElementRef,
        differs: IterableDiffers
    ) {
        this.goNextSubscription = this.navService.movedToNextPage.subscribe(() => {
            this.onMoveNext.emit();
        });

        this.goPreviousSubscription = this.navService.movedToPreviousPage.subscribe(() => {
            this.onMovePrevious.emit();
        });

        this.cancelSubscription = this.navService.notifyWizardCancel.subscribe(() => {
            this.checkAndCancel();
        });

        this.wizardFinishedSubscription = this.navService.wizardFinished.subscribe(() => {
            if (!this.stopNext) {
                this.forceFinish();
            }
            this.wizardFinished.emit();
        });

        this.differ = differs.find([]).create(null);
    }

    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs (wizardPageOnCancel and
     * wizardOnCancel) if so.
     *
     * @name checkAndCancel
     * @memberof Wizard
     */
    public checkAndCancel(): void {
        const currentPage = this.currentPage;
        const currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;

        if (this.stopNavigation) {
            return;
        }

        currentPage.pageOnCancel.emit();
            if (!currentPageHasOverrides) {
            this.onCancel.emit();
        }
    }

    /**
     * Does the work of finishing up the wizard and closing it but doesn't do the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling ClrWizard.finish(true) or ClrWizard.finish()
     * without a parameter.
     *
     * @name forceFinish
     * @memberof Wizard
     */
    public forceFinish(): void {
        if (this.stopNavigation) {
            return;
        }
    }

    ngOnInit() {
        this.currentPageSubscription = this.navService.currentPageChanged.subscribe((page: WizardPageComponent) => {
            this.currentPageChanged.emit();
        });
    }

    ngOnDestroy() {
        if (this.goNextSubscription) {
            this.goNextSubscription.unsubscribe();
        }
        if (this.goPreviousSubscription) {
            this.goPreviousSubscription.unsubscribe();
        }
        if (this.cancelSubscription) {
            this.cancelSubscription.unsubscribe();
        }
        if (this.currentPageSubscription) {
            this.currentPageSubscription.unsubscribe();
        }
        if (this.wizardFinishedSubscription) {
            this.wizardFinishedSubscription.unsubscribe();
        }
    }

    public ngAfterContentInit() {
        this.pageService.pages = this.pages;
    }

    public ngDoCheck() {
        const changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem((r: any) => {
                this.navService.updateNavigation();
            });

            changes.forEachRemovedItem((r: any) => {
                this.navService.updateNavigation();
            });
        }
    }

    /**
     * As a getter, current page is a convenient way to retrieve the current page from
     * the WizardNavigationService.
     *
     * As a setter, current page accepts a ClrWizardPage and passes it to WizardNavigationService
     * to be made the current page. currentPage performs checks to make sure it can navigate
     * to the designated page.
     *
     * @name currentPage
     *
     * @memberof Wizard
     *
     */
    public get currentPage(): WizardPageComponent {
        return this.navService.currentPage;
    }
    public set currentPage(page: WizardPageComponent) {
        this.navService.goTo(page, true);
    }
}
