import appConstants from '../../../../../common/constants';
import { ElementsFactory } from '../../../../../utils/element-generator';
import './product-price.scss';

class ProductPrice {
    getProductPriceBlock(price: number, currentPrice: number, discount: number) {
        const container = ElementsFactory.createDivElement('price-info');
        const priceBlock = ElementsFactory.createDivElement('price-info__price');
        priceBlock.innerHTML = `<p class="price-info__prev">${price} ${appConstants.currency}</p><p class="price-info__title">Price: <span class="price-info__real">${currentPrice} ${appConstants.currency}</span></p>`;
        const discountBlock = ElementsFactory.createDivElement('price-info__discount');
        discountBlock.innerHTML = `<p class="price-info__title">Discount:</p><p class="price-info__discount">${discount}%</p>`;
        container.append(priceBlock);
        container.append(discountBlock);
        // container.append(priceBlock, discountBlock);
        return container;
    }
}

export default ProductPrice;
