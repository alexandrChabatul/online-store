import { CartParams, CartProduct, CartSummary, IController, params, PromoCode } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import CartView from 'view/pages/cart/CartView';
import data from 'assets/tempData/data.json';

export default class CartController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: CartView;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new CartView();
    }

    render(params: params): void {
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        app.append(this.header.createHeader(), this.main, this.footer.createFooter());
        const products = data.products.slice(1, 10);
        const productsWithPrice: CartProduct[] = products.map((el) => {
            const currentPrice = Math.ceil(el.price * (100 - el.discountPercentage)) / 100;
            const subtotal = currentPrice * 5;
            return Object.assign(el, { currentPrice: currentPrice, quantity: 5, subtotal: subtotal });
        });
        const parameters: CartParams = {
            itemsPerPage: 3,
            page: 1,
            numOfPages: 4,
        };
        const summary: CartSummary = { productQty: 10, totalPrice: 100000, prevPrice: 110000 };
        const codes: PromoCode[] = [{ name: 'RS', value: 10 }];
        const cart = this.view.getCart(productsWithPrice, parameters, summary, codes);
        this.main.append(cart);
    }
}
