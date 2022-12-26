import appConstants from '../../../../../common/constants';
import { CartProduct } from '../../../../../common/types';
import { NewElement } from '../../../../../utils/element-generator';
import './cart-item.scss';

export default class CartItem {
    static getCartItem(item: CartProduct, index: number) {
        const counterBlock = this.getCounterBlock(index);
        const imageBlock = this.getImageBlock(item.thumbnail, item.title);
        const descriptionBlock = this.getDescriptionBlock(item.title, item.category, item.brand, item.description);
        const priceBlock = this.getPriceBlock(item.price, item.currentPrice);
        const quantityBlock = this.getQuantityBlock(item.quantity, item.stock);
        const subtotalBlock = this.getSubtotalBlock(item.subtotal);
        const deleteBlock = this.getDeleteBlock();
        const cartItem = NewElement.createDivElement('cart-item');
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
        return NewElement.createBaseElementWithText('div', 'cart-item__counter', String(index));
    }

    private static getImageBlock(imageSrc: string, title: string) {
        const itemImgContainer = NewElement.createDivElement('cart-item__img-container');
        const image = NewElement.createImgElement('', imageSrc, title);
        itemImgContainer.append(image);
        return itemImgContainer;
    }

    private static getDescriptionBlock(title: string, category: string, brand: string, description: string) {
        const descriptionBlock = NewElement.createDivElement('cart-description');
        let html = '';
        if (title) {
            html += `<h3 class="cart-description__title">${title}</h3>`;
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
        const priceBlock = NewElement.createDivElement('cart-price');
        priceBlock.innerHTML = `<p class="cart-price__prev">${appConstants.currency}${prevPrice}</p><p class="cart-price__real">${appConstants.currency}${currentPrice}</p>`;
        return priceBlock;
    }

    private static getQuantityBlock(count: number, stock: number) {
        const quantityBlock = NewElement.createDivElement('cart-quantity');
        const quantityButtonsContainer = NewElement.createDivElement('quantity-buttons-container');
        const quantity = NewElement.createBaseElementWithText('p', 'item-quantity', String(count));
        // const buttons = NewElement.createDivElement('quantity-buttons');
        const increaseButton = NewElement.createDivElement('increase-button');
        const reduceButton = NewElement.createDivElement('reduce-button');
        const stockBlock = NewElement.createBaseElementWithText('p', 'item-stock', `Stock: ${String(stock)}`);
        // buttons.append(increaseButton, reduceButton);
        quantityButtonsContainer.append(reduceButton, quantity, increaseButton);
        quantityBlock.append(quantityButtonsContainer, stockBlock);
        return quantityBlock;
    }

    private static getSubtotalBlock(subtotal: number) {
        return NewElement.createBaseElementWithText(
            'div',
            'cart-item-subtotal',
            `${appConstants.currency + subtotal.toFixed(2)}`
        );
    }

    private static getDeleteBlock() {
        return NewElement.createDivElement('cart-item-cross');
    }
}
