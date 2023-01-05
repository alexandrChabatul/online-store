import appConstants from 'common/constants';
import { CartProduct } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import './cart-item.scss';

export default class CartItem {
    static getCartItem(item: CartProduct) {
        const product = item.product;
        const counterBlock = this.getCounterBlock(item.index);
        const imageBlock = this.getImageBlock(product.thumbnail, product.title, product.id);
        const descriptionBlock = this.getDescriptionBlock(
            product.id,
            product.title,
            product.category,
            product.brand,
            product.description
        );
        const priceBlock = this.getPriceBlock(product.price, product.currentPrice);
        const quantityBlock = this.getQuantityBlock(item.quantity, product.stock);
        const subtotalBlock = this.getSubtotalBlock(item.subtotal);
        const deleteBlock = this.getDeleteBlock();
        const cartItem = ElementsFactory.createDivElement('cart-item');
        cartItem.id = String(item.product.id);
        cartItem.append(
            counterBlock,
            imageBlock,
            descriptionBlock,
            priceBlock,
            quantityBlock,
            subtotalBlock,
            deleteBlock
        );
        return cartItem;
    }

    private static getCounterBlock(index: number) {
        return ElementsFactory.createBaseElementWithText('div', 'cart-item__counter', String(index));
    }

    private static getImageBlock(imageSrc: string, title: string, id: number) {
        const anchor = ElementsFactory.createAnchor('router-link cart-item__img-container', '', `/product/${id}`);
        const image = ElementsFactory.createImgElement('', imageSrc, title);
        anchor.append(image);
        return anchor;
    }

    private static getDescriptionBlock(
        id: number,
        title: string,
        category: string,
        brand: string,
        description: string
    ) {
        const descriptionBlock = ElementsFactory.createDivElement('cart-description');
        let html = '';
        if (title) {
            html += `<a class="router-link cart-description__title" href="/product/${id}">${title}</a>`;
        }
        if (category) {
            html += `<p class="cart-description__name">Category: <span class="cart-description__value">${category.toLowerCase()}</span></p>`;
        }
        if (brand) {
            html += `<p class="cart-description__name">Brand: <span class="cart-description__value">${brand}</span></p>`;
        }
        if (description) {
            html += `<p class="cart-description__value cart-item-description">${
                description[0].toUpperCase() + description.slice(1)
            }</p>`;
        }
        descriptionBlock.innerHTML = html;
        return descriptionBlock;
    }

    private static getPriceBlock(prevPrice: number, currentPrice: number) {
        const priceBlock = ElementsFactory.createDivElement('cart-price');
        priceBlock.innerHTML = `<p class="cart-price__prev">${appConstants.currency}${prevPrice}</p><p class="cart-price__real">${appConstants.currency}${currentPrice}</p>`;
        return priceBlock;
    }

    private static getQuantityBlock(count: number, stock: number) {
        const quantityBlock = ElementsFactory.createDivElement('cart-quantity');
        const quantityButtonsContainer = ElementsFactory.createDivElement('quantity-buttons-container');
        const quantity = ElementsFactory.createBaseElementWithText('p', 'item-quantity', String(count));
        const increaseButton = ElementsFactory.createDivElement('item-increase-button');
        const reduceButton = ElementsFactory.createDivElement('item-reduce-button');
        const stockBlock = ElementsFactory.createBaseElementWithText('p', 'item-stock', `Stock: ${String(stock)}`);
        quantityButtonsContainer.append(reduceButton, quantity, increaseButton);
        quantityBlock.append(quantityButtonsContainer, stockBlock);
        return quantityBlock;
    }

    private static getSubtotalBlock(subtotal: number) {
        return ElementsFactory.createBaseElementWithText(
            'div',
            'cart-item-subtotal',
            `${appConstants.currency + subtotal.toFixed(2)}`
        );
    }

    private static getDeleteBlock() {
        return ElementsFactory.createDivElement('item-delete-button');
    }
}
