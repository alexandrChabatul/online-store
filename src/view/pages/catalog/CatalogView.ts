import { ICatalogSettings, ProductIsInCart } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Catalog } from './products/products';
import { CatalogHeader } from './top-panel/catalog-header';
import './catalog-view.scss';
import { Filters } from './filters/filters';

class CatalogView {
    filters: Filters;
    catalogHeader: CatalogHeader;
    products: Catalog;
    filtersArea: HTMLDivElement;
    productsCatalogDivElement: HTMLDivElement;

    constructor() {
        this.filters = new Filters();
        this.catalogHeader = new CatalogHeader();
        this.products = new Catalog();
        this.filtersArea = ElementsFactory.createDivElement('main-left');
        this.productsCatalogDivElement = ElementsFactory.createDivElement('');
    }

    public render(products: ProductIsInCart[], catalogSettings: ICatalogSettings) {
        this.filtersArea.innerHTML = '';
        const mainWrapper = ElementsFactory.createDivElement('wrapper main-wrapper');
        const rightPart = ElementsFactory.createDivElement('main-right');
        const filtering = this.filters.createFilters(catalogSettings);
        const catalogHeader = this.catalogHeader.createCatalogHeader(products, catalogSettings);
        const productsCatalog = this.products.createProductsCatalog(products, catalogSettings);

        mainWrapper.append(this.filtersArea, rightPart);
        this.filtersArea.append(filtering);
        rightPart.append(catalogHeader, productsCatalog);
        return mainWrapper;
    }

    public renderFilters(catalogSettings: ICatalogSettings) {
        const filtering = this.filters.createFilters(catalogSettings);
        this.filtersArea.innerHTML = '';
        this.filtersArea.append(filtering);
    }

    public renderTargetedFilters(catalogSettings: ICatalogSettings, target: string) {
        const newCategloryBlock = this.filters.categoryBlock.createCategoryBlock(catalogSettings);
        this.filters.categoryBlock.categories.replaceWith(newCategloryBlock);
        const newBrandBlock = this.filters.brandBlock.createBrandBlock(catalogSettings);
        this.filters.brandBlock.brands.replaceWith(newBrandBlock);
        if (target !== 'stock') {
            this.filters.stockBlock.createStockBlock(catalogSettings);
        }
        if (target !== 'price') {
            this.filters.priceBlock.createPriceBlock(catalogSettings);
        }
    }

    public renderCatalogHeader(products: ProductIsInCart[], catalogSettings: ICatalogSettings) {
        this.catalogHeader.createCatalogHeader(products, catalogSettings);
    }

    public renderProducts(products: ProductIsInCart[], catalogSettings: ICatalogSettings) {
        this.products.createProductsCatalog(products, catalogSettings);
    }
}

export default CatalogView;
