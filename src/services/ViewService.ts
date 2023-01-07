export class ViewService {
    private viewType: string;

    constructor() {
        this.viewType = 'table';
    }

    public setViewType(view: string) {
        if (view && view.toLowerCase() === 'row') {
            this.viewType = 'row';
        } else {
            this.viewType = 'table';
        }
    }

    public getViewType() {
        return this.viewType;
    }
}
