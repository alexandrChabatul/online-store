import CartService from 'services/CartService';
import BasePage from 'view/common-components/BasePage';

export default class ProductHandler {
    basePage: BasePage;
    cartService: CartService;

    constructor() {
        this.basePage = BasePage.getInstance();
        this.cartService = new CartService();
    }

    initProductHandlers(target: HTMLElement) {
        target.onclick = this.productClickHandler.bind(this);
    }

    private productClickHandler(e: Event) {
        const target = e.target;
        if (!(target instanceof HTMLButtonElement)) return;
        switch (true) {
            case target.classList.contains('product-buttons__cart'): {
                this.handleToCartClick(target);
                break;
            }
            case target.classList.contains('product-buttons__buy'): {
                this.handleBuyClick(target);
                break;
            }
        }
    }

    private handleToCartClick(target: HTMLButtonElement) {
        const id = target.dataset.id;
        if (!id) return;
        const isInCart = this.cartService.checkItemInCart(id);
        if (isInCart) {
            this.cartService.deleteItemFromCart(id);
            target.textContent = 'Add to cart';
        } else {
            this.cartService.addItemToCart(id);
            target.textContent = 'Remove from cart';
        }
        target.setAttribute('data-cart', String(!isInCart));
        const cartInfo = this.cartService.getCartInfo();
        this.basePage.updateHeader(String(cartInfo.summary.productQty), String(cartInfo.summary.prevPrice));
    }

    private handleBuyClick(target: HTMLButtonElement) {
        this.cartService.setPopupState(true);
        const id = target.dataset.id;
        if (!id) return;
        const isInCart = this.cartService.checkItemInCart(id);
        if (!isInCart) {
            this.cartService.addItemToCart(id);
            const cartInfo = this.cartService.getCartInfo();
            this.basePage.updateHeader(String(cartInfo.summary.productQty), String(cartInfo.summary.prevPrice));
        }
    }
}
