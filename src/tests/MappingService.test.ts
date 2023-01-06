import MappingService from 'services/MappingService';
import { IProductResponse, ProductResponse, Product, CartResponse } from 'common/types';

jest.mock('model/CartModel.ts', () => {
    const cart = ['1', '2', '3'];
    return {
        getInstance: function () {
            return this;
        },
        checkItem: (id: string) => cart.includes(id),
    };
});

describe('Mapping service', () => {
    const mapper = new MappingService();

    const productResponse: IProductResponse = {
        id: 1,
        title: 'test',
        description: 'test',
        price: 1000,
        discountPercentage: 10,
        rating: 1,
        stock: 1,
        brand: 'test',
        category: 'test',
        thumbnail: 'test',
        images: [],
    };

    const product: Product = {
        id: 1,
        title: 'test',
        description: 'test',
        price: 1000,
        discountPercentage: 10,
        rating: 1,
        stock: 1,
        brand: 'test',
        category: 'test',
        thumbnail: 'test',
        images: [],
        currentPrice: 900,
    };

    describe('Map from product response to product function', () => {
        let testResponse: IProductResponse;

        beforeEach(() => {
            testResponse = productResponse;
        });
        test('Should map from product response to product (positive discount)', () => {
            const result = mapper.mapFromProductResponseToProduct(testResponse as ProductResponse);
            expect(result.currentPrice).toBe(900);
        });
        test('Should map from product response to product (negative discount)', () => {
            testResponse.discountPercentage = -10;
            const result = mapper.mapFromProductResponseToProduct(testResponse as ProductResponse);
            expect(result.currentPrice).toBe(1000);
        });
    });

    describe('Map from cart response to cart product', () => {
        const cartResponse: CartResponse = {
            product: product,
            quantity: 10,
        };
        test('Should return cart product object', () => {
            const result = mapper.mapFromCartResponseToCartProduct(cartResponse, 1);
            expect(result.index).toBe(1);
            expect(result.product).toEqual(product);
            expect(result.quantity).toBe(cartResponse.quantity);
            expect(result.subtotal).toBe(9000);
        });
    });

    describe('Map from product to product is in cart', () => {
        let testResponse: IProductResponse;
        beforeEach(() => {
            testResponse = productResponse;
        });

        test('Should return ProductIsInCart object with true flag if it is in cart', () => {
            const result = mapper.mapFromProductToProductIsInCart(testResponse as ProductResponse);
            expect(result.isInCart).toBeTruthy;
        });
        test('Should return ProductIsInCart object with false flag if it is not in cart', () => {
            testResponse.id = 5;
            const result = mapper.mapFromProductToProductIsInCart(testResponse as ProductResponse);
            expect(result.isInCart).toBeFalsy;
        });
    });
});
