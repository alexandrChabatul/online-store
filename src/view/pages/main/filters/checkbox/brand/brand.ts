import { IMainParameters } from '../../../../../../common/types';
import { NewElement } from '../../../../../../utils/element-generator';
import './../checkbox.scss';

export class BrandBlock {
    brands: HTMLElement;

    constructor() {
        this.brands = NewElement.createBaseElement('ul', 'filters-list');
    }

    public createBrandBlock(filtering: IMainParameters): HTMLDivElement {
        const brandBlock = NewElement.createDivElement('brand-block');
        const brandTitle = NewElement.createBaseElementWithText('h3', 'brand-title', 'Brand');

        for (const el in filtering.filters.brand) {
            const brandItem = NewElement.createBaseElement('li', 'filters-element');
            const brandName = NewElement.createCheckbox('checkbox', `${el}`, 'brand', `${el}`);
            const brandLabel = NewElement.createLabel('filter-label', `${el}`, `${el} `);
            const categoryCount = NewElement.createBaseElementWithText(
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
