import appConstants from 'common/constants';
import { ElementsFactory } from 'utils/ElementGenerator';

export class Sort {
    sort: HTMLSelectElement;

    constructor() {
        this.sort = ElementsFactory.createSelect('sort-method');
    }

    createSortBlock(sort: string): HTMLSelectElement {
        this.sort = ElementsFactory.createSelect('sort-method');
        const defaultOption = ElementsFactory.createOption('sort-option', 'Sort', 'Sort');
        defaultOption.disabled = true;
        defaultOption.selected = true;
        this.sort.append(defaultOption);

        appConstants.sortParams.forEach((el) => {
            const sortOption = ElementsFactory.createOption('sort-option', `${el.value}`, `${el.text}`);
            if (sort === el.value) {
                sortOption.selected = true;
            }
            this.sort.append(sortOption);
        });

        return this.sort;
    }
}
