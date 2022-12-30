import { IController, params } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import ProductView from 'view/pages/product/ProductView';
import ProductService from 'services/ProductService';

export default class ProductController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: ProductView;
    productService: ProductService;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new ProductView();
        this.productService = new ProductService();
    }

    async render(params: params) {
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        app.append(this.header.createHeader(), this.main, this.footer.createFooter());
        const response = await this.productService.getProduct(params.id);
        if ('errorMessage' in response) {
            this.main.append(this.view.renderError(response));
        } else {
            this.main.append(this.view.renderProduct(response));
        }
    }
}
