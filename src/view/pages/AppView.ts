import { IMainParameters, Product } from '../../common/types';
import ErrorPage from './404/404';
import Cart from './cart/Cart';
import Main from './main/Main';
import ProductView from './product/ProductView';

class AppView {
    main: Main;
    cart: Cart;
    product: ProductView;
    error: ErrorPage;

    constructor() {
        this.main = new Main();
        this.cart = new Cart();
        this.product = new ProductView();
        this.error = new ErrorPage();
    }

    renderMain(data: Product[], filters: IMainParameters) {
        this.main.render(data, filters);
    }
    renderCart() {
        this.cart.render();
    }
    renderProduct(data: Product) {
        this.product.render(data);
    }
    renderError() {
        this.error.render();
    }
}

export default AppView;
