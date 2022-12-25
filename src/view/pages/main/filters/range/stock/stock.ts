import { IMainParameters } from '../../../../../../common/types';
import { NewElement } from '../../../../../../utils/element-generator';
import { Range } from '../range';
import './../range.scss';

export class StockBlock extends Range {
    StockMinRange: HTMLInputElement;
    StockMaxRange: HTMLInputElement;
    StockMinValue: HTMLElement;
    StockMaxValue: HTMLElement;

    constructor() {
        super();
        this.StockMinRange = NewElement.createInputRange('input-Stock-min', 'from-slider');
        this.StockMaxRange = NewElement.createInputRange('input-Stock-max', 'to-slider');
        this.StockMinValue = NewElement.createBaseElement('span', 'stock-min');
        this.StockMaxValue = NewElement.createBaseElement('span', 'stock-max');
    }

    public createStockBlock(filtering: IMainParameters): HTMLDivElement {
        const StockBlock = NewElement.createDivElement('stock-block');
        const StockTitle = NewElement.createBaseElementWithText('h3', 'stock-title', 'Stock');
        this.StockMinRange.min = String(filtering.filters.stock.min);
        this.StockMinRange.max = String(filtering.filters.stock.max);
        this.StockMinRange.value = this.StockMinRange.min;
        this.StockMaxRange.min = String(filtering.filters.stock.min);
        this.StockMaxRange.max = String(filtering.filters.stock.max);
        this.StockMaxRange.value = this.StockMinRange.max;

        const inputBlock = NewElement.createDivElement('input-block');
        const valueBlock = NewElement.createDivElement('value-block');
        this.StockMinValue.textContent = String(filtering.filters.stock.min);
        this.StockMaxValue.textContent = String(filtering.filters.stock.max);

        inputBlock.append(this.StockMinRange, this.StockMaxRange);
        valueBlock.append(this.StockMinValue, this.StockMaxValue);
        StockBlock.append(StockTitle, inputBlock, valueBlock);

        super.fillSlider(this.StockMinRange, this.StockMaxRange, '#d8d7db', 'red', this.StockMaxRange);
        this.StockMinRange.addEventListener('input', () => {
            super.controlFromSlider(this.StockMinRange, this.StockMaxRange, this.StockMinValue);
        });
        this.StockMaxRange.addEventListener('input', () => {
            super.controlToSlider(this.StockMinRange, this.StockMaxRange, this.StockMaxValue);
        });

        return StockBlock;
    }
}
