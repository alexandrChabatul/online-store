export class ViewService {
    private viewType: string;

    constructor() {
        this.viewType = 'table';
    }

    public setViewType(view: string): void {
        if (view && view.toLowerCase() === 'row') {
            this.viewType = 'row';
        } else {
            this.viewType = 'table';
        }
    }

    public getViewType(): string {
        return this.viewType;
    }
}
