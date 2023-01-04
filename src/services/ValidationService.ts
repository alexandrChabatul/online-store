import { CartResponse, PromoCode } from 'common/types';

export default class ValidationService {
    checkCartResponse(response: CartResponse[]): boolean {
        if (!Array.isArray(response)) {
            return false;
        }
        for (const element of response) {
            if (!element.product || !element.quantity) {
                console.error('Wrong format of cart data.');
                return false;
            }
        }
        return true;
    }

    checkPromoCodeResponse(response: PromoCode[]): boolean {
        if (!Array.isArray(response)) {
            return false;
        }
        for (const element of response) {
            if (!element.name || !element.value || !element.code) {
                console.error('Wrong format of promo codes data.');
                return false;
            }
        }
        return true;
    }
}
