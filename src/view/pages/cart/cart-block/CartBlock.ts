import { CartMap, CartParams, Product } from '../../../../common/types';
import { NewElement } from '../../../../utils/element-generator';

export default class CartBlock {
    // container: HTMLDivElement;
    header: HTMLDivElement;
    items: HTMLDivElement;
    pagination: HTMLUListElement;

    constructor() {
        this.header = NewElement.createDivElement('cart-header');
        this.items = NewElement.createDivElement('cart-items');
        this.pagination = NewElement.createBaseElement('ul', 'cart-pagination') as HTMLUListElement;
    }

    renderCartHeader(itemsPerPage: number) {
        const title = NewElement.createBaseElementWithText('p', 'cart-header__title', 'Products in cart:');
        const itemsPerPageInput = NewElement.createInputNumber('items-input', String(itemsPerPage), "");
        this.header.append(title, itemsPerPageInput);
    }

    renderItems(cart: CartMap) {
        for (let entry of cart.entries()) {
            this.getItem(entry);
        }
    }

    private getItem(entry: [Product, number]) {
        const cartItem = NewElement.createDivElement('cart-item');
        
        return cartItem;
    }
}
