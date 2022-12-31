import { ICatalogSettings } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Range } from '../range';
import '../range.scss';

export class StockBlock extends Range {
    StockMinRange: HTMLInputElement;
    StockMaxRange: HTMLInputElement;
    StockMinValue: HTMLElement;
    StockMaxValue: HTMLElement;

    constructor() {
        super();
        this.StockMinRange = ElementsFactory.createInputRange('input-Stock-min', 'from-slider');
        this.StockMaxRange = ElementsFactory.createInputRange('input-Stock-max', 'to-slider');
        this.StockMinValue = ElementsFactory.createBaseElement('span', 'stock-min');
        this.StockMaxValue = ElementsFactory.createBaseElement('span', 'stock-max');
    }

    public createStockBlock(catalogSettings: ICatalogSettings): HTMLDivElement {
        const StockBlock = ElementsFactory.createDivElement('stock-block');
        const StockTitle = ElementsFactory.createBaseElementWithText('h3', 'stock-title', 'Stock');
        this.StockMinRange.min = String(catalogSettings.filters.stock.min);
        this.StockMinRange.max = String(catalogSettings.filters.stock.max);
        this.StockMinRange.value = String(catalogSettings.filters.stock.minValue);
        this.StockMaxRange.min = String(catalogSettings.filters.stock.min);
        this.StockMaxRange.max = String(catalogSettings.filters.stock.max);
        this.StockMaxRange.value = String(catalogSettings.filters.stock.maxValue);

        const inputBlock = ElementsFactory.createDivElement('input-block');
        const valueBlock = ElementsFactory.createDivElement('value-block');
        this.StockMinValue.textContent = String(catalogSettings.filters.stock.minValue);
        this.StockMaxValue.textContent = String(catalogSettings.filters.stock.maxValue);

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
