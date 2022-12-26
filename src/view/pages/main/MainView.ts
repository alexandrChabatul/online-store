import { IMainParameters, Product } from '../../../common/types';
import { NewElement } from '../../../utils/element-generator';
import { Catalog } from './catalog/catalog';
import { TopPanel } from './top-panel/top-panel';
import './main.scss';
import { Filters } from './filters/filters';
import { Header } from '../../common-components/header/header';

class MainView {
    header: Header;
    filters: Filters;
    topPanel: TopPanel;
    catalog: Catalog;

    constructor() {
        this.header = new Header('4', '5432');
        this.filters = new Filters();
        this.topPanel = new TopPanel();
        this.catalog = new Catalog();
    }

    render(products: Product[], filters: IMainParameters) {
        const app = <HTMLDivElement>document.getElementById('root');
        const header = this.header.createHeader();
        const main = NewElement.createDivElement('main');
        const mainWrapper = NewElement.createDivElement('wrapper main-wrapper');
        const leftPart = NewElement.createDivElement('main-left');
        const rightPart = NewElement.createDivElement('main-right');
        const filtering = this.filters.createFilters(filters);
        const topPanel = this.topPanel.createTopPanel(products, filters);
        const catalog = this.catalog.createCatalog(products, filters);

        app.append(header, main);
        main.append(mainWrapper);
        mainWrapper.append(leftPart, rightPart);
        leftPart.append(filtering);
        rightPart.append(topPanel, catalog);
    }
}

export default MainView;
