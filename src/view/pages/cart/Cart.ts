import CheckoutPopup from './checkout-popup/checkout-popup';
import { CartMap, CartParams, CartSummary } from '../../../common/types';
import { NewElement } from '../../../utils/element-generator';
import CartBlock from './cart-block/CartBlock';

class Cart {
    popup: CheckoutPopup;
    cartBlock: CartBlock;
    summaryBlock: HTMLDivElement;

    constructor() {
        this.popup = new CheckoutPopup();
        this.cartBlock = new CartBlock();
        this.summaryBlock = NewElement.createDivElement('summary');        
    }

    render(cart: CartMap, params: CartParams, summary: CartSummary) {
        this.renderCartBlock(cart, params); 
        this.renderSummaryBlock(summary);               
    }

    renderCartBlock(cart: CartMap, params: CartParams) {
    }

    renderSummaryBlock(summary: CartSummary) {

    }
}

export default Cart;
