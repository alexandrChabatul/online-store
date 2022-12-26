import { IMainParameters, CartProduct, CartParams, CartSummary, Product, PromoCode } from '../../common/types';
import ErrorPage from './404/404View';
import Cart from './cart/CartView';
import MainView from './main/MainView';
import ProductView from './product/ProductView';

class AppView {
    main: MainView;
    cart: Cart;
    product: ProductView;
    error: ErrorPage;

    constructor() {
        this.main = new MainView();
        this.cart = new Cart();
        this.product = new ProductView();
        this.error = new ErrorPage();
    }

    renderMain(data: Product[], filters: IMainParameters) {
        this.main.render(data, filters);
    }
    renderCart(cart: CartProduct[], params: CartParams, summary: CartSummary, codes: PromoCode[]) {
        this.cart.renderCart([], params, summary, codes);
    }
    renderProduct(data: Product) {
        this.product.render(data);
    }
    renderError() {
        this.error.render();
    }
}

export default AppView;
