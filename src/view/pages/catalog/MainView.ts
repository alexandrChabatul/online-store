import { IMainParameters, Product } from '../../../common/types';
import { ElementsFactory } from '../../../utils/element-generator';
import { Catalog } from './products/products';
import { TopPanel } from './top-panel/top-panel';
import './main.scss';
import { Filters } from './filters/filters';
import { Header } from '../../common-components/header/header';

class MainView {
    header: Header;
    filters: Filters;
    topPanel: TopPanel;
    products: Catalog;

    constructor() {
        this.header = new Header('4', '5432');
        this.filters = new Filters();
        this.topPanel = new TopPanel();
        this.products = new Catalog();
    }

    render(products: Product[], filters: IMainParameters) {
        const app = <HTMLDivElement>document.getElementById('root');
        const header = this.header.createHeader();
        const main = ElementsFactory.createDivElement('main');
        const mainWrapper = ElementsFactory.createDivElement('wrapper main-wrapper');
        const leftPart = ElementsFactory.createDivElement('main-left');
        const rightPart = ElementsFactory.createDivElement('main-right');
        const filtering = this.filters.createFilters(filters);
        const topPanel = this.topPanel.createTopPanel(products, filters);
        const productsCatalog = this.products.createProductsCatalog(products, filters);

        app.append(header, main);
        main.append(mainWrapper);
        mainWrapper.append(leftPart, rightPart);
        leftPart.append(filtering);
        rightPart.append(topPanel, productsCatalog);
    }
}

export default MainView;
