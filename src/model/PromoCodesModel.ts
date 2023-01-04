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
        const potentialCode = codes.find((el) => el.code === code.code);
        if (!potentialCode) {
            codes.push(code);
            this.storageService.setItem(PromoCodesModel.PATH, codes);
        }
    }

    deleteItem(code: PromoCode) {
        let codes = this.getAppliedCodes();
        codes = codes.filter((el) => el.code !== code.code);
        this.storageService.setItem(PromoCodesModel.PATH, codes);
    }

    private cleanPromoCodes(codes: PromoCode[]): PromoCode[] {
        if (codes.length > 1) {
            const init: { [key: string]: { name: string; value: number } } = {};
            const codesObj = codes.reduce((acc, el) => {
                acc[el.code] = { name: el.name, value: el.value };
                return acc;
            }, init);
            return Object.entries(codesObj).map(
                (el): PromoCode => {
                    return Object.assign(el[1], { code: el[0] });
                }
            );
        }
        return codes;
    }
}
