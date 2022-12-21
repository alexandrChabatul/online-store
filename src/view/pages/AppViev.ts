import { ProductAnswer } from '../../common/types';
import ErrorPage from './404/404';
import Cart from './cart/Cart';
import Main from './main/Main';
import Product from './product/Product';

class AppView {
    main: Main;
    cart: Cart;
    product: Product;
    error: ErrorPage;

    constructor() {
        this.main = new Main();
        this.cart = new Cart();
        this.product = new Product();
        this.error = new ErrorPage();
    }

    renderMain() {
        this.main.render();
    }
    renderCart() {
        this.cart.render();
    }
    renderProduct(data: ProductAnswer) {
        this.product.render(data);
    }
    renderError() {
        this.error.render();
    }
}

export default AppView;
