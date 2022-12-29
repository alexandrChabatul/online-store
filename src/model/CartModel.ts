import appConstants from 'common/constants';
import { CartResponse } from 'common/types';

export default class CartModel {
    private static instance: CartModel;
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
        const cartResponse = localStorage.getItem(appConstants.localStorage.cart);
        if (cartResponse) {
            try {
                const result = JSON.parse(cartResponse);
                if (Array.isArray(result)) {
                    result.forEach((element) => {
                        if (!element.id || !element.quantity) {
                            return [];
                        }
                    });
                    return result;
                } else {
                    return [];
                }
            } catch (e: unknown) {
                console.error(e);
            }
        }
        return [];
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
        this.updateCartStorage();
    }

    reduceItem(itemId: number) {
        const potentialItem = this.cart.find((el) => el.id === itemId);
        if (potentialItem) {
            potentialItem.quantity -= 1;
        }
        if (potentialItem?.quantity === 0) {
            this.deleteItem(itemId);
        }
        this.updateCartStorage();
    }

    deleteItem(itemId: number) {
        this.cart = this.cart.filter((el) => el.id !== itemId);
        this.updateCartStorage();
    }

    private updateCartStorage() {
        localStorage.setItem(appConstants.localStorage.cart, JSON.stringify(this.cart));
    }
}
