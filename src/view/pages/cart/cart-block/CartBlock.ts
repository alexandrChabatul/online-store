import { CartParams, CartProduct } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import CartItem from './cart-item/CartItem';
import './cart-block.scss';

export default class CartBlock {
    getCartPage(cart: CartProduct[], params: CartParams) {
        const cartBlock = ElementsFactory.createDivElement('cart-block');
        const items = this.renderItems(cart);
        const pagination = this.renderPagination(params.page, params.numOfPages);
        cartBlock.append(items, pagination);
        return cartBlock;
    }

    renderItems(cart: CartProduct[]) {
        const items = ElementsFactory.createDivElement('cart-items');
        const itemsHeader = ElementsFactory.createDivElement('items-header');
        const itemsMark = ElementsFactory.createBaseElementWithText('p', 'items-header__item', 'Item');
        const descriptionMark = ElementsFactory.createBaseElementWithText(
            'p',
            'items-header__description',
            'Description'
        );
        const priceMark = ElementsFactory.createBaseElementWithText('p', 'items-header__price', 'Price');
        const quantityMark = ElementsFactory.createBaseElementWithText('p', 'items-header__quantity', 'Qty');
        const subtotalMark = ElementsFactory.createBaseElementWithText('p', 'items-header__subtotal', 'Subtotal');
        itemsHeader.append(itemsMark, descriptionMark, priceMark, quantityMark, subtotalMark);
        const itemsContainer = ElementsFactory.createDivElement('cart-items-container');
        cart.forEach((item) => itemsContainer.append(CartItem.getCartItem(item)));
        items.append(itemsHeader, itemsContainer);
        return items;
    }

    renderPagination(page: number, numOfPages: number) {
        const pagination = ElementsFactory.createBaseElement('ul', 'cart-pagination') as HTMLUListElement;
        pagination.append(ElementsFactory.createBaseElementWithText('li', 'pagination__number', '<'));
        for (let i = 1; i <= numOfPages; i++) {
            const numberClass = i === page ? 'pagination__number pagination__number_active' : 'pagination__number';
            const numberBlock = ElementsFactory.createBaseElementWithText('li', numberClass, String(i));
            pagination.append(numberBlock);
        }
        pagination.append(ElementsFactory.createBaseElementWithText('li', 'pagination__number', '>'));
        return pagination;
    }
}
