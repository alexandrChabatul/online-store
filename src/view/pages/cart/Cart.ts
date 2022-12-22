import CheckoutPopup from './checkout-popup/checkout-popup';

class Cart {
    popup: CheckoutPopup;

    constructor() {
        this.popup = new CheckoutPopup();
    }

    render() {
        const app = <HTMLDivElement>document.getElementById('app');
        const checkoutPopup = this.popup.createCheckoutPopup();
        app.append(checkoutPopup);
    }
}

export default Cart;
