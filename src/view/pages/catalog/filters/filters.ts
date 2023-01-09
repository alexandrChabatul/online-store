import './filters.scss';
import { ElementsFactory } from 'utils/ElementGenerator';
import { ResetBlock } from './reset/Reset';
import { ICatalogSettings } from 'common/types';
import { CategoryBlock } from './checkbox/category/Category';
import { BrandBlock } from './checkbox/brand/Brand';
import { PriceBlock } from './range/price/Price';
import { StockBlock } from './range/stock/Stock';

export class Filters {
    resetBlock: ResetBlock;
    categoryBlock: CategoryBlock;
    brandBlock: BrandBlock;
    priceBlock: PriceBlock;
    stockBlock: StockBlock;
    closeButton: HTMLDivElement;
    filters: HTMLDivElement;

    constructor() {
        this.resetBlock = new ResetBlock();
        this.categoryBlock = new CategoryBlock();
        this.brandBlock = new BrandBlock();
        this.priceBlock = new PriceBlock();
        this.stockBlock = new StockBlock();
        this.closeButton = ElementsFactory.createDivElement('close-button');
        this.filters = ElementsFactory.createDivElement('filters');
    }

    public createFilters(catalogSettings: ICatalogSettings): HTMLDivElement {
        this.filters.innerHTML = '';
        const resetBlock = this.resetBlock.createResetBlock();
        const categoryBlock = this.categoryBlock.createCategoryBlock(catalogSettings);
        const brandBlock = this.brandBlock.createBrandBlock(catalogSettings);
        const priceBlock = this.priceBlock.createPriceBlock(catalogSettings);
        const stockBlock = this.stockBlock.createStockBlock(catalogSettings);

        this.filters.append(this.closeButton, resetBlock, categoryBlock, brandBlock, priceBlock, stockBlock);
        return this.filters;
    }
}
