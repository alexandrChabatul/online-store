import { NewElement } from '../../../utils/element-generator';

export class CardDetails {
    cardNumber: HTMLInputElement;
    cardNumberError: HTMLElement;
    cardImage: HTMLElement;
    cardValidness: HTMLInputElement;
    cardValidnessError: HTMLElement;
    cardCVV: HTMLInputElement;
    cardCVVError: HTMLElement;

    constructor() {
        this.cardNumber = NewElement.createInputText('popup-field card-number-field', 'Card Number');
        this.cardNumberError = NewElement.createBaseElementWithText(
            'div',
            'error-message card-number-error',
            'Invalid Card Number'
        );
        this.cardImage = NewElement.createBaseElement('div', 'card-image');
        this.cardValidness = NewElement.createInputNumber('popup-field card-validness-field', '', 'MM/YY');
        this.cardValidness.step = '10';
        this.cardValidnessError = NewElement.createBaseElementWithText(
            'div',
            'error-message card-invalid-error',
            'Invalid date'
        );
        this.cardCVV = NewElement.createInputNumber('popup-field card-cvv-field', '', 'CVV');
        this.cardCVV.step = '10';
        this.cardCVVError = NewElement.createBaseElementWithText('div', 'error-message cvv-error', 'Invalid CVV');
    }

    public createCardDetailsBlock(): HTMLElement {
        const creditCardContainer = NewElement.createBaseElement('div', 'credit-card-container');
        const creditCardTitle = NewElement.createBaseElementWithText(
            'h3',
            'popup-title credit-card-title',
            'Credit Card Details'
        );
        const cardNumberBlock = NewElement.createBaseElement('div', 'card-number-block');
        const cardValidnessBlock = NewElement.createBaseElement('div', 'card-validness-block');
        const cardCVVBlock = NewElement.createBaseElement('div', 'card-cvv-block');

        creditCardContainer.append(creditCardTitle, cardNumberBlock, this.cardImage, cardValidnessBlock, cardCVVBlock);
        cardNumberBlock.append(this.cardNumber, this.cardNumberError);
        cardValidnessBlock.append(this.cardValidness, this.cardValidnessError);
        cardCVVBlock.append(this.cardCVV, this.cardCVVError);

        return creditCardContainer;
    }
}
