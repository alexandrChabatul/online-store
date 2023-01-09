import { Product } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';
import './product-description.scss';

class ProductDescription {
    getDescription(product: Product): HTMLDivElement {
        const descriptionBlock = ElementsFactory.createDivElement('product-desc');
        let html = '';
        if (product.category) {
            html += `<p class="product-desc__name">Category: <span class="product-desc__value">${product.category.toLowerCase()}</span></p>`;
        }
        if (product.brand) {
            html += `<p class="product-desc__name">Brand: <span class="product-desc__value">${product.brand}</span></p>`;
        }
        if (product.stock) {
            html += `<p class="product-desc__name">Stock: <span class="product-desc__value">${product.stock}</span></p>`;
        }
        if (product.description) {
            html += `<p class="product-desc__name">Description:</p><p class="product-desc__value">${
                product.description[0].toUpperCase() + product.description.slice(1)
            }</p>`;
        }
        descriptionBlock.innerHTML = html;

        return descriptionBlock;
    }
}

export default ProductDescription;
