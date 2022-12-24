import Router from '../services/Router';
import appConstants from '../common/constants';
import { IMainParameters, params, Product, ProductResponse } from '../common/types';
import AppView from '../view/pages/AppView';
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
            sort: 'sort',
            view: 'row',
            search: '',
        };
        const products: ProductResponse[] = data.products;
        const productsWithPrice: Product[] = products.map((el) => {
            const currentPrice = Math.ceil(el.price * (100 - el.discountPercentage)) / 100;
            return Object.assign(el, { currentPrice: currentPrice });
        });
        this.view.renderMain(productsWithPrice, mainFilters);
        this.view.main.topPanel.viewBlockElement.viewBlock.addEventListener('click', (e) => {
            const target: EventTarget | null = e.target;
            if (target instanceof HTMLDivElement) {
                if (target.className.includes('row')) {
                    mainFilters.view = 'row';
                } else if (target.className.includes('table')) {
                    mainFilters.view = 'table';
                }
                this.view.main.catalog.setView(mainFilters.view);
                this.view.main.topPanel.viewBlockElement.setView(mainFilters.view);
            }
        });
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
