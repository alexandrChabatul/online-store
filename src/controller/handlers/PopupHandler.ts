import appConstants from 'common/constants';
import CartService from 'services/CartService';
import { ElementsFactory } from 'utils/element-generator';
import CartView from 'view/pages/cart/CartView';

export default class PopupHandler {
    view: CartView;
    cartService: CartService;

    constructor(view: CartView, cartService: CartService) {
        this.view = view;
        this.cartService = cartService;
    }

    initEvents() {
        this.view.popupElement.addEventListener('focusout', this.popupFocusoutHandler.bind(this));
        this.view.popupElement.oninput = this.popupInputHandler.bind(this, this.view);
        this.view.popup.confirmButton.onclick = this.buyHandler.bind(this, this.view);
    }

    popupFocusoutHandler(e: Event) {
        const target = e.target;
        if (!target || !(target instanceof HTMLInputElement)) return null;
        this.markInvalidInput(target);
    }

    popupInputHandler(view: CartView, e: Event) {
        const target = e.target;
        if (!target || !(target instanceof HTMLInputElement)) return null;
        this.markValidInput(target);
        if (target.dataset.name === 'card-number' && target.value.length > 0) {
            const providers: { [key: string]: string } = appConstants.cardProviders;
            view.popup.selectCardImage(providers[target.value[0]]);
        }
    }

    buyHandler(view: CartView, e: Event) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const form = target.parentElement as HTMLFormElement;
        if (form.checkValidity()) {
            this.createAlert(view);
            return null;
        }
        const elements = this.getChildElements(form);
        for (const el of elements) {
            if (el.element instanceof HTMLInputElement) {
                this.markInvalidInput(el.element);
            }
        }
    }

    private markInvalidInput(input: HTMLInputElement) {
        const regex = new RegExp(input.pattern);
        if (!regex.test(input.value)) {
            input.classList.add('popup-field-invalid');
            const errorBlock = input.nextSibling;
            if (errorBlock && errorBlock instanceof HTMLDivElement) errorBlock.classList.add('error-message-visible');
        }
    }

    private markValidInput(input: HTMLInputElement) {
        const regex = new RegExp(input.pattern);
        if (regex.test(input.value)) {
            input.classList.remove('popup-field-invalid');
            const errorBlock = input.nextSibling;
            if (errorBlock && errorBlock instanceof HTMLDivElement)
                errorBlock.classList.remove('error-message-visible');
        }
    }

    private getChildElements(element: Element) {
        return [...element.children].reduce(
            (acc, el) => {
                acc.push(...this.getChildElements(el));
                return acc;
            },
            [{ element }]
        );
    }

    private createAlert(view: CartView) {
        const timer = 3;
        setTimeout(() => {
            const link = ElementsFactory.createAnchor('', 'router-link', '/');
            link.click();
        }, timer * 1000);
        view.hidePopup();
        view.showBuyMessage(timer);
        const cartService = new CartService();
        cartService.cleanCart();
    }
}
