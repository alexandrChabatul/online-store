import { CartProduct, PromoCode } from 'common/types';

export default class CalculationService {
    getTotalQuantity(cart: CartProduct[]): number {
        if (cart.length === 0) return 0;
        return cart.reduce((acc, el) => acc + el.quantity, 0);
    }

    getPrice(cart: CartProduct[]): number {
        if (cart.length === 0) return 0;
        const price = cart.reduce((acc, el) => acc + el.subtotal, 0);
        return parseFloat(price.toFixed(2));
    }

    getDiscount(promoCodes: PromoCode[]): number {
        if (promoCodes.length === 0) return 0;
        return promoCodes.reduce((acc, el) => acc + el.value, 0);
    }

    getPriceWithDiscount(price: number, discount: number): number {
        return Math.round(price * (100 - discount)) / 100;
    }
}
