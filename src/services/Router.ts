import { paramsWithCallback, renderCallback, Route } from '../common/types';
import AppController from '../constroller/AppController';
import RouterParser from './RouteParser';

class Router {
    // private routes: { [key: string]: Route };
    private routes: {
        route: Route;
        cb: renderCallback;
    }[];
    private controller: AppController;
    private parser: RouterParser = new RouterParser();

    constructor() {
        this.routes = [];
        this.controller = new AppController(this);
    }

    addRoute(path: Route, cb: renderCallback) {
        this.routes.push({
            route: path,
            cb: cb,
        });
    }

    getParamsWithCallback(path: string): paramsWithCallback | null {
        const target = this.routes.find((el) => this.parser.match(path, el.route));
        if (target) {
            const params = this.parser.match(path, target.route) || {};
            return {
                params: params,
                callback: target.cb,
            };
        }
        return null;
    }

    render(path: string) {
        const route = this.getParamsWithCallback(path);
        route ? route.callback.call(this.controller, route.params) : this.controller.renderError();
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
