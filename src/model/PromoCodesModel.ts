import appConstants from 'common/constants';
import { PromoCode } from 'common/types';

export default class PromoCodesModel {
    private static instance: PromoCodesModel;

    public static getInstance(): PromoCodesModel {
        if (!PromoCodesModel.instance) {
            PromoCodesModel.instance = new PromoCodesModel();
        }
        return PromoCodesModel.instance;
    }

    getAppliedCodes(): PromoCode[] {
        const promoResponse = localStorage.getItem(appConstants.localStorage.codes);
        if (promoResponse) {
            try {
                const result = JSON.parse(promoResponse);
                if (Array.isArray(result)) {
                    result.forEach((element) => {
                        if (!element.name || !element.value) {
                            return [];
                        }
                    });
                    return this.cleanPromoCodes(result);
                } else {
                    return [];
                }
            } catch (e: unknown) {
                console.error(e);
            }
        }
        return [];
    }

    setPromoCode(code: PromoCode) {
        const codes = this.getAppliedCodes();
        const potentialCode = codes.find((el) => el.name === code.name);
        if (!potentialCode) {
            codes.push(code);
            this.updatePromoCodeStorage(codes);
        }
    }

    deleteItem(code: PromoCode) {
        let codes = this.getAppliedCodes();
        codes = codes.filter((el) => el.name !== code.name);
        this.updatePromoCodeStorage(codes);
    }

    private updatePromoCodeStorage(codes: PromoCode[]) {
        localStorage.setItem(appConstants.localStorage.codes, JSON.stringify(codes));
    }

    private cleanPromoCodes(codes: PromoCode[]): PromoCode[] {
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
