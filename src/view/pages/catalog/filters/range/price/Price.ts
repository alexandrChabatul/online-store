import { ICatalogSettings } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';
import { Range } from '../Range';
import '../range.scss';

export class PriceBlock extends Range {
    priceBlock: HTMLDivElement;
    MinRange: HTMLInputElement;
    MaxRange: HTMLInputElement;
    MinValue: HTMLElement;
    MaxValue: HTMLElement;

    constructor() {
        super();
        this.priceBlock = ElementsFactory.createDivElement('price-block');
        this.MinRange = ElementsFactory.createInputRange('input-price-min', 'from-slider');
        this.MaxRange = ElementsFactory.createInputRange('input-price-max', 'to-slider');
        this.MinValue = ElementsFactory.createBaseElement('span', 'price-min');
        this.MaxValue = ElementsFactory.createBaseElement('span', 'price-max');
    }

    public createPriceBlock(catalogSettings: ICatalogSettings): HTMLDivElement {
        this.priceBlock.innerHTML = '';
        const priceTitle = ElementsFactory.createBaseElementWithText('h3', 'price-title', 'Price');
        this.MinRange.min = String(catalogSettings.filters.currentPrice.min);
        this.MinRange.max = String(catalogSettings.filters.currentPrice.max);
        this.MinRange.step = '0,01';
        this.MinRange.value = String(catalogSettings.filters.currentPrice.minValue);
        this.MaxRange.min = String(catalogSettings.filters.currentPrice.min);
        this.MaxRange.max = String(catalogSettings.filters.currentPrice.max);
        this.MaxRange.step = '0,01';
        this.MaxRange.value = String(catalogSettings.filters.currentPrice.maxValue);

        const inputBlock = ElementsFactory.createDivElement('input-block');
        inputBlock.id = 'price';
        const valueBlock = ElementsFactory.createDivElement('value-block');
        this.MinValue.textContent = this.MinRange.value;
        this.MaxValue.textContent = this.MaxRange.value;

        inputBlock.append(this.MinRange, this.MaxRange);
        valueBlock.append(this.MinValue, this.MaxValue);
        this.priceBlock.append(priceTitle, inputBlock, valueBlock);

        super.fillSlider(this.MinRange, this.MaxRange, '#d8d7db', 'red', this.MaxRange);

        this.MinRange.addEventListener('input', () => {
            super.controlFromSlider(this.MinRange, this.MaxRange, this.MinValue);
        });
        this.MaxRange.addEventListener('input', () => {
            super.controlToSlider(this.MinRange, this.MaxRange, this.MaxValue);
        });

        return this.priceBlock;
    }

    setNotFoundValue(): void {
        this.MinValue.textContent = 'Not Found';
        this.MaxValue.textContent = '';
    }
}
