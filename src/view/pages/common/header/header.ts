import { NewElement } from '../../../../utils/element-generator';
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
        const logoBlock = NewElement.createAnchor('router-link', '', '/');
        const logo = NewElement.createBaseElementWithText('span', 'logo', 'Online Store');
        const logoIcon = NewElement.createBaseElement('span', 'logo-icon');
        const cartIcon = NewElement.createAnchor('router-link', '', '/cart');
        cartIcon.classList.add('cart-icon');
        const cartTotal = NewElement.createBaseElementWithText('div', 'cart-total', 'Cart total: ');
        logoBlock.classList.add('logo-block');
        header.append(logoBlock);
        logoBlock.append(logoIcon);
        logoBlock.append(logo);
        header.append(cartTotal);
        cartTotal.append(this.total);
        header.append(cartIcon);
        cartIcon.append(this.cart);

        return header;
    }

    public upateCart(counter: string, total: string): void {
        this.cart.textContent = total;
        this.cart.textContent = counter;
    }
}
