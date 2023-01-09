import appConstants from 'common/constants';
import { Route, dispatchObject } from 'common/types';
import Dispatcher from 'controller/Dispatcher';
import RouteParser from './RouteParser';

class Router {
    private routes: Route[];
    private parser: RouteParser;
    private dispatcher: Dispatcher;

    constructor() {
        this.routes = Object.values(appConstants.routes);
        this.parser = new RouteParser();
        this.dispatcher = new Dispatcher();
    }

    getParamsWithName(path: string): dispatchObject {
        const target = this.routes.find((el) => this.parser.match(path, el));
        if (target) {
            const params = this.parser.match(path, target) || {};
            return {
                name: target.name,
                params: params,
            };
        }
        return {
            name: 'error',
            params: {},
        };
    }

    render(path: string): void {
        this.dispatcher.dispatch(this.getParamsWithName(path));
    }

    goTo(path: string): void {
        window.history.pushState({ path }, path, path);
        this.render(path);
    }

    initRouter(): void {
        window.addEventListener('popstate', () => {
            const url = new URL(window.location.href);
            this.render(url.pathname + url.search);
        });
        document.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            const closestLink = <HTMLAnchorElement>target.closest('.router-link');
            if (closestLink && closestLink.hasAttribute('href') && closestLink.classList.contains('router-link')) {
                e.preventDefault();
                const { pathname: path, search: params } = new URL(closestLink.href);
                const gotoPath = path + params;
                this.goTo(gotoPath);
            }
        });
        const url = new URL(window.location.href);
        this.render(url.pathname + url.search);
    }
}

export default Router;
