import appConstants from 'common/constants';
import CartService from 'services/CartService';
import PromoCodeService from 'services/PromoCodeService';
import { ElementsFactory } from 'utils/element-generator';
import BasePage from 'view/common-components/BasePage';
import CartView from 'view/pages/cart/CartView';

export default class PopupHandler {
    basePage: BasePage;
    view: CartView;
    cartService: CartService;
    codeService: PromoCodeService;

    constructor(view: CartView, cartService: CartService) {
        this.codeService = new PromoCodeService();
        this.basePage = BasePage.getInstance();
        this.view = view;
        this.cartService = cartService;
    }

    initEvents() {
        this.view.popup.popup.addEventListener('focusout', this.popupFocusoutHandler.bind(this));
        this.view.popup.popup.oninput = this.popupInputHandler.bind(this);
        this.view.popup.confirmButton.onclick = this.buyHandler.bind(this);
    }

    popupFocusoutHandler(e: Event): void {
        const target = e.target;
        if (!target || !(target instanceof HTMLInputElement)) return;
        this.markInvalidInput(target);
    }

    popupInputHandler(e: Event) {
        const target = e.target;
        if (!target || !(target instanceof HTMLInputElement)) return;
        this.markValidInput(target);
        if (target.dataset.name === 'card-number' && target.value.length > 0) {
            const providers: { [key: string]: string } = appConstants.cardProviders;
            this.view.popup.selectCardImage(providers[target.value[0]]);
        }
    }

    buyHandler(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const form = target.parentElement as HTMLFormElement;
        if (form.checkValidity()) {
            this.createAlert();
            return;
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

    private createAlert() {
        const timer = 3;
        setTimeout(() => {
            const link = ElementsFactory.createAnchor('', 'router-link', '/');
            link.click();
        }, timer * 1000);
        this.view.hidePopup();
        this.view.showBuyMessage(timer);
        this.cartService.cleanCart();
        this.codeService.deleteAllCodes();
        const cartInfo = this.cartService.getCartInfo();
        this.basePage.updateHeader(String(cartInfo.summary.productQty), String(cartInfo.summary.prevPrice));
    }
}
