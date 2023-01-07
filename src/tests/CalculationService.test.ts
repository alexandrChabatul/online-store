import { CartProduct, Product } from 'common/types';
import CalculationService from 'services/CalculationService';

describe('Calculation service', () => {
    const calculationService = new CalculationService();

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
        currentPrice: 9000,
    };
    const cartProduct: CartProduct = {
        product: product,
        quantity: 10,
        subtotal: 9000,
        index: 1,
    };

    const code = { code: 'test', name: 'test', value: 10 };

    const cart = [cartProduct, Object.assign({}, cartProduct), Object.assign({}, cartProduct)];
    const codes = [code, Object.assign({}, code), Object.assign({}, code)];

    describe('Get quality method', () => {
        test('Should return products quality in cart', () => {
            const quality = calculationService.getTotalQuantity(cart);
            expect(quality).toBe(30);
        });
    });
    describe('Get price method', () => {
        test('Should return summary price of products in cart', () => {
            const price = calculationService.getPrice(cart);
            expect(price).toBe(27000);
        });
    });
    describe('Get discount method', () => {
        test('Should return correct summary discount of promo codes', () => {
            const discount = calculationService.getDiscount(codes);
            expect(discount).toBe(30);
        });
    });
    describe('Get price with discount method', () => {
        test('Should return correct price of cart goods with discount', () => {
            const price = calculationService.getPriceWithDiscount(1000, 10);
            expect(price).toBe(900);
        });
    });
});
