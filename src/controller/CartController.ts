import { IController, params } from 'common/types';
import CartView from 'view/pages/cart/CartView';
import CartService from 'services/CartService';
import { CatalogService } from 'services/CatalogService';
import CartHandler from './handlers/CartHandlers';
import PopupHandler from './handlers/PopupHandler';
import BasePage from 'view/common-components/BasePage';

export default class CartController implements IController {
    basePage: BasePage;
    view: CartView;
    cartService: CartService;
    catalogService: CatalogService;
    cartHandler: CartHandler;
    popupHandler: PopupHandler;

    constructor() {
        this.basePage = BasePage.getInstance();
        this.view = new CartView();
        this.cartService = new CartService();
        this.catalogService = new CatalogService();
        this.cartHandler = new CartHandler(this.view, this.cartService);
        this.popupHandler = new PopupHandler(this.view, this.cartService);
    }

    async render(params: params): Promise<void> {
        await this.catalogService.model.setProducts();
        this.basePage.updateMain(this.view.renderCart(this.cartService.getCartInfo(params)));
        this.initCartEvents();
        if (this.cartService.getPopupState()) this.openPopup();
    }

    initCartEvents(): void {
        this.cartHandler.initEvents();
    }

    private openPopup(): void {
        this.view.showPopup();
        this.popupHandler.initEvents();
        this.cartService.setPopupState(false);
    }
}
