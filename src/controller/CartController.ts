import { IController, params } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import CartView from 'view/pages/cart/CartView';
import CartService from 'services/CartService';
import { CatalogService } from 'services/CatalogService';
import CartHandler from './handlers/CartHandlers';

export default class CartController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: CartView;
    cartService: CartService;
    catalogService: CatalogService;
    cartHandler: CartHandler;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new CartView(this.main);
        this.cartService = new CartService();
        this.catalogService = new CatalogService();
        this.cartHandler = new CartHandler(this.view, this.cartService);
    }

    async render(params: params) {
        await this.catalogService.model.setProducts();
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        app.append(this.header.createHeader(), this.main, this.footer.createFooter());
        this.view.renderCart(this.cartService.getCartInfo(params));
        this.initPopupEvents();
    }

    initPopupEvents() {
        this.cartHandler.initEvents();
    }
}
