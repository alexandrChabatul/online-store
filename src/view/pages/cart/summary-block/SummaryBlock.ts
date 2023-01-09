import appConstants from 'common/constants';
import { CartSummary, PotentialPromoCode, PromoCode } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';
import './summary-block.scss';

export default class SummaryBlock {
    summary: HTMLDivElement;
    potentialCodes: HTMLDivElement;
    summaryDescription: HTMLDivElement;

    constructor() {
        this.summary = ElementsFactory.createDivElement('summary');
        this.potentialCodes = ElementsFactory.createDivElement('potential-codes');
        this.summaryDescription = ElementsFactory.createDivElement('summary-description');
    }

    getSummary(summary: CartSummary, codes: PromoCode[]): HTMLDivElement {
        this.updateSummary(summary, codes);
        return this.summary;
    }

    updateSummary(summary: CartSummary, codes: PromoCode[]): void {
        this.summary.innerHTML = '';
        const heading = ElementsFactory.createBaseElementWithText('h3', 'cart-summary__heading', 'Summary');
        const buyButton = ElementsFactory.createButton('cart-summary__button', 'BUY');
        this.summaryDescription = this.getDescription(summary);
        const codeInput = this.renderCodeInput();
        this.summary.append(heading, this.summaryDescription, codeInput, buyButton);
        if (codes.length > 0) {
            const appliedCodes = this.renderAppliedCodes(codes);
            codeInput.insertAdjacentElement('beforebegin', appliedCodes);
        }
    }

    getDescription(summary: CartSummary): HTMLDivElement {
        const description = ElementsFactory.createDivElement('summary-description');
        const productSummary = ElementsFactory.createDivElement('products-summary');
        productSummary.innerHTML = `
            <p class="summary-description__name">Products:</p>
            <p class="summary-description__value">${summary.productQty}</p>
        `;
        const subtotalSummary = ElementsFactory.createDivElement('subtotal-summary');
        subtotalSummary.innerHTML = `
            <p class="summary-description__name summary-description__prev-price">Subtotal:</p>
            <p class="summary-description__value">${appConstants.currency}${summary.prevPrice}</p>
        `;
        const totalSummary = ElementsFactory.createDivElement('total-summary');
        totalSummary.innerHTML = `
            <p class="summary-description__name">Total:</p>
            <p class="summary-description__value summary-description__current-price">${appConstants.currency}${summary.totalPrice}</p>
        `;
        if (summary.prevPrice === summary.totalPrice) {
            description.append(productSummary, totalSummary);
        } else {
            description.append(productSummary, subtotalSummary, totalSummary);
        }
        return description;
    }

    renderAppliedCodes(codes: PromoCode[]): HTMLDivElement {
        const appliedCodes = ElementsFactory.createDivElement('applied-codes');
        const text = ElementsFactory.createBaseElementWithText('p', '', 'Applied codes:');
        appliedCodes.classList.add('applied-codes__active');
        const ul = ElementsFactory.createBaseElement('ul', 'applied-codes__list');
        codes.forEach((el) => {
            const code = ElementsFactory.createBaseElement('li', 'applied-code');
            const codeValue = ElementsFactory.createBaseElementWithText(
                'div',
                'applied-code__text',
                `${el.name} - ${el.value}%`
            );
            const imageContainer = ElementsFactory.createDivElement('applied-code__image');
            imageContainer.id = el.code;
            code.append(codeValue, imageContainer);
            ul.append(code);
        });
        appliedCodes.append(text, ul);
        return appliedCodes;
    }

    renderCodeInput(): HTMLDivElement {
        this.potentialCodes.innerHTML = '';
        const codeInputBlock = ElementsFactory.createDivElement('codes-input-block');
        const inputContainer = ElementsFactory.createDivElement('code-input-container');
        const codeInput = ElementsFactory.createInputText('code-input', 'Enter promo code');
        const inputButton = ElementsFactory.createDivElement('clean-input-button');
        codeInput.oninput = this.inputChangeHandler.bind(this, inputButton);
        inputButton.onclick = this.cleanInputButtonHandler.bind(this, codeInput);
        inputContainer.append(codeInput, inputButton);
        const helper = ElementsFactory.createBaseElementWithText('p', 'code-input-helper', 'Promo for test: RS, EPM');
        codeInputBlock.append(inputContainer, helper, this.potentialCodes);
        return codeInputBlock;
    }

    updatePotentialCode(potentialCode: PotentialPromoCode | null): void {
        this.potentialCodes.innerHTML = '';
        if (!potentialCode) return;
        const potentialCodeBlock = ElementsFactory.createDivElement('potential-code');
        const codeBlock = ElementsFactory.createBaseElementWithText(
            'div',
            'potential-code__text',
            `${potentialCode.name} - ${potentialCode.value}%`
        );
        potentialCodeBlock.append(codeBlock);
        if (!potentialCode.isActive) {
            const button = ElementsFactory.createButton('potential-code__button', 'ADD');
            button.id = potentialCode.code;
            potentialCodeBlock.append(button);
        }
        this.potentialCodes.append(potentialCodeBlock);
    }

    updateSummaryDescription(summary: CartSummary): void {
        const newSummary = this.getDescription(summary);
        this.summaryDescription.replaceWith(newSummary);
        this.summaryDescription = newSummary;
    }

    cleanInputButtonHandler(input: HTMLInputElement): void {
        input.value = '';
        this.potentialCodes.innerHTML = '';
    }

    inputChangeHandler(inputButton: HTMLDivElement, e: Event): void {
        const value = (e.target as HTMLInputElement).value;
        if (value.length > 0) {
            inputButton.classList.add('clean-input-button__active');
        } else {
            inputButton.classList.remove('clean-input-button__active');
        }
    }
}
