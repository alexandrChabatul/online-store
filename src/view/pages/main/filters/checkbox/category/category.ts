import { IMainParameters } from '../../../../../../common/types';
import { NewElement } from '../../../../../../utils/element-generator';

export class CategoryBlock {
    categories: HTMLElement;

    constructor() {
        this.categories = NewElement.createBaseElement('ul', 'filters-list');
    }

    public createCategoryBlock(filtering: IMainParameters): HTMLDivElement {
        const categoryBlock = NewElement.createDivElement('category-block');
        const categoryTitle = NewElement.createBaseElementWithText('h3', 'category-title', 'Category');

        for (const el in filtering.filters.category) {
            const categoryItem = NewElement.createBaseElement('li', 'filters-element');
            const categoryName = NewElement.createCheckbox('checkbox', `${el}`, 'category', `${el}`);
            const categoryLabel = NewElement.createLabel('filter-label', `${el}`, `${el} `);
            categoryName.checked = filtering.filters.category[el].checked;
            const categoryCount = NewElement.createBaseElementWithText(
                'span',
                'filter-count',
                `(${filtering.filters.category[el].active}/${filtering.filters.category[el].total})`
            );
            categoryLabel.append(categoryCount);
            categoryItem.append(categoryName, categoryLabel);
            this.categories.append(categoryItem);
        }

        categoryBlock.append(categoryTitle, this.categories);

        return categoryBlock;
    }
}
