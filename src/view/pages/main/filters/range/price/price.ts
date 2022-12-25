import { IMainParameters } from '../../../../../../common/types';
import { NewElement } from '../../../../../../utils/element-generator';
import { Range } from '../range';
import './../range.scss';

export class PriceBlock extends Range {
    priceMinRange: HTMLInputElement;
    priceMaxRange: HTMLInputElement;
    priceMinValue: HTMLElement;
    priceMaxValue: HTMLElement;

    constructor() {
        super();
        this.priceMinRange = NewElement.createInputRange('input-price-min', 'from-slider');
        this.priceMaxRange = NewElement.createInputRange('input-price-max', 'to-slider');
        this.priceMinValue = NewElement.createBaseElement('span', 'price-min');
        this.priceMaxValue = NewElement.createBaseElement('span', 'price-max');
    }

    public createPriceBlock(filtering: IMainParameters): HTMLDivElement {
        const priceBlock = NewElement.createDivElement('price-block');
        const priceTitle = NewElement.createBaseElementWithText('h3', 'price-title', 'Price');
        this.priceMinRange.min = String(filtering.filters.price.min);
        this.priceMinRange.max = String(filtering.filters.price.max);
        this.priceMinRange.value = this.priceMinRange.min;
        this.priceMaxRange.min = String(filtering.filters.price.min);
        this.priceMaxRange.max = String(filtering.filters.price.max);
        this.priceMaxRange.value = this.priceMinRange.max;

        const inputBlock = NewElement.createDivElement('input-block');
        const valueBlock = NewElement.createDivElement('value-block');
        this.priceMinValue.textContent = String(filtering.filters.price.min);
        this.priceMaxValue.textContent = String(filtering.filters.price.max);

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
