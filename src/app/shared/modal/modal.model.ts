export class Modal {
    id: string;
    role: string;
    title: string;
    btClose: boolean;
    size: string;
    content: string;
    actions: ModalActions;

    constructor(data?: any) {
        this.id = (data && data.id) ? data.id : 'modal';
        this.role = (data && data.role) ? data.role : 'dialog';
        this.size = (data && data.size) ? data.size : 'small';
        this.content = (data && data.content) ? data.content : 'Conteúdo...';
        this.title = (data && data.title) ? data.title : 'Título Modal';
        this.btClose = (data && data.btClose === false) ? false : true;
        this.actions = (data && data.actions) ? new ModalActions(data.actions) : new ModalActions();
    }
}

export class ModalActions {
    cancelLabelKey: string;
    confirmLabelKey: string;
    confirmColor: string;
    isHidden: boolean;
    type: string;
    position: string;
    customClass: string;

    constructor(data?: any) {
        this.cancelLabelKey = (data && data.cancelLabelKey) ? data.cancelLabelKey : null;
        this.confirmLabelKey = (data && data.confirmLabelKey) ? data.confirmLabelKey : null;
        this.confirmColor = (data && data.confirmColor) ? data.confirmColor : null;
        this.isHidden = (data && data.isHidden) ? true : false;
        this.type = (data && data.type) ? data.type : 'body';
        this.position = (data && data.position) ? data.position : 'right';
        this.customClass = (data && data.customClass) ? data.customClass : '';
    }
}
