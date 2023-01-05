import appConstants from 'common/constants';
import { ICatalogSettings, ProductIsInCart } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import './products.scss';
import './products-row-view.scss';
import { ImageLoader } from 'utils/Image-loader';
import placeholder from 'assets/images/product-placeholder.png';

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
        const productImage = ElementsFactory.createAnchor('product-image router-link', '', `/product/${product.id}`);
        this.setImage(product.thumbnail, productImage);
        const productElements = ElementsFactory.createDivElement('product-elements');
        const productName = ElementsFactory.createAnchor(
            'product-name router-link',
            `${product.title}`,
            `/product/${product.id}`
        );
        const productInfo = ElementsFactory.createDivElement('product-info');
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

        productContainer.append(productImage, productElements);
        productElements.append(productName, productInfo, addToCartButton);
        productInfo.append(productPrice, productDescription);
        productDescription.append(productDescriptionTitle, productDescriptionContent);
        productPrice.append(productPriceOriginal, productPriceFinal);
        this.products.append(productContainer);
    }

    private async setImage(link: string, element: HTMLElement) {
        const src = await ImageLoader.loadImage(link);
        element.style.backgroundImage = `url('${src || placeholder}')`;
        // try {
        //     const img = new Image();
        //     img.src = link;
        //     img.onload = () => {
        //         element.style.backgroundImage = `url('${img.src}')`;
        //     };
        // } catch (e) {
        //     console.log(e);
        // }
        // try {
        //     const response = await fetch(link);
        //     if (response.ok) {
        //         const blob = await response.blob();
        //         const src = URL.createObjectURL(blob);
        //         element.style.backgroundImage = `url('${src}')`;
        //     } else {
        //         element.style.backgroundImage = `url('${placeholder}')`;
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    public setView(view: string) {
        view === 'row' ? this.products.classList.add('row-view') : this.products.classList.remove('row-view');
    }
}
