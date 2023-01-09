import appConstants from 'common/constants';
import { PotentialPromoCode, PromoCode } from 'common/types';
import PromoCodesModel from 'model/PromoCodesModel';

export default class PromoCodeService {
    private codesModel: PromoCodesModel = PromoCodesModel.getInstance();
    private codes: PromoCode[] = appConstants.promoCodes;

    getPromoCodes() {
        return this.codesModel.getAppliedCodes();
    }

    checkPromoCode(code: string): PotentialPromoCode | null {
        const potentialCode = this.codes.find((el) => el.code.toLowerCase() === code.toLowerCase());
        if (!potentialCode) return null;
        const appliedCodes = this.getPromoCodes();
        const isInApplies = Boolean(appliedCodes.find((el) => el.code.toLowerCase() === code.toLowerCase()));
        return Object.assign(potentialCode, { isActive: isInApplies });
    }

    addPromoCode(code: string) {
        const potentialCode = this.codes.find((el) => el.code.toLowerCase() === code.toLowerCase());
        if (potentialCode) this.codesModel.setPromoCode(potentialCode);
    }

    deletePromoCode(code: string) {
        const potentialCode = this.codes.find((el) => el.code.toLowerCase() === code.toLowerCase());
        if (potentialCode) this.codesModel.deleteItem(potentialCode);
    }

    deleteAllCodes() {
        this.codesModel.deleteAllCodes();
    }
}
