import appConstants from '../../../../../common/constants';
import { NewElement } from '../../../../../utils/element-generator';
import './product-price.scss';

class ProductPrice {
    getProductPriceBlock(price: number, discount: number) {
        const container = NewElement.createDivElement('price-info');
        const priceBlock = NewElement.createDivElement('price-info__price');
        priceBlock.innerHTML = `<p class="price-info__prev">${price} ${
            appConstants.currency
        }</p><p class="price-info__title">Price: <span class="price-info__real">${this.getPriceWithDiscount(
            price,
            discount
        )} ${appConstants.currency}</span></p>`;
        const discountBlock = NewElement.createDivElement('price-info__discount');
        discountBlock.innerHTML = `<p class="price-info__title">Discount:</p><p class="price-info__discount">${discount}%</p>`;
        container.append(priceBlock);
        container.append(discountBlock);
        // container.append(priceBlock, discountBlock);
        return container;
    }

    private getPriceWithDiscount(price: number, discount: number) {
        return ((price * (100 - discount)) / 100).toFixed(2);
    }
}

export default ProductPrice;
