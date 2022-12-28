import { IMainParameters } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';

export class CategoryBlock {
    categories: HTMLElement;

    constructor() {
        this.categories = ElementsFactory.createBaseElement('ul', 'filters-list');
    }

    public createCategoryBlock(filtering: IMainParameters): HTMLDivElement {
        const categoryBlock = ElementsFactory.createDivElement('category-block');
        const categoryTitle = ElementsFactory.createBaseElementWithText('h3', 'category-title', 'Category');

        filtering.filters.category.forEach((el, i) => {
            const categoryItem = ElementsFactory.createBaseElement('li', 'filters-element');
            const categoryName = ElementsFactory.createCheckbox('checkbox', `${el.filter}`, 'category', `${el.filter}`);
            const categoryLabel = ElementsFactory.createLabel('filter-label', `${el.filter}`, `${el.filter} `);
            categoryName.checked = filtering.filters.category[i].checked;
            const categoryCount = ElementsFactory.createBaseElementWithText(
                'span',
                'filter-count',
                `(${filtering.filters.category[i].active}/${filtering.filters.category[i].total})`
            );
            categoryLabel.append(categoryCount);
            categoryItem.append(categoryName, categoryLabel);
            this.categories.append(categoryItem);
        });

        categoryBlock.append(categoryTitle, this.categories);

        return categoryBlock;
    }
}
