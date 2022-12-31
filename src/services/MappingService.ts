import { CartResponse, Product, ProductResponse, ProductIsInCart } from 'common/types';
import dataAnswer from 'assets/tempData/data.json';

export default class MappingService {
    private static instance: MappingService;
    data = dataAnswer.products;

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

    mapFromProductToProductIsInCart(cartResponse: CartResponse[], product: ProductResponse): ProductIsInCart {
        const productWithPrice = this.mapFromProductResponseToProduct(product);
        const target = cartResponse.find((el) => el.product.id === productWithPrice.id);
        if (target) {
            return Object.assign(productWithPrice, { isInCart: true });
        }
        return Object.assign(productWithPrice, { isInCart: false });
    }
}
