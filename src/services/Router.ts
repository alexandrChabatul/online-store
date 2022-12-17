import Route from 'route-parser';
import AppController from '../constroller/AppController';

class Router {
    private routes: { [key: string]: Route };
    private controller: AppController;

    constructor() {
        this.routes = {};
        this.controller = new AppController(this);
    }

    addRoute(name: string, path: string) {
        this.routes[name] = new Route(path);
    }

    render(path: string) {
        if (this.routes.Main.match(path)) {
            const params = this.routes.Main.match(path) || {};
            this.controller.renderMain(params);
        } else if (this.routes.Cart.match(path)) {
            this.controller.renderCart();
        } else if (this.routes.Product.match(path)) {
            const params = this.routes.Product.match(path);
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
