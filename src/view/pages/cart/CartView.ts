import CheckoutPopup from './checkout-popup/checkout-popup';
import { CartInfo, CartParams, CartProduct, CartSummary, PromoCode } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import CartBlock from './cart-block/CartBlock';
import './cart-view.scss';
import SummaryBlock from './summary-block/SummaryBlock';
import CartHeader from './cart-header/CartHeader';

class CartView {
    popup: CheckoutPopup;
    cartHeader: CartHeader;
    cartBlock: CartBlock;
    summary: SummaryBlock;

    constructor() {
        this.popup = new CheckoutPopup();
        this.cartHeader = new CartHeader();
        this.cartBlock = new CartBlock();
        this.summary = new SummaryBlock();
    }

    getCart(cartInfo: CartInfo) {
        const container = ElementsFactory.createDivElement('wrapper cart-wrapper');
        if (cartInfo.products.length === 0) {
            container.append(this.getEmptyCartMessage());
        } else {
            container.append(
                this.getItemsBlock(cartInfo.products, cartInfo.params, cartInfo.summary, cartInfo.promoCodes)
            );
        }
        return container;
    }

    getItemsBlock(cart: CartProduct[], params: CartParams, summary: CartSummary, codes: PromoCode[]) {
        const cartHeaderBlock = this.cartHeader.renderCartHeader(params.itemsPerPage);
        const cartPage = this.cartBlock.getCartPage(cart, params);
        const cartBlock = ElementsFactory.createDivElement('cart-block-container');
        cartBlock.append(cartHeaderBlock, cartPage);
        const summaryBlock = this.summary.getSummary(summary, codes);
        const cartContainer = ElementsFactory.createDivElement('cart');
        cartContainer.append(cartBlock, summaryBlock);
        return cartContainer;
    }

    getEmptyCartMessage() {
        return ElementsFactory.createBaseElementWithText('div', 'no-cart-items', 'Cart is empty.');
    }
}

export default CartView;
