import { CartParams, CartProduct } from '../../../../common/types';
import { NewElement } from '../../../../utils/element-generator';
import CartItem from './cart-item/CartItem';
import './cart-block.scss';

export default class CartBlock {
    items: HTMLDivElement;
    pagination: HTMLUListElement;

    constructor() {
        this.items = NewElement.createDivElement('cart-items');
        this.pagination = NewElement.createBaseElement('ul', 'cart-pagination') as HTMLUListElement;
    }

    getCartPage(cart: CartProduct[], params: CartParams) {
        const cartBlock = NewElement.createDivElement('cart-block');
        this.renderItems(cart);
        this.renderPagination(params.page, params.numOfPages);
        cartBlock.append(this.items, this.pagination);
        return cartBlock;
    }

    renderItems(cart: CartProduct[]) {
        const itemsHeader = NewElement.createDivElement('items-header');
        const itemsMark = NewElement.createBaseElementWithText('p', 'items-header__item', 'Item');
        const descriptionMark = NewElement.createBaseElementWithText('p', 'items-header__description', 'Description');
        const priceMark = NewElement.createBaseElementWithText('p', 'items-header__price', 'Price');
        const quantityMark = NewElement.createBaseElementWithText('p', 'items-header__quantity', 'Qty');
        const subtotalMark = NewElement.createBaseElementWithText('p', 'items-header__subtotal', 'Subtotal');
        itemsHeader.append(itemsMark, descriptionMark, priceMark, quantityMark, subtotalMark);
        const itemsContainer = NewElement.createDivElement('cart-items-container');
        cart.forEach((item, index) => itemsContainer.append(CartItem.getCartItem(item, index + 1)));
        this.items.append(itemsHeader, itemsContainer);
    }

    renderPagination(page: number, numOfPages: number) {
        this.pagination.append(NewElement.createBaseElementWithText('li', 'pagination__number', '<'));
        for (let i = 1; i <= numOfPages; i++) {
            const numberClass = i === page ? 'pagination__number pagination__number_active' : 'pagination__number';
            const numberBlock = NewElement.createBaseElementWithText('li', numberClass, String(i));
            this.pagination.append(numberBlock);
        }
        this.pagination.append(NewElement.createBaseElementWithText('li', 'pagination__number', '>'));
    }
}
