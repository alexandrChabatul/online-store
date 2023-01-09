import appConstants from 'common/constants';
import { ICatalogSettings, ProductIsInCart } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import './products.scss';
import './products-row-view.scss';
import Rating from 'view/pages/product/product-description/rating/Rating';

export class Catalog {
    products: HTMLElement;

    constructor() {
        this.products = ElementsFactory.createDivElement('products-block');
    }

    public createProductsCatalog(data: ProductIsInCart[], filters: ICatalogSettings): HTMLElement {
        this.products.innerHTML = '';
        this.setView(filters.view);
        if (data.length === 0) {
            const noProductsMessage = ElementsFactory.createBaseElementWithText(
                'div',
                'no-products',
                'No products found. Reset filters or search input'
            );
            this.products.append(noProductsMessage);
            return this.products;
        }

        data.forEach((el: ProductIsInCart) => this.createProductItem(el));
        return this.products;
    }

    private createProductItem(product: ProductIsInCart) {
        const productContainer = ElementsFactory.createDivElement('product-item');
        productContainer.id = `product-${product.id}`;
        const productLink = ElementsFactory.createAnchor('product-link router-link', '', `/product/${product.id}`);
        const productImage = ElementsFactory.createImgElement('product-image', product.thumbnail, product.title);

        const productElements = ElementsFactory.createDivElement('product-elements');
        const productName = ElementsFactory.createAnchor(
            'product-name router-link',
            `${product.title}`,
            `/product/${product.id}`
        );
        const productInfo = ElementsFactory.createDivElement('product-info');
        const productRating = Rating.getRatingBlock(product.rating);
        const productPrice = ElementsFactory.createDivElement('product-price');
        const productPriceOriginal = ElementsFactory.createBaseElementWithText(
            'span',
            'product-price-original',
            `${appConstants.currency}${product.price}`
        );
        const productPriceFinal = ElementsFactory.createBaseElementWithText(
            'span',
            'product-price-final',
            `${appConstants.currency}${product.currentPrice}`
        );
        const productDescription = ElementsFactory.createBaseElement('div', 'product-description-main');
        const productDescriptionTitle = ElementsFactory.createBaseElementWithText(
            'span',
            'product-description-title',
            'Description: '
        );
        const productDescriptionContent = ElementsFactory.createBaseElementWithText(
            'span',
            'product-description-content',
            `${product.description}`
        );
        const addToCartButton = ElementsFactory.createButton('add-button', 'Add to Cart');
        if (product.isInCart) {
            addToCartButton.classList.add('in-cart');
            addToCartButton.textContent = 'Remove';
        }

        productLink.append(productImage);
        productContainer.append(productLink, productElements);
        productElements.append(productName, productInfo, addToCartButton);
        productInfo.append(productPrice, productRating, productDescription);
        productDescription.append(productDescriptionTitle, productDescriptionContent);
        productPrice.append(productPriceOriginal, productPriceFinal);
        this.products.append(productContainer);
    }

    public setView(view: string) {
        view === 'row' ? this.products.classList.add('row-view') : this.products.classList.remove('row-view');
    }
}
