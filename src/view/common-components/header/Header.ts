import appConstants from 'common/constants';
import { ElementsFactory } from 'utils/ElementGenerator';
import './header.scss';

export class Header {
    header: HTMLElement;
    cart: HTMLElement;
    total: HTMLElement;

    constructor() {
        this.cart = ElementsFactory.createBaseElementWithText('span', 'cart-counter', '0');
        this.total = ElementsFactory.createBaseElementWithText('span', 'cart-total-sum', `${appConstants.currency}0`);
        this.header = ElementsFactory.createBaseElement('header', 'header');
    }

    public createHeader(): HTMLElement {
        const headerWrapper = ElementsFactory.createDivElement('wrapper header-wrapper');
        const logoBlock = ElementsFactory.createAnchor('router-link logo-block', '', '/');
        const logo = ElementsFactory.createBaseElementWithText('span', 'logo', 'Online Store');
        const logoIcon = ElementsFactory.createBaseElement('span', 'logo-icon');
        const cartIcon = ElementsFactory.createAnchor('router-link cart-icon', '', '/cart');
        const cartTotal = ElementsFactory.createBaseElementWithText('div', 'cart-total', 'Cart total: ');
        this.header.append(headerWrapper);
        headerWrapper.append(logoBlock, cartTotal, cartIcon);
        logoBlock.append(logoIcon, logo);
        cartTotal.append(this.total);
        cartIcon.append(this.cart);
        return this.header;
    }

    public updateCart(counter: string, total: string): void {
        this.total.textContent = `€${total}`;
        this.cart.textContent = counter;
    }
}
