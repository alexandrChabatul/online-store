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

    constructor() {
        this.filters = new Filters();
        this.catalogHeader = new CatalogHeader();
        this.products = new Catalog();
    }

    render(products: ProductIsInCart[], catalogSettings: ICatalogSettings) {
        const mainWrapper = ElementsFactory.createDivElement('wrapper main-wrapper');
        const leftPart = ElementsFactory.createDivElement('main-left');
        const rightPart = ElementsFactory.createDivElement('main-right');
        const filtering = this.filters.createFilters(catalogSettings);
        const catalogHeader = this.catalogHeader.createCatalogHeader(products, catalogSettings);
        const productsCatalog = this.products.createProductsCatalog(products, catalogSettings);

        mainWrapper.append(leftPart, rightPart);
        leftPart.append(filtering);
        rightPart.append(catalogHeader, productsCatalog);
        return mainWrapper;
    }
}

export default CatalogView;
