import appConstants from '../../../../common/constants';
import { CartSummary, PromoCode } from '../../../../common/types';
import { ElementsFactory } from '../../../../utils/element-generator';
import './summary-block.scss';

export default class SummaryBlock {
    heading: HTMLHeadingElement;
    description: HTMLDivElement;
    appliedCodes: HTMLDivElement;
    codeInput: HTMLDivElement;
    potentialCode: HTMLDivElement;
    buyButton: HTMLButtonElement;

    constructor() {
        this.heading = ElementsFactory.createBaseElementWithText(
            'h3',
            'cart-summary__heading',
            ' Summary'
        ) as HTMLHeadingElement;
        this.description = ElementsFactory.createDivElement('summary-description');
        this.appliedCodes = ElementsFactory.createBaseElementWithText(
            'div',
            'applied-codes',
            'Applied codes:'
        ) as HTMLDivElement;
        this.codeInput = ElementsFactory.createDivElement('codes-input-block');
        this.potentialCode = ElementsFactory.createDivElement('cart-summary__potential-code');
        this.buyButton = ElementsFactory.createButton('cart-summary__button', 'BUY');
    }

    getSummary(summary: CartSummary, codes: PromoCode[]) {
        const summaryBlock = ElementsFactory.createDivElement('summary');
        this.renderDescription(summary);
        this.renderAppliedCodes(codes);
        this.renderCodeInput();
        summaryBlock.append(this.heading, this.description, this.appliedCodes, this.codeInput, this.buyButton);
        return summaryBlock;
    }

    renderDescription(summary: CartSummary) {
        this.description.innerHTML = `
            <div class="products-summary">
                <p class="summary-description__name">Products:</p>
                <p class="summary-description__value">${summary.productQty}</p>
            </div>
            <div class="subtotal-summary">
                <p class="summary-description__name summary-description__prev-price">Subtotal:</p>
                <p class="summary-description__value">${appConstants.currency}${summary.prevPrice}</p>
            </div>
            <div class="total-summary">
                <p class="summary-description__name">Total:</p>
                <p class="summary-description__value summary-description__current-price">${appConstants.currency}${summary.totalPrice}</p>
            </div>
    `;
    }

    renderAppliedCodes(codes: PromoCode[]) {
        if (codes.length === 0) {
            return null;
        }
        this.appliedCodes.classList.add('applied-codes__active');
        const ul = ElementsFactory.createBaseElement('ul', 'applied-codes__list');
        codes.forEach((el) => {
            console.log(el);
            const code = ElementsFactory.createBaseElement('li', 'applied-code');
            const codeValue = ElementsFactory.createBaseElementWithText(
                'div',
                'applied-code__text',
                `${el.name} - ${el.value}%`
            );
            const imageContainer = ElementsFactory.createDivElement('applied-code__image');
            code.append(codeValue, imageContainer);
            ul.append(code);
        });
        this.appliedCodes.append(ul);
    }

    renderCodeInput() {
        const inputContainer = ElementsFactory.createDivElement('code-input-container');
        const codeInput = ElementsFactory.createInputText('code-input', 'Enter promo code');
        const inputButton = ElementsFactory.createDivElement('clean-input-button');
        inputButton.onclick = this.cleanInputButtonHandler.bind(this, codeInput);
        inputContainer.append(codeInput, inputButton);
        const helper = ElementsFactory.createBaseElementWithText('p', 'code-input-helper', 'Promo for test: RS, EPM');
        this.codeInput.append(inputContainer, helper);
    }

    renderPotentialCode(potentialCode: PromoCode) {
        const codeBlock = ElementsFactory.createBaseElementWithText(
            'div',
            'potential-code',
            `${potentialCode.name} - ${potentialCode.value}`
        );
        this.potentialCode.append(codeBlock);
    }

    cleanInputButtonHandler(input: HTMLInputElement) {
        this.potentialCode.innerHTML = '';
        input.value = '';
    }
}
