import { CartProduct, CartSummary, PromoCode } from 'common/types';

export default class CalculationService {
    static getCartSummary(cart: CartProduct[], promoCodes: PromoCode[]): CartSummary {
        const init: CartSummary = { productQty: 0, totalPrice: 0, prevPrice: 0 };
        const result = cart.reduce((acc, el) => {
            acc.productQty += el.quantity;
            acc.prevPrice = parseFloat((acc.prevPrice + el.currentPrice * el.quantity).toFixed(2));
            return acc;
        }, init);

        let totalDiscount = 0;
        const codes = CalculationService.cleanPromoCodes(promoCodes);
        if (codes.length > 0) {
            totalDiscount = codes.reduce((acc, el) => {
                acc += el.value;
                return acc;
            }, 0);
        }
        result.totalPrice = parseFloat((result.prevPrice * (1 - totalDiscount / 100)).toFixed(2));
        return result;
    }

    private static cleanPromoCodes(codes: PromoCode[]): PromoCode[] {
        if (codes.length >= 2) {
            const init: { [key: string]: number } = {};
            const codesObj = codes.reduce((acc, el) => {
                acc[el.name] = el.value;
                return acc;
            }, init);
            return Object.entries(codesObj).map(
                (el): PromoCode => {
                    return { name: el[0], value: el[1] };
                }
            );
        }
        return codes;
    }
}
