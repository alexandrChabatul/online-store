import { ElementsFactory } from '../../../../../utils/element-generator';

export class ViewBlock {
    viewBlock: HTMLDivElement;
    rowView: HTMLDivElement;
    tableView: HTMLDivElement;

    constructor() {
        this.viewBlock = ElementsFactory.createDivElement('view-block');
        this.rowView = ElementsFactory.createDivElement('view-block-icon view-block-row');
        this.tableView = ElementsFactory.createDivElement('view-block-icon view-block-table');
    }

    public createViewBlock(view: string): HTMLDivElement {
        this.viewBlock.append(this.rowView, this.tableView);
        this.setView(view);
        return this.viewBlock;
    }

    public setView(view: string) {
        for (const elem of this.viewBlock.children) {
            elem.classList.remove('view-block-icon-active');
        }
        view === 'row'
            ? this.rowView.classList.add('view-block-icon-active')
            : this.tableView.classList.add('view-block-icon-active');
    }
}
