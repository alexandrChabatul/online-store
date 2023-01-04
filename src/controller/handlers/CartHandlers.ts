import CartService from 'services/CartService';
import PromoCodeService from 'services/PromoCodeService';
import UrlService from 'services/UrlService';
import CartView from 'view/pages/cart/CartView';
import PopupHandler from './PopupHandler';

export default class CartHandler {
    view: CartView;
    cartService: CartService;
    urlService: UrlService;
    codesService: PromoCodeService;
    popupHandler: PopupHandler;

    constructor(view: CartView, cartService: CartService) {
        this.view = view;
        this.cartService = cartService;
        this.urlService = new UrlService();
        this.codesService = new PromoCodeService();
        this.popupHandler = new PopupHandler(this.view, this.cartService);
    }

    initEvents() {
        this.view.wrapper.onclick = this.clickHandler.bind(this);
        this.view.wrapper.oninput = this.inputHandler.bind(this);
    }

    clickHandler(e: Event) {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        switch (true) {
            case target.classList.contains('item-increase-button'): {
                const parent = target.closest('.cart-item');
                if (parent && parent.id) this.increaseItemHandler(parent.id);
                break;
            }
            case target.classList.contains('item-reduce-button'): {
                const parent = target.closest('.cart-item');
                if (parent && parent.id) this.reduceItemHandler(parent.id);
                break;
            }
            case target.classList.contains('item-delete-button'): {
                const parent = target.closest('.cart-item');
                if (parent && parent.id) this.deleteItemHandler(parent.id);
                break;
            }
            case target.classList.contains('pagination__number'): {
                this.paginationHandler(target.textContent || '');
                break;
            }
            case target.classList.contains('potential-code__button'): {
                this.addCodeHandler(target.id);
                break;
            }
            case target.classList.contains('applied-code__image'): {
                this.deleteCodeHandler(target.id);
                break;
            }
            case target.classList.contains('cart-summary__button'): {
                this.view.showPopup();
                this.popupHandler.initEvents();
                break;
            }
        }
    }

    inputHandler(e: Event) {
        const target = e.target;
        if (!(target instanceof HTMLInputElement)) return;
        switch (true) {
            case target.classList.contains('items-per-page__input'): {
                const input = target.value;
                this.limitChangeHandler(input);
                break;
            }
            case target.classList.contains('code-input'): {
                const input = target.value;
                this.promoCodeChangeHandler(input);
                break;
            }
        }
    }

    private increaseItemHandler(id: string) {
        this.cartService.addItemToCart(id);
        this.view.updateCartAndSummary(this.cartService.getCartInfo());
    }

    private reduceItemHandler(id: string) {
        this.cartService.reduceItemInCart(id);
        this.view.updateCartAndSummary(this.cartService.getCartInfo());
    }

    private deleteItemHandler(id: string) {
        this.cartService.deleteItemFromCart(id);
        this.view.updateCartAndSummary(this.cartService.getCartInfo());
    }

    private paginationHandler(page: string) {
        if (!page) return;
        const currentPage = this.cartService.getPage();
        let newPage: number = currentPage;
        if (page === '<') {
            newPage = currentPage - 1;
        } else if (page === '>') {
            newPage = currentPage + 1;
        } else if (!isNaN(parseInt(page, 10))) {
            newPage = parseInt(page, 10);
        }
        this.cartService.setPage(newPage);
        const cartInfo = this.cartService.getCartInfo();
        if (newPage !== this.cartService.getPage()) return;
        this.view.updateCartBlock(cartInfo.products, cartInfo.params);
        const url = this.urlService.replaceQueryParam('page', String(newPage));
        this.urlService.addUrlInHistory(url);
    }

    private addCodeHandler(code: string) {
        this.codesService.addPromoCode(code);
        const codes = this.codesService.getPromoCodes();
        this.view.updateSummary(this.cartService.getCartSummary(codes), codes);
    }

    private deleteCodeHandler(code: string) {
        this.codesService.deletePromoCode(code);
        const codes = this.codesService.getPromoCodes();
        this.view.updateSummary(this.cartService.getCartSummary(codes), codes);
    }

    private limitChangeHandler(limit: string) {
        const newLimit = parseInt(limit, 10);
        if (isNaN(newLimit) || newLimit === this.cartService.getLimit() || newLimit === 0) return;
        this.cartService.setLimit(newLimit);
        const cartInfo = this.cartService.getCartInfo();
        this.view.updateCartBlock(cartInfo.products, cartInfo.params);
        const url = this.urlService.replaceQueryParam('limit', String(newLimit));
        this.urlService.addUrlInHistory(url);
    }

    private promoCodeChangeHandler(code: string) {
        const promoCode = this.codesService.checkPromoCode(code);
        this.view.summary.updatePotentialCode(promoCode);
    }
}
