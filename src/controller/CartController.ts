import { IController, params } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import CartView from 'view/pages/cart/CartView';
import CartService from 'services/CartService';
import CartModel from 'model/CartModel';
import PromoCodesModel from 'model/PromoCodesModel';

export default class CartController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: CartView;
    cartService: CartService;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new CartView();
        this.cartService = new CartService();
    }

    render(params: params): void {
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        app.append(this.header.createHeader(), this.main, this.footer.createFooter());
        const model = CartModel.getInstance();
        model.increaseItem(2);
        model.increaseItem(1);
        model.increaseItem(4);
        model.increaseItem(3);
        model.increaseItem(1);
        model.increaseItem(7);
        model.increaseItem(2);
        model.increaseItem(26);
        model.increaseItem(62);
        model.increaseItem(1684);
        const promo = PromoCodesModel.getInstance();
        promo.setPromoCode({ name: 'RS', value: 10 });
        const cart = this.view.getCart(this.cartService.getCartInfo(params));
        this.main.append(cart);
    }
}
