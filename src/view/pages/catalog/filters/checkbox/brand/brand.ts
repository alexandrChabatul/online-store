import { ICatalogSettings } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import '../checkbox.scss';

export class BrandBlock {
    brands: HTMLElement;

    constructor() {
        this.brands = ElementsFactory.createBaseElement('ul', 'filters-list');
    }

    public createBrandBlock(catalogSettings: ICatalogSettings): HTMLDivElement {
        const brandBlock = ElementsFactory.createDivElement('brand-block');
        const brandTitle = ElementsFactory.createBaseElementWithText('h3', 'brand-title', 'Brand');

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
            this.brands.append(brandItem);
        });

        brandBlock.append(brandTitle, this.brands);

        return brandBlock;
    }
}
