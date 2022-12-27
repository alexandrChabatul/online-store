import { ElementsFactory } from '../../../../utils/element-generator';
import './cart-header.scss';

export default class CartHeader {
    header: HTMLDivElement;

    constructor() {
        this.header = ElementsFactory.createDivElement('cart-header');
    }

    renderCartHeader(itemsPerPage: number) {
        const title = ElementsFactory.createBaseElementWithText('p', 'cart-header__title', 'Products in cart:');
        const itemsPerPageContainer = ElementsFactory.createDivElement('items-per-page');
        const itemsPerPageText = ElementsFactory.createBaseElementWithText('p', 'items-per-page', 'Items:');
        const itemsPerPageInput = ElementsFactory.createInputNumber('items-per-page__input', String(itemsPerPage), '');
        itemsPerPageContainer.append(itemsPerPageText, itemsPerPageInput);
        this.header.append(title, itemsPerPageContainer);
        return this.header;
    }
}
