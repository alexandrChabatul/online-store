import CheckoutPopup from './checkout-popup/CheckoutPopup';
import { CartInfo, CartParams, CartProduct, CartSummary, PromoCode } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';
import CartBlock from './cart-block/CartBlock';
import './cart-view.scss';
import SummaryBlock from './summary-block/SummaryBlock';
import CartHeader from './cart-header/CartHeader';

class CartView {
    wrapper: HTMLDivElement;
    popup: CheckoutPopup;
    cartHeader: CartHeader;
    cartBlock: CartBlock;
    summary: SummaryBlock;

    constructor() {
        this.wrapper = ElementsFactory.createDivElement('wrapper cart-wrapper');
        this.popup = new CheckoutPopup();
        this.cartHeader = new CartHeader();
        this.cartBlock = new CartBlock();
        this.summary = new SummaryBlock();
    }

    renderCart(cartInfo: CartInfo): HTMLDivElement {
        this.wrapper.innerHTML = '';
        if (cartInfo.products.length === 0) {
            this.wrapper.append(this.getEmptyCartMessage());
            return this.wrapper;
        }
        const cartBlockContainer = ElementsFactory.createDivElement('cart-block-container');
        const cartHeader = this.cartHeader.getCartHeader(cartInfo.params.itemsPerPage);
        const cartBlock = this.cartBlock.getCartPage(cartInfo.products, cartInfo.params);
        const summary = this.summary.getSummary(cartInfo.summary, cartInfo.promoCodes);
        cartBlockContainer.append(cartHeader, cartBlock);
        this.wrapper.append(cartBlockContainer, summary);
        return this.wrapper;
    }

    updateCartAndSummary(cartInfo: CartInfo): void {
        if (cartInfo.products.length === 0) {
            this.wrapper.innerHTML = '';
            this.wrapper.append(this.getEmptyCartMessage());
        }
        this.cartBlock.updateCartBlock(cartInfo.products, cartInfo.params);
        this.summary.updateSummaryDescription(cartInfo.summary);
    }

    updateCartBlock(products: CartProduct[], params: CartParams): void {
        this.cartBlock.updateCartBlock(products, params);
    }

    updateSummary(summary: CartSummary, promoCodes: PromoCode[]): void {
        this.summary.updateSummary(summary, promoCodes);
    }

    getEmptyCartMessage(): HTMLDivElement {
        const emptyBlock = ElementsFactory.createDivElement('empty-cart');
        const message = ElementsFactory.createBaseElementWithText('div', 'empty-cart__message', 'Cart is empty.');
        const image = ElementsFactory.createDivElement('empty-cart__image');
        emptyBlock.append(message, image);
        return emptyBlock;
    }

    showBuyMessage(timer: number): void {
        this.wrapper.innerHTML = '';
        const buyBlock = ElementsFactory.createDivElement('buy-block');
        const message = ElementsFactory.createDivElement('buy-block__message');
        const image = ElementsFactory.createDivElement('buy-block__image');
        buyBlock.append(message, image);
        this.wrapper.append(buyBlock);
        message.textContent = `Thank you for the order. Redirect to the main page in ${timer + 1} seconds.`;

        const timerId = setInterval(() => {
            const diff = timer;
            if (diff <= 0) {
                clearInterval(timerId);
            }
            message.textContent = `Thank you for the order. Redirect to the main page in ${timer--} seconds.`;
        }, 1000);
    }

    showPopup(): void {
        const popupElement = this.popup.createCheckoutPopup();
        this.wrapper.append(popupElement);
    }

    hidePopup(): void {
        this.popup.wrapper.remove();
    }
}

export default CartView;
