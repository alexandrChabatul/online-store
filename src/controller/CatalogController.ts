import { IController, params } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import CatalogView from 'view/pages/catalog/CatalogView';
import { CatalogService } from 'services/CatalogService';
import CatalogHandler from './handlers/CatalogHandlers';
import CartService from 'services/CartService';

export default class CatalogController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: CatalogView;
    catalogService: CatalogService;
    catalogHandlers: CatalogHandler;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new CatalogView();
        this.catalogService = new CatalogService();
        this.catalogHandlers = new CatalogHandler(this.view, this.catalogService);
    }

    async render(params: params): Promise<void> {
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        const header = this.header.createHeader();
        const footer = this.footer.createFooter();
        app.append(header, this.main, footer);

        await this.catalogService.model.setProducts();
        const products = this.catalogService.getFilteredProducts(params);
        const catalogSettings = this.catalogService.getCatalogSettings(params);

        const catalog = this.view.render(products, catalogSettings);
        this.main.append(catalog);
        this.initCatalogEvents();
    }

    initCatalogEvents() {
        this.catalogHandlers.initEvents();
    }
}
