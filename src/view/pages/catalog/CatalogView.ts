import { IMainParameters, Product } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Catalog } from './products/products';
import { TopPanel } from './top-panel/top-panel';
import './catalog-view.scss';
import { Filters } from './filters/filters';

class CatalogView {
    filters: Filters;
    topPanel: TopPanel;
    products: Catalog;

    constructor() {
        this.filters = new Filters();
        this.topPanel = new TopPanel();
        this.products = new Catalog();
    }

    render(products: Product[], catalogSettings: IMainParameters) {
        const mainWrapper = ElementsFactory.createDivElement('wrapper main-wrapper');
        const leftPart = ElementsFactory.createDivElement('main-left');
        const rightPart = ElementsFactory.createDivElement('main-right');
        const filtering = this.filters.createFilters(catalogSettings);
        const topPanel = this.topPanel.createTopPanel(products, catalogSettings);
        const productsCatalog = this.products.createProductsCatalog(products, catalogSettings);

        mainWrapper.append(leftPart, rightPart);
        leftPart.append(filtering);
        rightPart.append(topPanel, productsCatalog);
        return mainWrapper;
    }
}

export default CatalogView;
