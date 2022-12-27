import { ElementsFactory } from '../../../../../utils/element-generator';

export class CardDetails {
    cardNumber: HTMLInputElement;
    cardNumberError: HTMLElement;
    cardImage: HTMLElement;
    cardValidness: HTMLInputElement;
    cardValidnessError: HTMLElement;
    cardCVV: HTMLInputElement;
    cardCVVError: HTMLElement;

    constructor() {
        this.cardNumber = ElementsFactory.createInputText('popup-field card-number-field', 'Card Number');
        this.cardNumberError = ElementsFactory.createBaseElementWithText(
            'div',
            'error-message card-number-error',
            'Invalid Card Number'
        );
        this.cardImage = ElementsFactory.createBaseElement('div', 'card-image');
        this.cardValidness = ElementsFactory.createInputNumber('popup-field card-validness-field', '', 'MM/YY');
        this.cardValidness.step = '10';
        this.cardValidnessError = ElementsFactory.createBaseElementWithText(
            'div',
            'error-message card-invalid-error',
            'Invalid date'
        );
        this.cardCVV = ElementsFactory.createInputNumber('popup-field card-cvv-field', '', 'CVV');
        this.cardCVV.step = '10';
        this.cardCVVError = ElementsFactory.createBaseElementWithText('div', 'error-message cvv-error', 'Invalid CVV');
    }

    public createCardDetailsBlock(): HTMLElement {
        const creditCardContainer = ElementsFactory.createBaseElement('div', 'credit-card-container');
        const creditCardTitle = ElementsFactory.createBaseElementWithText(
            'h3',
            'popup-title credit-card-title',
            'Credit Card Details'
        );
        const cardNumberBlock = ElementsFactory.createBaseElement('div', 'card-number-block');
        const cardValidnessBlock = ElementsFactory.createBaseElement('div', 'card-validness-block');
        const cardCVVBlock = ElementsFactory.createBaseElement('div', 'card-cvv-block');

        creditCardContainer.append(creditCardTitle, cardNumberBlock, this.cardImage, cardValidnessBlock, cardCVVBlock);
        cardNumberBlock.append(this.cardNumber, this.cardNumberError);
        cardValidnessBlock.append(this.cardValidness, this.cardValidnessError);
        cardCVVBlock.append(this.cardCVV, this.cardCVVError);

        return creditCardContainer;
    }
}
