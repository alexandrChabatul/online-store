import './checkout-popup.scss';
import { NewElement } from '../../utils/element-generator';

export default class CheckoutPopup {
    nameField: HTMLInputElement;
    nameErrorMessage: HTMLElement;
    phoneField: HTMLInputElement;
    phoneErrorMessage: HTMLElement;
    addressField: HTMLInputElement;
    addressErrorMessage: HTMLElement;
    emailField: HTMLInputElement;
    emailErrorMessage: HTMLElement;
    cardNumber: HTMLInputElement;
    cardNumberError: HTMLElement;
    cardValidness: HTMLInputElement;
    cardValidnessError: HTMLElement;
    cardCVV: HTMLInputElement;
    cardCVVError: HTMLElement;
    confirmButton: HTMLButtonElement;

    constructor() {
        this.nameField = NewElement.createInputText('popup-field name-field', 'Name Surname');
        this.nameErrorMessage = NewElement.createBaseElementWithText('div', 'error-message name-error', 'Invalid name');
        this.phoneField = NewElement.createInputText('popup-field phone-field', 'Phone number');
        this.phoneField.type = 'tel';
        this.phoneField.pattern =
            '(^s*(?:+?(d{1,3}))?([-. (]*(d{3})[-. )]*)?((d{3})[-. ]*(d{2,4})(?:[-.x ]*(d+))?)s*$)';
        this.phoneErrorMessage = NewElement.createBaseElementWithText(
            'div',
            'error-message phone-error',
            'Invalid phone number'
        );
        this.addressField = NewElement.createInputText('popup-field address-field', 'Address');
        this.addressField.pattern = '^[a-zA-Z0-9.-]*$';
        this.addressErrorMessage = NewElement.createBaseElementWithText(
            'div',
            'error-message address-error',
            'Invalid address'
        );
        this.emailField = NewElement.createInputText('popup-field email-field', 'Email');
        this.emailField.type = 'email';
        this.emailField.pattern = '^[w.%+-]+@[w.-]+.[w]{2,6}$';
        this.emailErrorMessage = NewElement.createBaseElementWithText(
            'div',
            'error-message email-error',
            'Invalid email'
        );
        this.cardNumber = NewElement.createInputText('popup-field card-number-field', 'Card Number');
        this.cardNumberError = NewElement.createBaseElementWithText(
            'div',
            'error-message card-number-error',
            'Invalid Card Number'
        );
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
        this.confirmButton = NewElement.createButton('confirm-button', 'Confirm');
    }

    public createCheckoutPopup(): HTMLElement {
        const popup = NewElement.createBaseElement('div', 'checkout-popup');
        const personalDetailsContainer = NewElement.createBaseElement('div', 'personal-details-container');
        const title = NewElement.createBaseElementWithText(
            'h3',
            'popup-title checkout-popup-title',
            'Personal Details'
        );
        const nameBlock = NewElement.createBaseElement('div', 'name-block');
        const phoneBlock = NewElement.createBaseElement('div', 'phone-block');
        const addressBlock = NewElement.createBaseElement('div', 'address-block');
        const emailBlock = NewElement.createBaseElement('div', 'email-block');
        const creditCardContainer = NewElement.createBaseElement('div', 'credit-cart-container');
        const creditCardTitle = NewElement.createBaseElementWithText(
            'h3',
            'popup-title credit-card-title',
            'Credit Card Details'
        );
        const cardNumberBlock = NewElement.createBaseElement('div', 'card-number-block');
        const cardValidnessBlock = NewElement.createBaseElement('div', 'card-validness-block');
        const cardCVVBlock = NewElement.createBaseElement('div', 'card-cvv-block');

        popup.append(personalDetailsContainer, creditCardContainer, this.confirmButton);
        personalDetailsContainer.append(title, nameBlock, phoneBlock, addressBlock, emailBlock);
        nameBlock.append(this.nameField, this.nameErrorMessage);
        phoneBlock.append(this.phoneField, this.phoneErrorMessage);
        addressBlock.append(this.addressField, this.addressErrorMessage);
        emailBlock.append(this.emailField, this.emailErrorMessage);
        creditCardContainer.append(creditCardTitle, cardNumberBlock, cardValidnessBlock, cardCVVBlock);
        cardNumberBlock.append(this.cardNumber, this.cardNumberError);
        cardValidnessBlock.append(this.cardValidness, this.cardValidnessError);
        cardCVVBlock.append(this.cardCVV, this.cardCVVError);

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
}
