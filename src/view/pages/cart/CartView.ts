import CheckoutPopup from './checkout-popup/checkout-popup';
import { CartInfo, CartParams, CartProduct, CartSummary, PromoCode } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import CartBlock from './cart-block/CartBlock';
import './cart-view.scss';
import SummaryBlock from './summary-block/SummaryBlock';
import CartHeader from './cart-header/CartHeader';

class CartView {
    parent: HTMLElement;
    wrapper: HTMLDivElement;
    cartHeaderElement: HTMLDivElement;
    cartBlockElement: HTMLDivElement;
    summaryBlockElement: HTMLDivElement;
    popupElement: HTMLDivElement;
    popup: CheckoutPopup;
    cartHeader: CartHeader;
    cartBlock: CartBlock;
    summary: SummaryBlock;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.wrapper = ElementsFactory.createDivElement('wrapper cart-wrapper');
        this.parent.append(this.wrapper);
        this.popup = new CheckoutPopup();
        this.cartHeader = new CartHeader();
        this.cartBlock = new CartBlock();
        this.summary = new SummaryBlock();
        this.cartBlockElement = ElementsFactory.createDivElement('');
        this.summaryBlockElement = ElementsFactory.createDivElement('');
        this.cartHeaderElement = ElementsFactory.createDivElement('');
        this.popupElement = this.popup.createCheckoutPopup();
    }

    setStructure() {
        const cartBlockContainer = ElementsFactory.createDivElement('cart-block-container');
        cartBlockContainer.append(this.cartHeaderElement, this.cartBlockElement);
        this.wrapper.append(cartBlockContainer, this.summaryBlockElement);
    }

    renderCart(cartInfo: CartInfo) {
        this.wrapper.innerHTML = '';
        if (cartInfo.products.length > 0) {
            this.setStructure();
            const header = this.cartHeader.getCartHeader(cartInfo.params.itemsPerPage);
            this.cartHeaderElement.replaceWith(header);
            this.cartHeaderElement = header;
            this.updateCartBlock(cartInfo.products, cartInfo.params);
            this.updateSummary(cartInfo.summary, cartInfo.promoCodes);
        } else {
            this.wrapper.append(this.getEmptyCartMessage());
        }
    }

    updateCartAndSummary(cartInfo: CartInfo) {
        if (cartInfo.products.length === 0) {
            this.wrapper.innerHTML = '';
            this.wrapper.append(this.getEmptyCartMessage());
        }
        const cartBlock = this.cartBlock.getCartPage(cartInfo.products, cartInfo.params);
        this.cartBlockElement.replaceWith(cartBlock);
        this.cartBlockElement = cartBlock;
        this.summary.updateSummaryDescription(cartInfo.summary);
    }

    updateCartBlock(products: CartProduct[], params: CartParams) {
        const cartBlock = this.cartBlock.getCartPage(products, params);
        this.cartBlockElement.replaceWith(cartBlock);
        this.cartBlockElement = cartBlock;
    }

    updateSummary(summary: CartSummary, promoCodes: PromoCode[]) {
        const summaryBlock = this.summary.getSummary(summary, promoCodes);
        this.summaryBlockElement.replaceWith(summaryBlock);
        this.summaryBlockElement = summaryBlock;
    }

    getEmptyCartMessage() {
        const emptyBlock = ElementsFactory.createDivElement('empty-cart');
        const message = ElementsFactory.createBaseElementWithText('div', 'empty-cart__message', 'Cart is empty.');
        const image = ElementsFactory.createDivElement('empty-cart__image');
        emptyBlock.append(message, image);
        return emptyBlock;
    }

    showBuyMessage(timer: number) {
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

    showPopup() {
        this.popupElement = this.popup.createCheckoutPopup();
        this.parent.append(this.popupElement);
    }

    hidePopup() {
        this.popupElement.remove();
    }
}

export default CartView;
