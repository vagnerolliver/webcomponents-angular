import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WizardPageButtonsService {

    public buttonsReady: boolean = false;

    private _previousBtnClicked = new Subject<any>();
    public get previousBtnClicked(): Observable<any> {
        return this._previousBtnClicked.asObservable();
    }

    private _nextBtnClicked = new Subject<any>();
    public get nextBtnClicked(): Observable<any> {
        return this._nextBtnClicked.asObservable();
    }

    private _dangerBtnClicked = new Subject<any>();
    public get dangerBtnClicked(): Observable<any> {
        return this._dangerBtnClicked.asObservable();
    }

    private _cancelBtnClicked = new Subject<any>();
    public get cancelBtnClicked(): Observable<any> {
        return this._cancelBtnClicked.asObservable();
    }

    private _finishBtnClicked = new Subject<any>();
    public get finishBtnClicked(): Observable<any> {
        return this._finishBtnClicked.asObservable();
    }

    private _customBtnClicked = new Subject<any>();
    public get customBtnClicked(): Observable<any> {
        return this._customBtnClicked.asObservable();
    }

    public buttonClicked(buttonType: string): void {
        if ('previous' === buttonType) {
            this._previousBtnClicked.next();
        } else if ('next' === buttonType) {
            this._nextBtnClicked.next();
        } else if ('finish' === buttonType) {
            this._finishBtnClicked.next();
        } else if ('danger' === buttonType) {
            this._dangerBtnClicked.next();
        } else if ('cancel' === buttonType) {
            this._cancelBtnClicked.next();
        } else {
            this._customBtnClicked.next(buttonType);
        }
    }
}
