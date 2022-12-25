import appConstants from '../../../../common/constants';
import { IMainParameters, Product } from '../../../../common/types';
import { NewElement } from '../../../../utils/element-generator';
import './catalog.scss';
import './catalog-row.scss';

export class Catalog {
    products: HTMLElement;

    constructor() {
        this.products = NewElement.createDivElement('products-block');
    }

    public createCatalog(data: Product[], filters: IMainParameters): HTMLElement {
        this.setView(filters.view);

        data.forEach((el: Product) => {
            const product = NewElement.createDivElement('product-item');
            const productImage = NewElement.createAnchor('product-image router-link', '', `/product/${el.id}`);
            this.setImage(el.thumbnail, productImage);
            const productElements = NewElement.createDivElement('product-elements');
            const productName = NewElement.createAnchor('product-name router-link', `${el.title}`, `/product/${el.id}`);
            const productInfo = NewElement.createDivElement('product-info');
            const productPrice = NewElement.createDivElement('product-price');
            const productPriceOriginal = NewElement.createBaseElementWithText(
                'span',
                'product-price-original',
                `${appConstants.currency}${el.price}`
            );
            const productPriceFinal = NewElement.createBaseElementWithText(
                'span',
                'product-price-final',
                `${appConstants.currency}${el.currentPrice}`
            );
            const productDescription = NewElement.createBaseElement('div', 'product-description-main');
            const productDescriptionTitle = NewElement.createBaseElementWithText(
                'span',
                'product-description-title',
                'Description: '
            );
            const productDescriptionContent = NewElement.createBaseElementWithText(
                'span',
                'product-description-content',
                `${el.description}`
            );
            const AddToCartButton = NewElement.createButton('add-button', 'Add to Cart');
            product.append(productImage, productElements);
            productElements.append(productName, productInfo, AddToCartButton);
            productInfo.append(productPrice, productDescription);
            productDescription.append(productDescriptionTitle, productDescriptionContent);
            productPrice.append(productPriceOriginal, productPriceFinal);
            this.products.append(product);
        });
        return this.products;
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
}
