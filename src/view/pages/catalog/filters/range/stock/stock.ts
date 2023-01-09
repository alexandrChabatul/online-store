import { ICatalogSettings } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Range } from '../Range';
import '../range.scss';

export class StockBlock extends Range {
    stockBlock: HTMLDivElement;
    MinRange: HTMLInputElement;
    MaxRange: HTMLInputElement;
    MinValue: HTMLElement;
    MaxValue: HTMLElement;

    constructor() {
        super();
        this.stockBlock = ElementsFactory.createDivElement('stock-block');
        this.MinRange = ElementsFactory.createInputRange('input-Stock-min', 'from-slider');
        this.MaxRange = ElementsFactory.createInputRange('input-Stock-max', 'to-slider');
        this.MinValue = ElementsFactory.createBaseElement('span', 'stock-min');
        this.MaxValue = ElementsFactory.createBaseElement('span', 'stock-max');
    }

    public createStockBlock(catalogSettings: ICatalogSettings): HTMLDivElement {
        this.stockBlock.innerHTML = '';
        const stockTitle = ElementsFactory.createBaseElementWithText('h3', 'stock-title', 'Stock');
        this.MinRange.min = String(catalogSettings.filters.stock.min);
        this.MinRange.max = String(catalogSettings.filters.stock.max);
        this.MinRange.value = String(catalogSettings.filters.stock.minValue);
        this.MaxRange.min = String(catalogSettings.filters.stock.min);
        this.MaxRange.max = String(catalogSettings.filters.stock.max);
        this.MaxRange.value = String(catalogSettings.filters.stock.maxValue);

        const inputBlock = ElementsFactory.createDivElement('input-block');
        const valueBlock = ElementsFactory.createDivElement('value-block');
        this.MinValue.textContent = String(catalogSettings.filters.stock.minValue);
        this.MaxValue.textContent = String(catalogSettings.filters.stock.maxValue);

        inputBlock.append(this.MinRange, this.MaxRange);
        inputBlock.id = 'stock';
        valueBlock.append(this.MinValue, this.MaxValue);
        this.stockBlock.append(stockTitle, inputBlock, valueBlock);

        super.fillSlider(this.MinRange, this.MaxRange, '#d8d7db', 'red', this.MaxRange);

        this.MinRange.addEventListener('input', () => {
            super.controlFromSlider(this.MinRange, this.MaxRange, this.MinValue);
        });
        this.MaxRange.addEventListener('input', () => {
            super.controlToSlider(this.MinRange, this.MaxRange, this.MaxValue);
        });

        return this.stockBlock;
    }

    setNotFoundValue() {
        this.MinValue.textContent = 'Not Found';
        this.MaxValue.textContent = '';
    }
}
