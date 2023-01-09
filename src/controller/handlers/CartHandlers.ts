import CartService from 'services/CartService';
import PromoCodeService from 'services/PromoCodeService';
import UrlService from 'services/UrlService';
import BasePage from 'view/common-components/BasePage';
import CartView from 'view/pages/cart/CartView';
import PopupHandler from './PopupHandler';

export default class CartHandler {
    view: CartView;
    cartService: CartService;
    urlService: UrlService;
    codesService: PromoCodeService;
    popupHandler: PopupHandler;
    basePage: BasePage;

    constructor(view: CartView, cartService: CartService) {
        this.basePage = BasePage.getInstance();
        this.view = view;
        this.cartService = cartService;
        this.urlService = new UrlService();
        this.codesService = new PromoCodeService();
        this.popupHandler = new PopupHandler(this.view, this.cartService);
    }

    initEvents(): void {
        this.view.cartHeader.header.oninput = this.limitChangeHandler.bind(this);
        this.view.summary.summary.oninput = this.promoCodeChangeHandler.bind(this);
        this.view.cartBlock.cartBlock.onclick = this.cartBlockClickHandler.bind(this);
        this.view.summary.summary.onclick = this.summaryClickHandler.bind(this);
    }

    private cartBlockClickHandler(e: Event): void {
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
        }
    }

    private summaryClickHandler(e: Event): void {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        switch (true) {
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

    private increaseItemHandler(id: string): void {
        this.cartService.addItemToCart(id);
        const cartInfo = this.cartService.getCartInfo();
        this.view.updateCartAndSummary(cartInfo);
        this.basePage.updateHeader(String(cartInfo.summary.productQty), String(cartInfo.summary.prevPrice));
    }

    private reduceItemHandler(id: string): void {
        this.cartService.reduceItemInCart(id);
        const cartInfo = this.cartService.getCartInfo();
        this.view.updateCartAndSummary(cartInfo);
        this.basePage.updateHeader(String(cartInfo.summary.productQty), String(cartInfo.summary.prevPrice));
    }

    private deleteItemHandler(id: string): void {
        this.cartService.deleteItemFromCart(id);
        const cartInfo = this.cartService.getCartInfo();
        this.view.updateCartAndSummary(cartInfo);
        this.basePage.updateHeader(String(cartInfo.summary.productQty), String(cartInfo.summary.prevPrice));
    }

    private paginationHandler(page: string): void {
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

    private addCodeHandler(code: string): void {
        this.codesService.addPromoCode(code);
        const codes = this.codesService.getPromoCodes();
        this.view.updateSummary(this.cartService.getCartSummary(codes), codes);
    }

    private deleteCodeHandler(code: string): void {
        this.codesService.deletePromoCode(code);
        const codes = this.codesService.getPromoCodes();
        this.view.updateSummary(this.cartService.getCartSummary(codes), codes);
    }

    private limitChangeHandler(e: Event): void {
        const target = e.target;
        if (!(target instanceof HTMLInputElement) || !target.value) return;
        const limit = parseInt(target.value, 10);
        if (isNaN(limit) || limit === this.cartService.getLimit() || limit === 0) return;
        this.cartService.setLimit(limit);
        const cartInfo = this.cartService.getCartInfo();
        this.view.updateCartBlock(cartInfo.products, cartInfo.params);
        const url = this.urlService.replaceQueryParam('limit', String(limit));
        this.urlService.addUrlInHistory(url);
    }

    private promoCodeChangeHandler(e: Event): void {
        const target = e.target;
        if (!(target instanceof HTMLInputElement)) return;
        const code = target.value;
        const promoCode = this.codesService.checkPromoCode(code);
        this.view.summary.updatePotentialCode(promoCode);
    }
}
