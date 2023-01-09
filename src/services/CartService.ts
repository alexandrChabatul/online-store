import appConstants from 'common/constants';
import { CartInfo, CartParams, CartProduct, CartSummary, params, PromoCode } from 'common/types';
import CartModel from 'model/CartModel';
import CatalogModel from 'model/CatalogModel';
import PromoCodesModel from 'model/PromoCodesModel';
import CalculationService from './CalculationService';
import MappingService from './MappingService';
import PaginationService from './PaginationService';

export default class CartService {
    private cartModel: CartModel = CartModel.getInstance();
    private mapper: MappingService = new MappingService();
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

    setPageParams(params: params): void {
        this.setLimit(appConstants.cartParams.itemPerPage);
        if (params.limit) {
            this.setLimit(isNaN(parseInt(params.limit, 10)) ? this.cartModel.limit : parseInt(params.limit, 10));
        }
        this.setPage(1);
        if (params.page) {
            this.setPage(isNaN(parseInt(params.page, 10)) ? this.cartModel.page : parseInt(params.page, 10));
        }
    }

    getCartItems(): CartProduct[] {
        return this.cartModel.getCart().map((el, index) => this.mapper.mapFromCartResponseToCartProduct(el, index + 1));
    }

    getCartPageAndParams(
        page: number,
        limit: number,
        cartProducts?: CartProduct[]
    ): { productsPage: CartProduct[]; cartParams: CartParams } {
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

    getPromoCodes(): PromoCode[] {
        return this.codesModel.getAppliedCodes();
    }

    getCartSummary(codes: PromoCode[], cartProducts?: CartProduct[]): CartSummary {
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

    checkItemInCart(id: string): boolean {
        return this.cartModel.checkItem(id);
    }

    addItemToCart(id: string): void {
        const products = this.catalogModel.getProducts();
        const potentialProduct = products.find((el) => String(el.id) === id);
        if (!potentialProduct) return;
        this.cartModel.increaseItem(this.mapper.mapFromProductResponseToProduct(potentialProduct));
    }

    reduceItemInCart(id: string): void {
        this.cartModel.reduceItem(id);
    }

    deleteItemFromCart(id: string): void {
        this.cartModel.deleteItem(id);
    }

    cleanCart(): void {
        this.cartModel.cleanCart();
    }

    getPage(): number {
        return this.cartModel.page;
    }

    setPage(page: number): void {
        this.cartModel.page = page;
    }

    getLimit(): number {
        return this.cartModel.limit;
    }

    setLimit(limit: number): void {
        this.cartModel.limit = limit === 0 ? this.cartModel.limit : Math.abs(limit);
    }

    getPopupState(): boolean {
        return this.cartModel.popupState;
    }

    setPopupState(state: boolean): void {
        this.cartModel.popupState = state;
    }
}
