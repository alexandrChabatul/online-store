import appConstants from 'common/constants';
import { IMainParameters, Product } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import './products.scss';
import './products-row-view.scss';

export class Catalog {
    products: HTMLElement;

    constructor() {
        this.products = ElementsFactory.createDivElement('products-block');
    }

    public createProductsCatalog(data: Product[], filters: IMainParameters): HTMLElement {
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

        data.forEach((el: Product) => this.createProductItem(el));
        return this.products;
    }

    private createProductItem(product: Product) {
        const productContainer = ElementsFactory.createDivElement('product-item');
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
        productContainer.append(productImage, productElements);
        productElements.append(productName, productInfo, addToCartButton);
        productInfo.append(productPrice, productDescription);
        productDescription.append(productDescriptionTitle, productDescriptionContent);
        productPrice.append(productPriceOriginal, productPriceFinal);
        this.products.append(productContainer);

        addToCartButton.addEventListener('click', (e) => {
            this.addToCart(e);
        });
    }

    private setImage(link: string, element: HTMLElement) {
        try {
            const img = new Image();
            img.src = link;
            img.onload = () => {
                element.style.backgroundImage = `url('${img.src}')`;
            };
        } catch (e) {
            console.log(e);
        }
    }

    public setView(view: string) {
        view === 'row' ? this.products.classList.add('row-view') : this.products.classList.remove('row-view');
    }

    public addToCart(e: Event) {
        if (e.target instanceof HTMLButtonElement) {
            if (e.target.classList.contains('in-cart')) {
                e.target.textContent = 'Add to Cart';
            } else {
                e.target.textContent = 'Remove';
            }
            e.target.classList.toggle('in-cart');
        }
    }
}
