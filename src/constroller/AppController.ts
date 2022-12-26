import Router from '../services/Router';
import appConstants from '../common/constants';
import { CartProduct, CartParams, CartSummary, params, Product, ProductResponse, PromoCode } from '../common/types';
import AppView from '../view/pages/AppViev';
import data from '../assets/tempData/data.json';

class AppController {
    router: Router;
    view: AppView;

    constructor(router: Router) {
        this.router = router;
        this.initRouterPath();
        this.view = new AppView();
    }

    renderMain(params?: params) {
        this.view.renderMain();
    }

    renderCart(params: params) {
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
        this.view.renderCart(productsWithPrice, parameters, summary, codes);
    }

    async renderProduct(params?: params) {
        const product: ProductResponse = data.products[33];
        const currentPrice = Math.ceil(product.price * (100 - product.discountPercentage)) / 100;
        const productWithPrice: Product = Object.assign(product, { currentPrice: currentPrice });
        this.view.renderProduct(productWithPrice);
    }

    renderError() {
        this.view.renderError();
    }

    private initRouterPath() {
        this.router.addRoute(appConstants.routes.main, (params: params) => {
            this.renderMain(params);
        });
        this.router.addRoute(appConstants.routes.cart, (params: params) => {
            this.renderCart(params);
        });
        this.router.addRoute(appConstants.routes.product, (params: params) => {
            this.renderProduct(params);
        });
    }
}

export default AppController;
