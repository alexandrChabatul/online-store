import './filters.scss';
import { NewElement } from './../../../../utils/element-generator';
import { ResetBlock } from './reset/reset';
import { IMainParameters } from '../../../../common/types';
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

    public createFilters(existingFilters: IMainParameters): HTMLDivElement {
        const filters = NewElement.createDivElement('filters');
        const resetBlock = this.resetBlock.createResetBlock();
        const categoryBlock = this.categoryBlock.createCategoryBlock(existingFilters);
        const brandBlock = this.brandBlock.createBrandBlock(existingFilters);
        const priceBlock = this.priceBlock.createPriceBlock(existingFilters);
        const stockBlock = this.stockBlock.createStockBlock(existingFilters);

        filters.append(resetBlock, categoryBlock, brandBlock, priceBlock, stockBlock);
        return filters;
    }
}
