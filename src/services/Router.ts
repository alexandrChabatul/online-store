import { Route } from '../common/types';
import AppController from '../constroller/AppController';
import RouterParser from './RouteParser';

class Router {
    private routes: { [key: string]: Route };
    private controller: AppController;
    private parser: RouterParser = new RouterParser();

    constructor() {
        this.routes = {};
        this.controller = new AppController(this);
    }

    addRoute(name: string, path: Route) {
        this.routes[name] = path;
    }

    render(path: string) {
        if (this.parser.match(path, this.routes.Main, true)) {
            const params = this.parser.match(path, this.routes.Main) || {};
            this.controller.renderMain(params);
        } else if (this.parser.match(path, this.routes.Cart)) {
            this.controller.renderCart();
        } else if (this.parser.match(path, this.routes.Product)) {
            const params = this.parser.match(path, this.routes.Product);
            if (params) {
                this.controller.renderProduct(params);
            }
        } else {
            this.controller.renderError();
        }
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
