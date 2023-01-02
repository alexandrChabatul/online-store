import { ICatalogSettings } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';

export class CategoryBlock {
    categories: HTMLElement;

    constructor() {
        this.categories = ElementsFactory.createBaseElement('ul', 'filters-list');
    }

    public createCategoryBlock(catalogSettings: ICatalogSettings): HTMLDivElement {
        this.categories.innerHTML = '';
        const categoryBlock = ElementsFactory.createDivElement('category-block');
        const categoryTitle = ElementsFactory.createBaseElementWithText('h3', 'category-title', 'Category');

        catalogSettings.filters.category.forEach((el, i) => {
            const categoryItem = ElementsFactory.createBaseElement('li', 'filters-element');
            const categoryName = ElementsFactory.createCheckbox('checkbox', `${el.filter}`, 'category', `${el.filter}`);
            const categoryLabel = ElementsFactory.createLabel('filter-label', `${el.filter}`, `${el.filter} `);
            categoryName.checked = catalogSettings.filters.category[i].checked;
            const categoryCount = ElementsFactory.createBaseElementWithText(
                'span',
                'filter-count',
                `(${catalogSettings.filters.category[i].active}/${catalogSettings.filters.category[i].total})`
            );
            categoryLabel.append(categoryCount);
            categoryItem.append(categoryName, categoryLabel);
            this.categories.append(categoryItem);
        });

        categoryBlock.append(categoryTitle, this.categories);

        return categoryBlock;
    }
}
