import appConstants from 'common/constants';
import { CartResponse } from 'common/types';
import StorageService from 'services/StorageService';
import ValidationService from 'services/ValidationService';

export default class CartModel {
    private static instance: CartModel;
    private storageService: StorageService<CartResponse[]> = new StorageService<CartResponse[]>();
    private static PATH: string = appConstants.localStorage.cart;
    private validationService: ValidationService = new ValidationService();
    private cart: CartResponse[];

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

    increaseItem(itemId: number) {
        const potentialItem = this.cart.find((el) => el.id === itemId);
        if (potentialItem) {
            potentialItem.quantity += 1;
        } else {
            this.cart.push({ id: itemId, quantity: 1 });
        }
        this.storageService.setItem(CartModel.PATH, this.cart);
    }

    reduceItem(itemId: number) {
        const potentialItem = this.cart.find((el) => el.id === itemId);
        if (potentialItem) {
            potentialItem.quantity -= 1;
        }
        if (potentialItem?.quantity === 0) {
            this.deleteItem(itemId);
        }
        this.storageService.setItem(CartModel.PATH, this.cart);
    }

    deleteItem(itemId: number) {
        this.cart = this.cart.filter((el) => el.id !== itemId);
        this.storageService.setItem(CartModel.PATH, this.cart);
    }
}
