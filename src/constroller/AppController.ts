import Router from '../services/Router';
import ErrorPage from '../view/pages/404';
import Cart from '../view/pages/Cart';
import Main from '../view/pages/Main';
import Product from '../view/pages/Product';
import appConstants from '../common/constants';
import { customParams } from '../common/types';

class AppController {
    router: Router;
    main: Main;
    cart: Cart;
    product: Product;
    error: ErrorPage;

    constructor(router: Router) {
        this.router = router;
        router.addRoute('', appConstants.routes.main, (params: customParams) => {
            this.renderMain(params.params);
        });
        router.addRoute('cart', appConstants.routes.cart, (params: customParams) => {
            this.renderCart();
        });
        router.addRoute('product', appConstants.routes.product, (params: customParams) => {
            this.renderProduct(params.productId);
        });

        this.main = new Main(this.router);
        this.cart = new Cart(this.router);
        this.product = new Product(this.router);
        this.error = new ErrorPage(this.router);
    }

    renderMain(params?: { [key: string]: string }) {
        console.log('render main', params);
        if (params?.valid === 'false') {
            this.renderError();
        } else {
            // get data(data)
            // new FilterService
            //filter(data)
            //view(filteredData)

            console.log(this);
            this.main.render(params);
        }
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
