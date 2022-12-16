import Route from 'route-parser';
import App from '../app/App.';
import AppController from '../constroller/AppController';

class RouterService {
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
        console.log(this.routes);
        if (this.routes.Main.match(path)) {
            this.controller.renderMain();
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
        window.addEventListener('popstate', (e) => {
            this.render(new URL(window.location.href).pathname);
        });
        document.querySelectorAll('[href^="/"]').forEach((el) => {
            el.addEventListener('click', (env) => {
                env.preventDefault();
                const eventTarget = <HTMLLinkElement>env.target;
                const { pathname: path } = new URL(eventTarget.href);
                this.goTo(path);
            });
        });
        this.render(new URL(window.location.href).pathname);
    }
}

export default RouterService;
