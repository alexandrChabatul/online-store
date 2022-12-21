import Router from '../services/Router';
import appConstants from '../common/constants';
import { params, ProductAnswer } from '../common/types';
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
        this.view.renderCart();
    }

    async renderProduct(params?: params) {
        this.view.renderProduct(data.products[33]);
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
