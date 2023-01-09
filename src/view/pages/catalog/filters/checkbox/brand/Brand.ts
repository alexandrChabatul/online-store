import { ICatalogSettings } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';
import '../checkbox.scss';

export class BrandBlock {
    brands: HTMLDivElement;

    constructor() {
        this.brands = ElementsFactory.createDivElement('brand-block');
    }

    public createBrandBlock(catalogSettings: ICatalogSettings): HTMLDivElement {
        this.brands.innerHTML = '';
        const brandTitle = ElementsFactory.createBaseElementWithText('h3', 'brand-title', 'Brand');
        const brandList = ElementsFactory.createBaseElement('ul', 'filters-list');
        brandList.id = 'brand';

        catalogSettings.filters.brand.forEach((el, i) => {
            const brandItem = ElementsFactory.createBaseElement('li', 'filters-element');
            const brandName = ElementsFactory.createCheckbox('checkbox', `${el.filter}`, 'brand', `${el.filter}`);
            const brandLabel = ElementsFactory.createLabel('filter-label', `${el.filter}`, `${el.filter} `);
            const categoryCount = ElementsFactory.createBaseElementWithText(
                'span',
                'filter-count',
                `(${catalogSettings.filters.brand[i].active}/${catalogSettings.filters.brand[i].total})`
            );
            brandName.checked = catalogSettings.filters.brand[i].checked;
            brandLabel.append(categoryCount);
            brandItem.append(brandName, brandLabel);
            brandList.append(brandItem);
        });

        this.brands.append(brandTitle, brandList);

        return this.brands;
    }
}
