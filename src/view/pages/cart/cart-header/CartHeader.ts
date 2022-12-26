import { NewElement } from '../../../../utils/element-generator';
import './cart-header.scss';

export default class CartHeader {
    header: HTMLDivElement;

    constructor() {
        this.header = NewElement.createDivElement('cart-header');
    }

    renderCartHeader(itemsPerPage: number) {
        const title = NewElement.createBaseElementWithText('p', 'cart-header__title', 'Products in cart:');
        const itemsPerPageContainer = NewElement.createDivElement('items-per-page');
        const itemsPerPageText = NewElement.createBaseElementWithText('p', 'items-per-page', 'Items:');
        const itemsPerPageInput = NewElement.createInputNumber('items-per-page__input', String(itemsPerPage), '');
        itemsPerPageContainer.append(itemsPerPageText, itemsPerPageInput);
        this.header.append(title, itemsPerPageContainer);
        return this.header;
    }
}
