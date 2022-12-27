import { IMainParameters, CartProduct, CartParams, CartSummary, Product, PromoCode } from 'common/types';
import ErrorPage from './404/404View';
import Cart from './cart/CartView';
import CatalogView from './catalog/CatalogView';
import ProductView from './product/ProductView';

class AppView {
    catalog: CatalogView;
    cart: Cart;
    product: ProductView;
    error: ErrorPage;

    constructor() {
        this.catalog = new CatalogView();
        this.cart = new Cart();
        this.product = new ProductView();
        this.error = new ErrorPage();
    }

    renderMain(data: Product[], filters: IMainParameters) {
        this.catalog.render(data, filters);
    }
    renderCart(cart: CartProduct[], params: CartParams, summary: CartSummary, codes: PromoCode[]) {
        this.cart.renderCart(cart, params, summary, codes);
    }
    renderProduct(data: Product) {
        this.product.render(data);
    }
    renderError() {
        this.error.render();
    }
}

export default AppView;
