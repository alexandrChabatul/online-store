import './checkout-popup.scss';
import { ElementsFactory } from 'utils/element-generator';
import { PersonalDetails } from './personal-details/personal-details';
import { CardDetails } from './card-details/card-details';
import visa from 'assets/icons/visa.svg';
import mastercard from 'assets/icons/mastercard.svg';
import amex from 'assets/icons/amex.svg';
import defaultCard from 'assets/icons/card.svg';

export default class CheckoutPopup {
    wrapper: HTMLDivElement;
    popup: HTMLElement;
    personalDetails: PersonalDetails;
    cardDetails: CardDetails;
    confirmButton: HTMLButtonElement;

    constructor() {
        this.wrapper = ElementsFactory.createDivElement('popup-wrapper');
        this.popup = ElementsFactory.createBaseElement('form', 'checkout-popup');
        this.personalDetails = new PersonalDetails();
        this.cardDetails = new CardDetails();
        this.confirmButton = ElementsFactory.createButton('confirm-button', 'Confirm');
        this.confirmButton.type = 'submit';
        this.wrapper.append(this.popup);
        this.wrapper.addEventListener('click', this.deleteBlock.bind(this, this.wrapper, this.popup));
    }

    public createCheckoutPopup(): HTMLDivElement {
        this.popup.innerHTML = '';
        const personalDetailsBlock = this.personalDetails.createPersonalDetailsBlock();
        const cardDetailsBlock = this.cardDetails.createCardDetailsBlock();
        this.popup.append(personalDetailsBlock, cardDetailsBlock, this.confirmButton);
        return this.wrapper;
    }

    public selectCardImage(card: string): void {
        switch (card) {
            case 'visa':
                this.cardDetails.cardImage.style.backgroundImage = `url(${visa})`;
                break;
            case 'mastercard':
                this.cardDetails.cardImage.style.backgroundImage = `url(${mastercard})`;
                break;
            case 'amex':
                this.cardDetails.cardImage.style.backgroundImage = `url(${amex})`;
                break;
            default:
                this.cardDetails.cardImage.style.backgroundImage = `url(${defaultCard})`;
                break;
        }
    }

    private deleteBlock(wrapper: HTMLElement, popup: HTMLElement, e: Event) {
        const target = e.target;
        if (!target) return null;
        if (!popup.contains(target as Node)) {
            wrapper.remove();
        }
    }
}
