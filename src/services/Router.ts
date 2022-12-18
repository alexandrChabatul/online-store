import { Route, IPage, customParams } from '../common/types';
import AppController from '../constroller/AppController';
import RouterParser from './RouteParser';

class Router {
    private routes: {
        [key: string]: IPage;
    };
    private controller: AppController;
    private parser: RouterParser = new RouterParser();

    constructor() {
        this.routes = {};
        this.controller = new AppController(this);
    }

    addRoute(name: string, path: Route, cb: (data: customParams) => void) {
        this.routes[name] = {
            address: {
                path: '',
                params: {},
            },
            cb: (data: customParams): void => {
                return;
            },
        };
        this.routes[name].address = path;
        this.routes[name].cb = cb;
        // console.log(this.routes);
    }

    render(path: string) {
        const params = this.parser.getCustomParams(path);
        const trimmedPath = path.split('/')[1].split('?')[0];
        this.routes[trimmedPath] ? this.routes[trimmedPath].cb.apply(this, [params]) : this.controller.renderError();
        // if (this.routes[trimmedPath]) {
        //     this.routes[trimmedPath].cb.apply(this);
        // } else {
        //     console.log('some');
        //     this.controller.renderError(trimmedPath);
        // }
        // if (this.parser.match(path, this.routes.Main.address, true)) {
        //     const params = this.parser.match(path, this.routes.Main.address) || {};
        //     this.controller.renderMain(params);
        // } else if (this.parser.match(path, this.routes.Cart.address)) {
        //     this.controller.renderCart();
        // } else if (this.parser.match(path, this.routes.Product.address)) {
        //     const params = this.parser.match(path, this.routes.Product.address);
        //     if (params) {
        //         this.controller.renderProduct(params);
        //     }
        // } else {
        //     this.controller.renderError();
        // }
    }

    goTo(path: string) {
        window.history.pushState({ path }, path, path);
        this.render(path);
    }

    initRouter() {
        window.addEventListener('popstate', () => {
            const url = new URL(window.location.href);
            this.render(url.pathname + url.search);
        });
        document.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            if (target && target.hasAttribute('href') && target.classList.contains('router-link')) {
                const linkTarget = <HTMLLinkElement>target;
                e.preventDefault();
                const { pathname: path, search: params } = new URL(linkTarget.href);
                const gotoPath = path + params;
                this.goTo(gotoPath);
            }
        });
        const url = new URL(window.location.href);
        this.render(url.pathname + url.search);
    }
}

export default Router;
