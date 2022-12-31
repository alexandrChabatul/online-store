export class ViewService {
    private viewType: string;

    constructor() {
        this.viewType = 'table';
    }

    public setViewType(value: string) {
        this.viewType = value;
    }

    public getViewType(view: string) {
        if (view) {
            this.viewType = view;
        } else {
            this.viewType = 'table';
        }
        return this.viewType;
    }
}
