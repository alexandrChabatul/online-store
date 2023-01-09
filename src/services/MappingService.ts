import { CartResponse, Product, ProductResponse, ProductIsInCart, CartProduct } from 'common/types';
import CartModel from '../model/CartModel';

export default class MappingService {
    cartModel: CartModel = CartModel.getInstance();

    mapFromProductResponseToProduct(productResponse: ProductResponse): Product {
        const discount = productResponse.discountPercentage > 0 ? productResponse.discountPercentage : 0;
        const currentPrice = Math.ceil(productResponse.price * (100 - discount)) / 100;
        return Object.assign(productResponse, { currentPrice: currentPrice });
    }

    mapFromCartResponseToCartProduct(cartResponse: CartResponse, index: number): CartProduct {
        const subtotal = parseFloat((cartResponse.product.currentPrice * cartResponse.quantity).toFixed(2));
        return Object.assign(cartResponse, { subtotal: subtotal, index: index });
    }

    mapFromProductToProductIsInCart(product: ProductResponse): ProductIsInCart {
        const productWithPrice = this.mapFromProductResponseToProduct(product);
        return Object.assign(productWithPrice, { isInCart: this.cartModel.checkItem(String(product.id)) });
    }
}
