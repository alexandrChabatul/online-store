import appConstants from 'common/constants';
import { InputTemplate } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';

export class PersonalDetails {
    private static INPUT_DATA: InputTemplate[] = appConstants.personalInputs;

    public createPersonalDetailsBlock(): HTMLElement {
        const personalDetailsContainer = ElementsFactory.createBaseElement('div', 'personal-details-container');
        const title = ElementsFactory.createBaseElementWithText(
            'h3',
            'popup-title checkout-popup-title',
            'Personal Details'
        );
        personalDetailsContainer.append(title);
        PersonalDetails.INPUT_DATA.forEach((el) => {
            const container = ElementsFactory.createBaseElement('div', `${el.name}-block`);
            const field = ElementsFactory.createInputText(`popup-field ${el.name}-field`, el.placeholder);
            field.name = el.name;
            field.type = el.type;
            field.required = true;
            field.pattern = el.pattern;
            field.setAttribute('data-name', el.name);
            const error = ElementsFactory.createBaseElementWithText(
                'div',
                `error-message ${el.name}-error`,
                el.errorMessage
            );
            container.append(field, error);
            personalDetailsContainer.append(container);
        });
        return personalDetailsContainer;
    }
}
