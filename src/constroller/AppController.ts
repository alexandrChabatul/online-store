import Router from '../services/Router';
import ErrorPage from '../view/pages/404';
import Cart from '../view/pages/Cart';
import Main from '../view/pages/Main';
import Product from '../view/pages/Product';
import appConstants from '../common/constants';
import { params } from '../common/types';

class AppController {
    router: Router;
    main: Main;
    cart: Cart;
    product: Product;
    error: ErrorPage;

    constructor(router: Router) {
        this.router = router;
        this.initRouterPath();
        this.main = new Main(this.router);
        this.cart = new Cart(this.router);
        this.product = new Product(this.router);
        this.error = new ErrorPage(this.router);
    }

    renderMain(params?: params) {
        // get data(data)
        // new FilterService
        //filter(data)
        //view(filteredData)
        this.main.render(params);
    }

    renderCart() {
        this.cart.render();
    }

    renderProduct(params?: params) {
        this.product.render(params);
    }

    renderError() {
        this.error.render();
    }

    private initRouterPath() {
        this.router.addRoute(appConstants.routes.main, (params?: params) => {
            this.renderMain(params);
        });
        this.router.addRoute(appConstants.routes.cart, () => {
            this.renderCart();
        });
        this.router.addRoute(appConstants.routes.product, (params?: params) => {
            this.renderProduct(params);
        });
    }
}

export default AppController;
