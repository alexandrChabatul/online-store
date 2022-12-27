import { IMainParameters } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import '../checkbox.scss';

export class BrandBlock {
    brands: HTMLElement;

    constructor() {
        this.brands = ElementsFactory.createBaseElement('ul', 'filters-list');
    }

    public createBrandBlock(filtering: IMainParameters): HTMLDivElement {
        const brandBlock = ElementsFactory.createDivElement('brand-block');
        const brandTitle = ElementsFactory.createBaseElementWithText('h3', 'brand-title', 'Brand');

        for (const el in filtering.filters.brand) {
            const brandItem = ElementsFactory.createBaseElement('li', 'filters-element');
            const brandName = ElementsFactory.createCheckbox('checkbox', `${el}`, 'brand', `${el}`);
            const brandLabel = ElementsFactory.createLabel('filter-label', `${el}`, `${el} `);
            const categoryCount = ElementsFactory.createBaseElementWithText(
                'span',
                'filter-count',
                `(${filtering.filters.brand[el].active}/${filtering.filters.brand[el].total})`
            );
            brandName.checked = filtering.filters.brand[el].checked;
            brandLabel.append(categoryCount);
            brandItem.append(brandName, brandLabel);
            this.brands.append(brandItem);
        }

        brandBlock.append(brandTitle, this.brands);

        return brandBlock;
    }
}
