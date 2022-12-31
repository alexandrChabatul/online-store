import './filters.scss';
import { ElementsFactory } from 'utils/element-generator';
import { ResetBlock } from './reset/reset';
import { IMainParameters } from 'common/types';
import { CategoryBlock } from './checkbox/category/category';
import { BrandBlock } from './checkbox/brand/brand';
import { PriceBlock } from './range/price/price';
import { StockBlock } from './range/stock/stock';

export class Filters {
    resetBlock: ResetBlock;
    categoryBlock: CategoryBlock;
    brandBlock: BrandBlock;
    priceBlock: PriceBlock;
    stockBlock: StockBlock;

    constructor() {
        this.resetBlock = new ResetBlock();
        this.categoryBlock = new CategoryBlock();
        this.brandBlock = new BrandBlock();
        this.priceBlock = new PriceBlock();
        this.stockBlock = new StockBlock();
    }

    public createFilters(catalogSettings: IMainParameters): HTMLDivElement {
        const filters = ElementsFactory.createDivElement('filters');
        const resetBlock = this.resetBlock.createResetBlock();
        const categoryBlock = this.categoryBlock.createCategoryBlock(catalogSettings);
        const brandBlock = this.brandBlock.createBrandBlock(catalogSettings);
        const priceBlock = this.priceBlock.createPriceBlock(catalogSettings);
        const stockBlock = this.stockBlock.createStockBlock(catalogSettings);

        filters.append(resetBlock, categoryBlock, brandBlock, priceBlock, stockBlock);
        return filters;
    }
}
