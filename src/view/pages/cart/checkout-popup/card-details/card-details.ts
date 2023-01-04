import appConstants from 'common/constants';
import { InputTemplate } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';

export class CardDetails {
    private static INPUT_DATA: InputTemplate[] = appConstants.cardInputs;
    cardImage: HTMLDivElement;

    constructor() {
        this.cardImage = ElementsFactory.createDivElement('card-image');
    }

    public createCardDetailsBlock(): HTMLElement {
        const creditCardContainer = ElementsFactory.createBaseElement('div', 'credit-card-container');
        const creditCardTitle = ElementsFactory.createBaseElementWithText(
            'h3',
            'popup-title credit-card-title',
            'Credit Card Details'
        );
        creditCardContainer.append(creditCardTitle);
        CardDetails.INPUT_DATA.forEach((el) => {
            const container = ElementsFactory.createBaseElement('div', `${el.name}-block`);
            const field = ElementsFactory.createInputText(`popup-field ${el.name}-field`, el.placeholder);
            field.name = el.name;
            field.type = el.type;
            field.pattern = el.pattern;
            field.required = true;
            if (el.maxLength) field.maxLength = el.maxLength;
            const error = ElementsFactory.createBaseElementWithText(
                'div',
                `error-message ${el.name}-error`,
                el.errorMessage
            );
            this.addListenerToInput(field);
            field.setAttribute('data-name', el.name);
            container.append(field, error);
            creditCardContainer.append(container);
            if (el.name === 'card-number') {
                creditCardContainer.append(this.cardImage);
            }
        });
        return creditCardContainer;
    }

    addListenerToInput(target: HTMLInputElement) {
        const events = ['input', 'change', 'blur', 'keyup'];
        for (const i in events) {
            target.addEventListener(events[i], this.replaceChars, false);
        }
    }

    replaceChars(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        let cardCode: string | undefined = value.replace(/[^\d]/g, '').substring(0, target.maxLength);
        switch (target.dataset.name) {
            case 'card-number': {
                cardCode = cardCode !== '' ? cardCode.match(/.{1,4}/g)?.join(' ') : '';
                break;
            }
            case 'card-validness': {
                cardCode = cardCode !== '' ? cardCode.match(/.{1,2}/g)?.join(' / ') : '';
                break;
            }
        }
        target.value = cardCode || '';
    }
}
