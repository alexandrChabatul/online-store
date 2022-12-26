import CheckoutPopup from './checkout-popup/checkout-popup';
import { CartParams, CartProduct, CartSummary, PromoCode } from '../../../common/types';
import { NewElement } from '../../../utils/element-generator';
import CartPage from './cart-block/CartPage';
import './cart-view.scss';
import SummaryBlock from './summary-block/SummaryBlock';
import CartHeader from './cart-header/CartHeader';

class Cart {
    popup: CheckoutPopup;
    cartHeader: CartHeader;
    cartPage: CartPage;
    summary: SummaryBlock;

    constructor() {
        this.popup = new CheckoutPopup();
        this.cartHeader = new CartHeader();
        this.cartPage = new CartPage();
        this.summary = new SummaryBlock();
    }

    renderCart(cart: CartProduct[], params: CartParams, summary: CartSummary, codes: PromoCode[]) {
        const container = NewElement.createDivElement('wrapper cart-wrapper');
        if (cart.length === 0) {
            container.append(this.getEmptyCarMessage());
        } else {
            container.append(this.getCart(cart, params, summary, codes));
        }
        const app = <HTMLDivElement>document.getElementById('app');
        app.append(container);
    }

    getCart(cart: CartProduct[], params: CartParams, summary: CartSummary, codes: PromoCode[]) {
        const cartHeaderBlock = this.cartHeader.renderCartHeader(params.itemsPerPage);
        const cartPage = this.cartPage.getCardPage(cart, params);
        const cartBlock = NewElement.createDivElement('cart-block');
        cartBlock.append(cartHeaderBlock, cartPage);
        const summaryBlock = this.summary.getSummary(summary, codes);
        const cartContainer = NewElement.createDivElement('cart');
        cartContainer.append(cartBlock, summaryBlock);
        return cartContainer;
    }

    getEmptyCarMessage() {
        return NewElement.createBaseElementWithText('div', 'no-cart-items', 'Cart is empty.');
    }
}

export default Cart;
