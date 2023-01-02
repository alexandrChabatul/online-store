import appConstants from 'common/constants';
import { CartInfo, CartProduct, params, PromoCode } from 'common/types';
import CartModel from 'model/CartModel';
import CatalogModel from 'model/CatalogModel';
import PromoCodesModel from 'model/PromoCodesModel';
import CalculationService from './CalculationService';
import MappingService from './MappingService';
import PaginationService from './PaginationService';

export default class CartService {
    private page: number = 1;
    private limit: number = appConstants.cartParams.itemPerPage;
    private cartModel: CartModel = CartModel.getInstance();
    private mapper: MappingService = MappingService.getInstance();
    private codesModel: PromoCodesModel = PromoCodesModel.getInstance();
    private calculationService: CalculationService = new CalculationService();
    private catalogModel: CatalogModel = CatalogModel.getInstance();

    getCartInfo(params?: params): CartInfo {
        if (params) this.setPageParams(params);
        const cartProducts = this.getCartItems();
        const { productsPage, cartParams } = this.getCartPageAndParams(this.page, this.limit, cartProducts);
        const codes = this.getPromoCodes();
        const summary = this.getCartSummary(cartProducts, codes);
        return {
            products: productsPage,
            params: cartParams,
            summary: summary,
            promoCodes: codes,
        };
    }

    setPageParams(params: params) {
        this.limit = 3;
        if (params.limit) {
            this.limit = isNaN(parseInt(params.limit, 10)) ? this.limit : parseInt(params.limit, 10);
        }
        this.page = 1;
        if (params.page) {
            this.page = isNaN(parseInt(params.page, 10)) ? this.page : parseInt(params.page, 10);
        }
    }

    getCartItems() {
        return this.cartModel.getCart().map((el, index) => this.mapper.mapFromCartResponseToCartProduct(el, index + 1));
    }

    getCartPageAndParams(page: number, limit: number, cartProducts?: CartProduct[]) {
        if (!cartProducts){
            cartProducts = this.getCartItems();
        }
        const pageItemsAndParams = PaginationService.getPage<CartProduct>(cartProducts, page, limit);
        this.page = pageItemsAndParams.page;
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

    addItemToCart(id: string){
        const products = this.catalogModel.getProducts();
        const potentialProduct = products.find(el => String(el.id) === id);
        if (!potentialProduct) return null;
        this.cartModel.increaseItem(this.mapper.mapFromProductResponseToProduct(potentialProduct));
    }

    reduceItemInCart(id: string) {
        this.cartModel.reduceItem(id);
    }

    deleteItemFromCart(id: string){
        this.cartModel.deleteItem(id);
    }

}
