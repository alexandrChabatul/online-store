import appConstants from 'common/constants';
import { CartInfo, CartProduct, params, PromoCode } from 'common/types';
import CartModel from 'model/CartModel';
import CatalogModel from 'model/CatalogModel';
import PromoCodesModel from 'model/PromoCodesModel';
import CalculationService from './CalculationService';
import MappingService from './MappingService';
import PaginationService from './PaginationService';

export default class CartService {
    private cartModel: CartModel = CartModel.getInstance();
    private mapper: MappingService = MappingService.getInstance();
    private codesModel: PromoCodesModel = PromoCodesModel.getInstance();
    private calculationService: CalculationService = new CalculationService();
    private catalogModel: CatalogModel = CatalogModel.getInstance();

    getCartInfo(params?: params): CartInfo {
        if (params) this.setPageParams(params);
        const cartProducts = this.getCartItems();
        const { productsPage, cartParams } = this.getCartPageAndParams(
            this.cartModel.page,
            this.cartModel.limit,
            cartProducts
        );
        const codes = this.getPromoCodes();
        const summary = this.getCartSummary(codes, cartProducts);
        return {
            products: productsPage,
            params: cartParams,
            summary: summary,
            promoCodes: codes,
        };
    }

    setPageParams(params: params) {
        this.setLimit(appConstants.cartParams.itemPerPage);
        if (params.limit) {
            this.setLimit(isNaN(parseInt(params.limit, 10)) ? this.cartModel.limit : parseInt(params.limit, 10));
        }
        this.setPage(1);
        if (params.page) {
            this.setPage(isNaN(parseInt(params.page, 10)) ? this.cartModel.page : parseInt(params.page, 10));
        }
    }

    getCartItems() {
        return this.cartModel.getCart().map((el, index) => this.mapper.mapFromCartResponseToCartProduct(el, index + 1));
    }

    getCartPageAndParams(page: number, limit: number, cartProducts?: CartProduct[]) {
        if (!cartProducts) {
            cartProducts = this.getCartItems();
        }
        const pageItemsAndParams = PaginationService.getPage<CartProduct>(cartProducts, page, limit);
        this.setPage(pageItemsAndParams.page);
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

    getCartSummary(codes: PromoCode[], cartProducts?: CartProduct[]) {
        if (!cartProducts) {
            cartProducts = this.getCartItems();
        }
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

    addItemToCart(id: string) {
        const products = this.catalogModel.getProducts();
        const potentialProduct = products.find((el) => String(el.id) === id);
        if (!potentialProduct) return;
        this.cartModel.increaseItem(this.mapper.mapFromProductResponseToProduct(potentialProduct));
    }

    reduceItemInCart(id: string) {
        this.cartModel.reduceItem(id);
    }

    deleteItemFromCart(id: string) {
        this.cartModel.deleteItem(id);
    }

    cleanCart() {
        this.cartModel.cleanCart();
    }

    getPage() {
        return this.cartModel.page;
    }

    setPage(page: number) {
        this.cartModel.page = page;
    }

    getLimit() {
        return this.cartModel.limit;
    }

    setLimit(limit: number) {
        this.cartModel.limit = limit === 0 ? this.cartModel.limit : Math.abs(limit);
    }

    getPopupState() {
        return this.cartModel.popupState;
    }

    setPopupState(state: boolean) {
        this.cartModel.popupState = state;
    }
}
