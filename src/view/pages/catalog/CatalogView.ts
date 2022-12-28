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

    render(products: Product[], filters: IMainParameters) {
        console.log('render form catalog');
        const mainWrapper = ElementsFactory.createDivElement('wrapper main-wrapper');
        const leftPart = ElementsFactory.createDivElement('main-left');
        const rightPart = ElementsFactory.createDivElement('main-right');
        const filtering = this.filters.createFilters(filters);
        const topPanel = this.topPanel.createTopPanel(products, filters);
        const productsCatalog = this.products.createProductsCatalog(products, filters);

        mainWrapper.append(leftPart, rightPart);
        leftPart.append(filtering);
        rightPart.append(topPanel, productsCatalog);
        return mainWrapper;
    }
}

export default CatalogView;
