import { IMainParameters } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Range } from '../range';
import '../range.scss';

export class PriceBlock extends Range {
    priceMinRange: HTMLInputElement;
    priceMaxRange: HTMLInputElement;
    priceMinValue: HTMLElement;
    priceMaxValue: HTMLElement;

    constructor() {
        super();
        this.priceMinRange = ElementsFactory.createInputRange('input-price-min', 'from-slider');
        this.priceMaxRange = ElementsFactory.createInputRange('input-price-max', 'to-slider');
        this.priceMinValue = ElementsFactory.createBaseElement('span', 'price-min');
        this.priceMaxValue = ElementsFactory.createBaseElement('span', 'price-max');
    }

    public createPriceBlock(catalogSettings: IMainParameters): HTMLDivElement {
        const priceBlock = ElementsFactory.createDivElement('price-block');
        const priceTitle = ElementsFactory.createBaseElementWithText('h3', 'price-title', 'Price');
        this.priceMinRange.min = String(catalogSettings.filters.currentPrice.min);
        this.priceMinRange.max = String(catalogSettings.filters.currentPrice.max);
        this.priceMinRange.step = '0,01';
        this.priceMinRange.value = String(catalogSettings.filters.currentPrice.minValue);
        this.priceMaxRange.min = String(catalogSettings.filters.currentPrice.min);
        this.priceMaxRange.max = String(catalogSettings.filters.currentPrice.max);
        this.priceMaxRange.step = '0,01';
        this.priceMaxRange.value = String(catalogSettings.filters.currentPrice.maxValue);

        const inputBlock = ElementsFactory.createDivElement('input-block');
        const valueBlock = ElementsFactory.createDivElement('value-block');
        this.priceMinValue.textContent = this.priceMinRange.value;
        this.priceMaxValue.textContent = this.priceMaxRange.value;

        inputBlock.append(this.priceMinRange, this.priceMaxRange);
        valueBlock.append(this.priceMinValue, this.priceMaxValue);
        priceBlock.append(priceTitle, inputBlock, valueBlock);

        super.fillSlider(this.priceMinRange, this.priceMaxRange, '#d8d7db', 'red', this.priceMaxRange);
        this.priceMinRange.addEventListener('input', () => {
            super.controlFromSlider(this.priceMinRange, this.priceMaxRange, this.priceMinValue);
        });
        this.priceMaxRange.addEventListener('input', () => {
            super.controlToSlider(this.priceMinRange, this.priceMaxRange, this.priceMaxValue);
        });

        return priceBlock;
    }
}
