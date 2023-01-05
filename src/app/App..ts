import CartService from 'services/CartService';
import BasePage from 'view/common-components/BasePage';
import Router from '../services/Router';

class App {
    router: Router;
    basePage: BasePage;
    cartService: CartService;
    container: HTMLElement;

    constructor() {
        this.router = new Router();
        this.basePage = BasePage.getInstance();
        this.cartService = new CartService();
        this.container = <HTMLDivElement>document.getElementById('app');
    }

    start() {
        this.initBasePage();
        this.router.initRouter();
    }

    initBasePage() {
        const codes = this.cartService.getPromoCodes();
        const summary = this.cartService.getCartSummary(codes);
        this.container.append(this.basePage.getHeader(), this.basePage.getMain(), this.basePage.getFooter());
        this.basePage.updateHeader(String(summary.productQty), String(summary.prevPrice));
    }
}

export default App;
