import Router from '../services/Router';
import appConstants from 'common/constants';
import {
    CartParams,
    CartProduct,
    CartSummary,
    IMainParameters,
    params,
    Product,
    ProductResponse,
    PromoCode,
} from 'common/types';
import AppView from '../view/pages/AppView';
import data from 'assets/tempData/data.json';
import { SearchService } from './../services/Search';

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
                category: {
                    smartphones: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    laptops: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    fragrances: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    skincare: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                },
                brand: {
                    Apple: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    Samsung: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    OPPO: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    Huawei: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    Infinix: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    Motorola: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    Xiaomi: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    Bork: {
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                },
                stock: {
                    min: 10,
                    max: 3000,
                },
                price: {
                    min: 10,
                    max: 3000,
                },
            },
            sort: 'sort',
            view: 'row',
            search: 'dummy',
        };
        const products: ProductResponse[] = data.products;
        // const products: ProductResponse[] = [];
        const productsWithPrice: Product[] = products.map((el) => {
            const currentPrice = Math.ceil(el.price * (100 - el.discountPercentage)) / 100;
            return Object.assign(el, { currentPrice: currentPrice });
        });
        const filtered: Product[] = SearchService.getSearchResults(productsWithPrice, mainFilters.search);
        console.log(filtered);
        this.view.renderMain(productsWithPrice, mainFilters);
        this.view.catalog.topPanel.viewBlockElement.viewBlock.addEventListener('click', (e) => {
            const target: EventTarget | null = e.target;
            if (target instanceof HTMLDivElement) {
                if (target.className.includes('row')) {
                    mainFilters.view = 'row';
                } else if (target.className.includes('table')) {
                    mainFilters.view = 'table';
                }
                this.view.catalog.products.setView(mainFilters.view);
                this.view.catalog.topPanel.viewBlockElement.setView(mainFilters.view);
            }
        });
        this.view.catalog.filters.resetBlock.copyButton.addEventListener(
            'click',
            this.view.catalog.filters.resetBlock.applyCopiedState.bind(this.view.catalog.filters.resetBlock)
        );
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
