export class ViewService {
    private viewType: string;

    constructor() {
        this.viewType = 'table';
    }

    public setViewType(view: string) {
        if (view) {
            this.viewType = view;
        } else {
            this.viewType = 'table';
        }
    }

    public getViewType() {
        return this.viewType;
    }
}
