import Router from '../services/Router';
import appConstants from '../common/constants';
import { IMainParameters, params, Product, ProductResponse } from '../common/types';
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
        const mainFilters: IMainParameters = {
            filters: {
                category: [],
                brand: [],
                stock: [],
                price: [],
            },
            sort: '',
            view: '',
            search: '',
        };
        const mainFilters2: IMainParameters = {
            filters: {
                category: [],
                brand: [],
                stock: [],
                price: [],
            },
            sort: '',
            view: 'row',
            search: '',
        };
        const products: ProductResponse[] = data.products;
        const productsWithPrice: Product[] = products.map((el) => {
            const currentPrice = Math.ceil(el.price * (100 - el.discountPercentage)) / 100;
            return Object.assign(el, { currentPrice: currentPrice });
        });
        this.view.renderMain(productsWithPrice, mainFilters);
    }

    renderCart(params: params) {
        this.view.renderCart();
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
