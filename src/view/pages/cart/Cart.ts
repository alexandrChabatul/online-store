import CheckoutPopup from './checkout-popup/checkout-popup';

class Cart {
    popup: CheckoutPopup;
    constructor() {
        this.popup = new CheckoutPopup();
    }

    render() {
        const app = <HTMLDivElement>document.getElementById('app');
        const popup = this.popup.createCheckoutPopup();
        app.append(popup);
        this.popup.markInvalid(this.popup.cardDetails.cardCVV, this.popup.cardDetails.cardCVVError);
        this.popup.cardDetails.cardCVV.addEventListener('click',() => {
            //something
        })
        this.popup.selectCardImage('');
        // app.textContent = 'This is cart!';
    }
}

export default Cart;
