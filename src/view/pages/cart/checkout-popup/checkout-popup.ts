import './checkout-popup.scss';
import { NewElement } from '../../../../utils/element-generator';
import { PersonalDetails } from './personal-details/personal-details';
import { CardDetails } from './card-details/card-details';
import visa from './../../../../assets/icons/visa.svg';
import mastercard from './../../../../assets/icons/mastercard.svg';
import amex from './../../../../assets/icons/amex.svg';
import defaultCard from './../../../../assets/icons/card.svg';

export default class CheckoutPopup {
    personalDetails: PersonalDetails;
    cardDetails: CardDetails;
    confirmButton: HTMLButtonElement;

    constructor() {
        this.personalDetails = new PersonalDetails();
        this.cardDetails = new CardDetails();
        this.confirmButton = NewElement.createButton('confirm-button', 'Confirm');
    }

    public createCheckoutPopup(): HTMLElement {
        const popup = NewElement.createBaseElement('div', 'checkout-popup');
        const personalDetailsBlock = this.personalDetails.createPersonalDetailsBlock();
        const cardDetailsBlock = this.cardDetails.createCardDetailsBlock();
        popup.append(personalDetailsBlock, cardDetailsBlock, this.confirmButton);

        return popup;
    }

    public markInvalid(field: HTMLElement, error: HTMLElement): void {
        field.classList.add('popup-field-invalid');
        error.classList.add('error-message-visible');
    }

    public markValid(field: HTMLElement, error: HTMLElement): void {
        field.classList.remove('popup-field-invalid');
        error.classList.remove('error-message-visible');
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
}
