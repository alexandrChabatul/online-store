import CartService from 'services/CartService';

export default class ProductHandler {
    cartService: CartService;

    constructor() {
        this.cartService = new CartService();
    }

    initProductHandlers(target: HTMLElement) {
        target.onclick = this.productClickHandler.bind(this);
    }

    private productClickHandler(e: Event) {
        const target = e.target;
        if (!target || !(target instanceof HTMLButtonElement)) return;
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
        const isInCart = target.dataset.cart === 'true';
        if (isInCart) {
            this.cartService.deleteItemFromCart(id);
            target.textContent = 'Add to cart';
        } else {
            console.log('add');
            this.cartService.addItemToCart(id);
            target.textContent = 'Remove from cart';
        }
        target.setAttribute('data-cart', String(!isInCart));
    }

    private handleBuyClick(target: HTMLButtonElement) {
        this.cartService.setPopupState(true);
        const id = target.dataset.id;
        if (!id) return;
        const isInCart = target.dataset.cart === 'true';
        if (!isInCart) this.cartService.addItemToCart(id);
    }
}
