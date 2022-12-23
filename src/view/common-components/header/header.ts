import { NewElement } from '../../../utils/element-generator';
import './header.scss';

export class Header {
    cart: HTMLElement;
    total: HTMLElement;

    constructor(counter: string, total: string) {
        this.cart = NewElement.createBaseElementWithText('span', 'cart-counter', counter);
        this.total = NewElement.createBaseElementWithText('span', 'cart-total-sum', `€${total}`);
    }

    public createHeader(): HTMLElement {
        const header = NewElement.createBaseElement('div', 'header');
        const logoBlock = NewElement.createAnchor('router-link logo-block', '', '/');
        const logo = NewElement.createBaseElementWithText('span', 'logo', 'Online Store');
        const logoIcon = NewElement.createBaseElement('span', 'logo-icon');
        const cartIcon = NewElement.createAnchor('router-link cart-icon', '', '/cart');
        const cartTotal = NewElement.createBaseElementWithText('div', 'cart-total', 'Cart total: ');
        header.append(logoBlock, cartTotal, cartIcon);
        logoBlock.append(logoIcon, logo);
        cartTotal.append(this.total);
        cartIcon.append(this.cart);

        return header;
    }

    public upateCart(counter: string, total: string): void {
        this.total.textContent = total;
        this.cart.textContent = counter;
    }
}
