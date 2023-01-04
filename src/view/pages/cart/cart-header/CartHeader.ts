import { ElementsFactory } from 'utils/element-generator';
import './cart-header.scss';

export default class CartHeader {
    getCartHeader(itemsPerPage: number) {
        const header = ElementsFactory.createDivElement('cart-header');
        const title = ElementsFactory.createBaseElementWithText('p', 'cart-header__title', 'Products in cart:');
        const itemsPerPageContainer = ElementsFactory.createDivElement('items-per-page');
        const itemsPerPageText = ElementsFactory.createBaseElementWithText('p', 'items-per-page', 'Items:');
        const itemsPerPageInput = ElementsFactory.createInputNumber('items-per-page__input', String(itemsPerPage), '');
        itemsPerPageContainer.append(itemsPerPageText, itemsPerPageInput);
        header.append(title, itemsPerPageContainer);
        return header;
    }
}
