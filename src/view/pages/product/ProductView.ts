import { BadResponse, Product, ProductIsInCart } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';
import ImageSlider from './image-slider/ImageSlider';
import ProductButtons from './product-description/buttons-block/ProductButtons';
import ProductDescription from './product-description/description-block/ProductDescription';
import ProductPrice from './product-description/price-block/ProductPrice';
import ProductTitle from './product-title/ProductTitle';
import ErrorImage from 'assets/images/not-found.png';
import './product.scss';

class ProductView {
    imageSlider: ImageSlider = new ImageSlider();
    productDesc: ProductDescription = new ProductDescription();
    productTitle: ProductTitle = new ProductTitle();
    productPrice: ProductPrice = new ProductPrice();
    productButtons: ProductButtons = new ProductButtons();
    breadcrumbs: Breadcrumbs = new Breadcrumbs();

    renderProduct(product: ProductIsInCart) {
        const productWrapper = ElementsFactory.createDivElement('wrapper product-wrapper');
        const breadcrumbsUl = this.breadcrumbs.getBreadcrumbs(product);
        const productBlock = ElementsFactory.createDivElement('product');
        const titleImageContainer = this.getTitleAndImageBlock(product);
        const priceDescContainer = this.getPriceAndDescBlock(product);
        productBlock.append(titleImageContainer, priceDescContainer);
        productWrapper.append(breadcrumbsUl, productBlock);
        return productWrapper;
    }

    renderError(response: BadResponse) {
        const productWrapper = ElementsFactory.createDivElement('wrapper product-wrapper');
        const errorMessage = ElementsFactory.createBaseElementWithText('div', 'product-error', response.errorMessage);
        const errorImageContainer = ElementsFactory.createDivElement('error-image-container');
        const errorImage = new Image();
        errorImage.src = ErrorImage;
        errorImageContainer.append(errorImage);
        productWrapper.append(errorMessage, errorImageContainer);
        return productWrapper;
    }

    getTitleAndImageBlock(product: Product) {
        const titleImageContainer = ElementsFactory.createDivElement('title-image-container');
        const productTitleBlock = this.productTitle.getProductTitle(product.title, product.rating);
        const imageSliderBlock = this.imageSlider.getImageSlider(product.thumbnail, product.images, product.title);
        titleImageContainer.append(productTitleBlock, imageSliderBlock);
        return titleImageContainer;
    }

    getPriceAndDescBlock(product: ProductIsInCart) {
        const productDescription = ElementsFactory.createDivElement('product-description');
        const productPriceBlock = this.productPrice.getProductPriceBlock(
            product.price,
            product.currentPrice,
            product.discountPercentage
        );
        const productButtonsBlock = this.productButtons.getButtonsBlock(product.id, product.isInCart);
        const productDescBlock = this.productDesc.getDescription(product);
        productDescription.append(productPriceBlock, productButtonsBlock, productDescBlock);
        return productDescription;
    }
}

export default ProductView;
