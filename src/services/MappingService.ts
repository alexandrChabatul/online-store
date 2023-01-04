import { CartResponse, Product, ProductResponse, ProductIsInCart } from 'common/types';
import CartModel from 'model/CartModel';

export default class MappingService {
    private static instance: MappingService;
    private cartModel: CartModel = CartModel.getInstance();

    public static getInstance(): MappingService {
        if (!MappingService.instance) {
            MappingService.instance = new MappingService();
        }
        return MappingService.instance;
    }

    mapFromProductResponseToProduct(productResponse: ProductResponse): Product {
        const currentPrice = Math.ceil(productResponse.price * (100 - productResponse.discountPercentage)) / 100;
        return Object.assign(productResponse, { currentPrice: currentPrice });
    }

    mapFromCartResponseToCartProduct(cartResponse: CartResponse, index: number) {
        const subtotal = parseFloat((cartResponse.product.currentPrice * cartResponse.quantity).toFixed(2));
        return Object.assign(cartResponse, { subtotal: subtotal, index: index });
    }

    mapFromProductToProductIsInCart(product: ProductResponse): ProductIsInCart {
        const productWithPrice = this.mapFromProductResponseToProduct(product);
        return Object.assign(productWithPrice, { isInCart: this.cartModel.checkItem(product.id) });
    }
}
