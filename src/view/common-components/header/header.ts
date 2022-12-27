import { ElementsFactory } from '../../../utils/element-generator';
import './header.scss';

export class Header {
    cart: HTMLElement;
    total: HTMLElement;

    constructor(counter: string, total: string) {
        this.cart = ElementsFactory.createBaseElementWithText('span', 'cart-counter', counter);
        this.total = ElementsFactory.createBaseElementWithText('span', 'cart-total-sum', `€${total}`);
    }

    public createHeader(): HTMLElement {
        const header = ElementsFactory.createBaseElement('header', 'header');
        const headerWrapper = ElementsFactory.createDivElement('wrapper header-wrapper');
        const logoBlock = ElementsFactory.createAnchor('router-link logo-block', '', '/');
        const logo = ElementsFactory.createBaseElementWithText('span', 'logo', 'Online Store');
        const logoIcon = ElementsFactory.createBaseElement('span', 'logo-icon');
        const cartIcon = ElementsFactory.createAnchor('router-link cart-icon', '', '/cart');
        const cartTotal = ElementsFactory.createBaseElementWithText('div', 'cart-total', 'Cart total: ');
        header.append(headerWrapper);
        headerWrapper.append(logoBlock, cartTotal, cartIcon);
        logoBlock.append(logoIcon, logo);
        cartTotal.append(this.total);
        cartIcon.append(this.cart);

        return header;
    }

    public upateCart(counter: string, total: string): void {
        this.total.textContent = `€${total}`;
        this.cart.textContent = counter;
    }
}
