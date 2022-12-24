import { IMainParameters, Product } from '../../../common/types';
import { NewElement } from '../../../utils/element-generator';
import { Footer } from './../../common-components/footer/footer';
import { Header } from './../../common-components/header/header';
import { Catalog } from './catalog/catalog';
import { TopPanel } from './top-panel/top-panel';
import './main.scss';

class Main {
    header: Header;
    topPanel: TopPanel;
    catalog: Catalog;
    footer: Footer;

    constructor() {
        this.header = new Header('10', '1000');
        this.topPanel = new TopPanel();
        this.catalog = new Catalog();
        this.footer = new Footer();
    }

    render(params: Product[], filters: IMainParameters) {
        console.log('render main');
        console.log(params);
        const app = <HTMLDivElement>document.getElementById('root');
        // app.textContent = `This id main page!${params}`;
        app.append(this.header.createHeader());
        const main = NewElement.createDivElement('main');
        const mainWrapper = NewElement.createDivElement('wrapper main-wrapper');
        const rightPart = NewElement.createDivElement('main-right');
        app.append(main);
        main.append(mainWrapper);
        const topPanel = this.topPanel.createTopPanel(params, filters);
        const catalog = this.catalog.createCatalog(params, filters);

        mainWrapper.append(rightPart);
        rightPart.append(topPanel, catalog);
        app.append(this.footer.createFooter());
    }
}

export default Main;
