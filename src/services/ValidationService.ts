import appConstants from 'common/constants';
import { CartResponse, PromoCode } from 'common/types';

export default class ValidationService {
    checkName(name: string) {
        const parts = name.split(' ');
        if (parts.length < 2) return false;

        const pattern = new RegExp(appConstants.formPatterns.name);
        parts.forEach((el) => {
            if (!pattern.test(el)) return false;
        });
        return true;
    }

    checkPhone(phone: string) {
        const pattern = new RegExp(appConstants.formPatterns.phone);
        return pattern.test(phone);
    }

    checkAddress(address: string) {
        const parts = address.split(' ');
        if (parts.length < 3) return false;

        const pattern = new RegExp(appConstants.formPatterns.address);
        parts.forEach((el) => {
            if (!pattern.test(el)) return false;
        });
        return true;
    }

    checkEmail(email: string) {
        const pattern = new RegExp(appConstants.formPatterns.email);
        return pattern.test(email);
    }

    checkCardNumber(card: string) {
        const pattern = new RegExp(appConstants.formPatterns.card);
        return pattern.test(card);
    }

    checkCardDate(date: string) {
        const pattern = new RegExp(appConstants.formPatterns.date);
        return pattern.test(date);
    }

    checkCardCvv(cvv: string) {
        const pattern = new RegExp(appConstants.formPatterns.cvv);
        return pattern.test(cvv);
    }

    checkCartResponse(response: CartResponse[]): boolean {
        if (!Array.isArray(response)) {
            return false;
        }
        for (const element of response) {
            if (!element.id || !element.quantity) {
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
            if (!element.name || !element.value) {
                console.error('Wrong format of promo codes data.');
                return false;
            }
        }
        return true;
    }

    getProvider(card: string): string | undefined {
        const result = undefined;
        if (card.length < 1) return result;
        const providers: { [key: string]: string } = appConstants.cardProviders;
        return providers[card[0]];
    }
}
