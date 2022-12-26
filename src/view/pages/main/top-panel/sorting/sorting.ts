import appConstants from '../../../../../common/constants';
import { NewElement } from './../../../../../utils/element-generator';

export class Sort {
    sort: HTMLSelectElement;

    constructor() {
        this.sort = NewElement.createSelect('sort-method');
    }

    createSortBlock(sort: string): HTMLSelectElement {
        const defaultOption = NewElement.createOPtion('sort-option', 'Sort', 'Sort');
        defaultOption.disabled = true;
        defaultOption.selected = true;
        this.sort.append(defaultOption);

        appConstants.sortParams.forEach((el) => {
            const sortOption = NewElement.createOPtion('sort-option', `${el.value}`, `${el.text}`);
            if (sort === el.value) {
                sortOption.selected = true;
            }
            this.sort.append(sortOption);
        });

        return this.sort;
    }
}
