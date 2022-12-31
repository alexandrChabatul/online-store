import appConstants from 'common/constants';
import { CartInfo, CartProduct, params, PromoCode } from 'common/types';
import CartModel from 'model/CartModel';
import PromoCodesModel from 'model/PromoCodesModel';
import CalculationService from './CalculationService';
import MappingService from './MappingService';
import PaginationService from './PaginationService';

export default class CartService {
    private cartModel: CartModel = CartModel.getInstance();
    private mapper: MappingService = MappingService.getInstance();
    private codesModel: PromoCodesModel = PromoCodesModel.getInstance();
    private calculationService: CalculationService = new CalculationService();

    getCartInfo(params: params): CartInfo {
        const { limit, page } = this.getPageParams(params);
        const cartProducts = this.getCartItems();
        const { productsPage, cartParams } = this.getCartPageAndParams(cartProducts, page, limit);
        const codes = this.getPromoCodes();
        const summary = this.getCartSummary(cartProducts, codes);
        return {
            products: productsPage,
            params: cartParams,
            summary: summary,
            promoCodes: codes,
        };
    }

    getPageParams(params: params) {
        let limit = appConstants.cartParams.itemPerPage;
        if (params.limit) {
            limit = isNaN(parseInt(params.limit, 10)) ? limit : parseInt(params.limit, 10);
        }
        let page = 1;
        if (params.page) {
            page = isNaN(parseInt(params.page, 10)) ? page : parseInt(params.page, 10);
        }
        return { limit: limit, page: page };
    }

    getCartItems() {
        return this.cartModel.getCart().map((el, index) => this.mapper.mapFromCartResponseToCartProduct(el, index + 1));
    }

    getCartPageAndParams(cartProducts: CartProduct[], page: number, limit: number) {
        const pageItemsAndParams = PaginationService.getPage<CartProduct>(cartProducts, page, limit);
        return {
            productsPage: pageItemsAndParams.items,
            cartParams: {
                itemsPerPage: pageItemsAndParams.itemsPerPage,
                page: pageItemsAndParams.page,
                numOfPages: pageItemsAndParams.numOfPages,
            },
        };
    }

    getPromoCodes() {
        return this.codesModel.getAppliedCodes();
    }

    getCartSummary(cartProducts: CartProduct[], codes: PromoCode[]) {
        const discount = this.calculationService.getDiscount(codes);
        const quantity = this.calculationService.getTotalQuantity(cartProducts);
        const price = this.calculationService.getPrice(cartProducts);
        const priceWithDiscount = this.calculationService.getPriceWithDiscount(price, discount);
        return {
            productQty: quantity,
            prevPrice: price,
            totalPrice: priceWithDiscount,
        };
    }
}
