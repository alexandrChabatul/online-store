import { IController, params } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import ProductView from 'view/pages/product/ProductView';
import ProductService from 'services/ProductService';
import ProductHandler from './handlers/ProductHandler';
import { CatalogService } from 'services/CatalogService';

export default class ProductController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: ProductView;
    productService: ProductService;
    productHandler: ProductHandler;
    catalogService: CatalogService;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new ProductView();
        this.catalogService = new CatalogService();
        this.productService = new ProductService();
        this.productHandler = new ProductHandler();
    }

    async render(params: params) {
        await this.catalogService.model.setProducts();
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        app.append(this.header.createHeader(), this.main, this.footer.createFooter());
        const response = await this.productService.getProduct(params.id);
        if ('errorMessage' in response) {
            this.main.append(this.view.renderError(response));
        } else {
            const page = this.view.renderProduct(response);
            this.main.append(page);
            this.productHandler.initProductHandlers(page);
        }
    }
}
