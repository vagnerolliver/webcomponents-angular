export class Modal {
    id: string;
    role: string;
    title: string;
    btClose: boolean;
    size: string;
    content: string;
    actions: ModalActions;

    constructor(data: any) {
        this.id = data.id || 'modal';
        this.role = data.role || 'dialog';
        this.size = data.size || 'small';
        this.content = data.content || '';
        this.title = data.title || '';
        this.btClose = true;

        if (data.btClose === false ) {
            this.btClose = false;
        }

        if (data.actions) {
            this.actions = new ModalActions(data.actions);
        } else {
            this.actions = new ModalActions();
        }
    }
}

export class ModalActions {
    cancelLabelKey: string;
    confirmLabelKey: string;
    isWarning: string;
    isHidden: boolean;
    type: string;
    position: string;
    customClass: string;

    constructor(data?: any) {
        this.isWarning =  'is-info';
        this.isHidden = false;
        this.type = 'body';
        this.position = 'right';
        this.customClass = '';

        if (data && data.cancelLabelKey) {
            this.cancelLabelKey = data.cancelLabelKey;
        }

        if (data && data.confirmLabelKey) {
            this.confirmLabelKey = data.confirmLabelKey;
        }

        if (data && data.isWarning) {
            this.isWarning = data.isWarning;
        }

        if (data && data.isHidden) {
            this.isHidden = data.isShow;
        }

        if (data && data.type) {
            this.type = data.type;
        }

        if (data && data.position) {
            this.position = data.position;
        }

        if (data && data.customClass) {
            this.customClass = data.customClass;
        }
    }
}
