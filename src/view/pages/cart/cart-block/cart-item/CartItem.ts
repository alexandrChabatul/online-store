import appConstants from 'common/constants';
import { CartProduct } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import './cart-item.scss';

export default class CartItem {
    static getCartItem(item: CartProduct) {
        const product = item.product;
        const counterBlock = this.getCounterBlock(item.index);
        const imageBlock = this.getImageBlock(product.thumbnail, product.title);
        const descriptionBlock = this.getDescriptionBlock(
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

    private static getImageBlock(imageSrc: string, title: string) {
        const itemImgContainer = ElementsFactory.createDivElement('cart-item__img-container');
        const image = ElementsFactory.createImgElement('', imageSrc, title);
        itemImgContainer.append(image);
        return itemImgContainer;
    }

    private static getDescriptionBlock(title: string, category: string, brand: string, description: string) {
        const descriptionBlock = ElementsFactory.createDivElement('cart-description');
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
        const priceBlock = ElementsFactory.createDivElement('cart-price');
        priceBlock.innerHTML = `<p class="cart-price__prev">${appConstants.currency}${prevPrice}</p><p class="cart-price__real">${appConstants.currency}${currentPrice}</p>`;
        return priceBlock;
    }

    private static getQuantityBlock(count: number, stock: number) {
        const quantityBlock = ElementsFactory.createDivElement('cart-quantity');
        const quantityButtonsContainer = ElementsFactory.createDivElement('quantity-buttons-container');
        const quantity = ElementsFactory.createBaseElementWithText('p', 'item-quantity', String(count));
        // const buttons = ElementsFactory.createDivElement('quantity-buttons');
        const increaseButton = ElementsFactory.createDivElement('increase-button');
        const reduceButton = ElementsFactory.createDivElement('reduce-button');
        const stockBlock = ElementsFactory.createBaseElementWithText('p', 'item-stock', `Stock: ${String(stock)}`);
        // buttons.append(increaseButton, reduceButton);
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
        return ElementsFactory.createDivElement('cart-item-cross');
    }
}
