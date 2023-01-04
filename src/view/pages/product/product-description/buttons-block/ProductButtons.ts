import { ElementsFactory } from 'utils/element-generator';
import './product-buttons.scss';

export default class ProductButtons {
    getButtonsBlock(id: number, inCart: boolean) {
        const container = ElementsFactory.createDivElement('product-buttons');
        const cartButton = ElementsFactory.createButton(
            'product-buttons__cart product-button',
            inCart ? 'Remove from cart' : 'Add to cart'
        );
        cartButton.setAttribute('data-cart', String(inCart));
        cartButton.setAttribute('data-id', String(id));
        const buyButton = ElementsFactory.createButton('product-buttons__buy product-button', 'Buy now');
        const buyLink = ElementsFactory.createAnchor('router-link', '', '/cart');
        buyButton.setAttribute('data-cart', String(inCart));
        buyButton.setAttribute('data-id', String(id));
        buyLink.append(buyButton);
        container.append(cartButton, buyLink);
        return container;
    }
}
