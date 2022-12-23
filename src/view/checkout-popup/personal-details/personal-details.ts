import { NewElement } from '../../../utils/element-generator';

export class PersonalDetails {
    nameField: HTMLInputElement;
    nameErrorMessage: HTMLElement;
    phoneField: HTMLInputElement;
    phoneErrorMessage: HTMLElement;
    addressField: HTMLInputElement;
    addressErrorMessage: HTMLElement;
    emailField: HTMLInputElement;
    emailErrorMessage: HTMLElement;

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
    }

    public createPersonalDetailsBlock(): HTMLElement {
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

        personalDetailsContainer.append(title, nameBlock, phoneBlock, addressBlock, emailBlock);
        nameBlock.append(this.nameField, this.nameErrorMessage);
        phoneBlock.append(this.phoneField, this.phoneErrorMessage);
        addressBlock.append(this.addressField, this.addressErrorMessage);
        emailBlock.append(this.emailField, this.emailErrorMessage);

        return personalDetailsContainer;
    }
}
