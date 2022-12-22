export class NewElement {
    static createBaseElement(elementType: string, className: string): HTMLElement {
        const element = document.createElement(elementType);
        element.className = className;
        return element;
    }

    static createBaseElementWithText(elementType: string, className: string, text: string): HTMLElement {
        const element = document.createElement(elementType);
        element.className = className;
        element.textContent = text;
        return element;
    }

    static createButton(className: string, text: string): HTMLButtonElement {
        const element = document.createElement('button');
        element.className = className;
        element.textContent = text;
        return element;
    }

    static createAnchor(className: string, text: string, link: string): HTMLAnchorElement {
        const element = document.createElement('a');
        element.className = className;
        element.href = link;
        element.textContent = text;
        return element;
    }

    static createInputRange(className: string): HTMLInputElement {
        const element = document.createElement('input');
        element.type = 'range';
        element.className = className;
        return element;
    }

    static createInputText(className: string, placeholder: string): HTMLInputElement {
        const element = document.createElement('input');
        element.type = 'text';
        element.placeholder = placeholder;
        element.className = className;
        return element;
    }

    static createInputNumber(className: string, value: string, placeholder: string): HTMLInputElement {
        const element = document.createElement('input');
        element.type = 'number';
        element.value = value;
        element.placeholder = placeholder;
        element.className = className;
        return element;
    }

    static createCheckbox(className: string, id: string, name: string, value: string): HTMLInputElement {
        const element = document.createElement('input');
        element.type = 'checkbox';
        element.id = id;
        element.name = name;
        element.value = value;
        element.className = className;
        return element;
    }

    static createSelect(className: string): HTMLSelectElement {
        const element = document.createElement('select');
        element.className = className;
        return element;
    }

    static createOPtion(className: string, value: string, text: string): HTMLOptionElement {
        const element = document.createElement('option');
        element.className = className;
        element.value = value;
        element.textContent = text;
        return element;
    }
}
