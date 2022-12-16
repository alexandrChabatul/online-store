import RouterService from '../services/RouterService';
import ErrorPage from '../view/pages/404';
import Cart from '../view/pages/Cart';
import Main from '../view/pages/Main';
import Product from '../view/pages/Product';

class AppController {
    router: RouterService;
    main: Main;
    cart: Cart;
    product: Product;
    error: ErrorPage;

    constructor(router: RouterService) {
        this.router = router;
        router.addRoute('Main', '/');
        router.addRoute('Cart', '/cart');
        router.addRoute('Product', '/product/:id');
        this.main = new Main(this.router);
        this.cart = new Cart(this.router);
        this.product = new Product(this.router);
        this.error = new ErrorPage(this.router);
    }

    renderMain() {
        console.log(this);
        this.main.render();
    }

    renderCart() {
        this.cart.render();
    }

    renderProduct(params: { [key: string]: string }) {
        this.product.render(params);
    }

    renderError() {
        this.error.render();
    }
}

export default AppController;
