import appConstants from 'common/constants';
import { CartResponse, Product } from 'common/types';
import StorageService from 'services/StorageService';
import ValidationService from 'services/ValidationService';

export default class CartModel {
    private static instance: CartModel;
    private storageService: StorageService<CartResponse[]> = new StorageService<CartResponse[]>();
    private static PATH: string = appConstants.localStorage.cart;
    private validationService: ValidationService = new ValidationService();
    private cart: CartResponse[];
    page = 1;
    limit: number = appConstants.cartParams.itemPerPage;
    popupState = false;

    private constructor() {
        this.cart = this.setCart();
    }

    public static getInstance(): CartModel {
        if (!CartModel.instance) {
            CartModel.instance = new CartModel();
        }
        return CartModel.instance;
    }

    setCart() {
        const cartResponse = this.storageService.getItem(CartModel.PATH);
        if (!cartResponse) return [];
        return this.validationService.checkCartResponse(cartResponse) ? cartResponse : [];
    }

    getCart() {
        return this.cart;
    }

    checkItem(id: number) {
        const potentialItem = this.cart.find((el) => el.product.id === id);
        return Boolean(potentialItem);
    }

    increaseItem(product: Product) {
        const potentialItem = this.cart.find((el) => el.product.id === product.id);
        if (potentialItem) {
            potentialItem.quantity =
                potentialItem.product.stock > potentialItem.quantity
                    ? (potentialItem.quantity += 1)
                    : potentialItem.quantity;
        } else {
            this.cart.push({ product: product, quantity: 1 });
        }
        this.storageService.setItem(CartModel.PATH, this.cart);
    }

    reduceItem(itemId: string) {
        const potentialItem = this.cart.find((el) => String(el.product.id) === itemId);
        if (potentialItem) {
            potentialItem.quantity -= 1;
        }
        if (potentialItem?.quantity === 0) {
            this.deleteItem(itemId);
        }
        this.storageService.setItem(CartModel.PATH, this.cart);
    }

    deleteItem(itemId: string) {
        this.cart = this.cart.filter((el) => String(el.product.id) !== itemId);
        this.storageService.setItem(CartModel.PATH, this.cart);
    }

    cleanCart() {
        this.cart = [];
        this.storageService.setItem(CartModel.PATH, this.cart);
    }
}
