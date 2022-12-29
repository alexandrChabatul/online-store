import { CartParams, CartProduct } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import CartItem from './cart-item/CartItem';
import './cart-block.scss';

export default class CartBlock {
    items: HTMLDivElement;
    pagination: HTMLUListElement;

    constructor() {
        this.items = ElementsFactory.createDivElement('cart-items');
        this.pagination = ElementsFactory.createBaseElement('ul', 'cart-pagination') as HTMLUListElement;
    }

    getCartPage(cart: CartProduct[], params: CartParams) {
        const cartBlock = ElementsFactory.createDivElement('cart-block');
        this.renderItems(cart);
        this.renderPagination(params.page, params.numOfPages);
        cartBlock.append(this.items, this.pagination);
        return cartBlock;
    }

    renderItems(cart: CartProduct[]) {
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
        this.items.append(itemsHeader, itemsContainer);
    }

    renderPagination(page: number, numOfPages: number) {
        this.pagination.append(ElementsFactory.createBaseElementWithText('li', 'pagination__number', '<'));
        for (let i = 1; i <= numOfPages; i++) {
            const numberClass = i === page ? 'pagination__number pagination__number_active' : 'pagination__number';
            const numberBlock = ElementsFactory.createBaseElementWithText('li', numberClass, String(i));
            this.pagination.append(numberBlock);
        }
        this.pagination.append(ElementsFactory.createBaseElementWithText('li', 'pagination__number', '>'));
    }
}
