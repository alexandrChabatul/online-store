import { ICatalogSettings } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';

export class CategoryBlock {
    categories: HTMLDivElement;

    constructor() {
        this.categories = ElementsFactory.createDivElement('category-block');
    }

    public createCategoryBlock(catalogSettings: ICatalogSettings): HTMLDivElement {
        this.categories.innerHTML = '';
        const categoryTitle = ElementsFactory.createBaseElementWithText('h3', 'category-title', 'Category');
        const categoryList = ElementsFactory.createBaseElement('ul', 'filters-list');
        categoryList.id = 'category';

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
            categoryList.append(categoryItem);
        });

        this.categories.append(categoryTitle, categoryList);

        return this.categories;
    }
}
