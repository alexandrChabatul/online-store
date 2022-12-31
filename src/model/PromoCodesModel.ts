import appConstants from 'common/constants';
import { PromoCode } from 'common/types';
import StorageService from 'services/StorageService';
import ValidationService from 'services/ValidationService';

export default class PromoCodesModel {
    private static instance: PromoCodesModel;
    private storageService: StorageService<PromoCode[]> = new StorageService<PromoCode[]>();
    private validationService: ValidationService = new ValidationService();
    private static PATH: string = appConstants.localStorage.codes;

    public static getInstance(): PromoCodesModel {
        if (!PromoCodesModel.instance) {
            PromoCodesModel.instance = new PromoCodesModel();
        }
        return PromoCodesModel.instance;
    }

    getAppliedCodes(): PromoCode[] {
        const promoResponse = this.storageService.getItem(PromoCodesModel.PATH);
        if (!promoResponse) return [];
        return this.validationService.checkPromoCodeResponse(promoResponse) ? this.cleanPromoCodes(promoResponse) : [];
    }

    setPromoCode(code: PromoCode) {
        const codes = this.getAppliedCodes();
        const potentialCode = codes.find((el) => el.name === code.name);
        if (!potentialCode) {
            codes.push(code);
            this.storageService.setItem(PromoCodesModel.PATH, codes);
        }
    }

    deleteItem(code: PromoCode) {
        let codes = this.getAppliedCodes();
        codes = codes.filter((el) => el.name !== code.name);
        this.storageService.setItem(PromoCodesModel.PATH, codes);
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
