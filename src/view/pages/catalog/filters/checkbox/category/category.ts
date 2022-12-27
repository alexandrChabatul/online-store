import { IMainParameters } from '../../../../../../common/types';
import { ElementsFactory } from '../../../../../../utils/element-generator';

export class CategoryBlock {
    categories: HTMLElement;

    constructor() {
        this.categories = ElementsFactory.createBaseElement('ul', 'filters-list');
    }

    public createCategoryBlock(filtering: IMainParameters): HTMLDivElement {
        const categoryBlock = ElementsFactory.createDivElement('category-block');
        const categoryTitle = ElementsFactory.createBaseElementWithText('h3', 'category-title', 'Category');

        for (const el in filtering.filters.category) {
            const categoryItem = ElementsFactory.createBaseElement('li', 'filters-element');
            const categoryName = ElementsFactory.createCheckbox('checkbox', `${el}`, 'category', `${el}`);
            const categoryLabel = ElementsFactory.createLabel('filter-label', `${el}`, `${el} `);
            categoryName.checked = filtering.filters.category[el].checked;
            const categoryCount = ElementsFactory.createBaseElementWithText(
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
