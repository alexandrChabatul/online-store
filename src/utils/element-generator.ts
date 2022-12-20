export class NewElement {
    static createBaseElement(elementType: string, className: string): HTMLElement {
        const element = document.createElement(elementType);
        element.classList.add(className);
        return element;
    }

    static createButton(className: string, text: string): HTMLButtonElement {
        const element = document.createElement('button');
        element.classList.add(className);
        element.textContent = text;
        return element;
    }

    static createAnchor(className: string, text: string, link: string): HTMLAnchorElement {
        const element = document.createElement('a');
        element.classList.add(className);
        element.href = link;
        element.textContent = text;
        return element;
    }

    static createInputRange(className: string): HTMLInputElement {
        const element = document.createElement('input');
        element.type = 'range';
        element.classList.add(className);
        return element;
    }

    static createInputText(className: string, placeholder: string): HTMLInputElement {
        const element = document.createElement('input');
        element.type = 'text';
        element.placeholder = placeholder;
        element.classList.add(className);
        return element;
    }

    static createInputNumber(className: string, value: string): HTMLInputElement {
        const element = document.createElement('input');
        element.type = 'number';
        element.value = value;
        element.classList.add(className);
        return element;
    }

    static createCheckbox(className: string, id: string, name: string, value: string): HTMLInputElement {
        const element = document.createElement('input');
        element.type = 'checkbox';
        element.id = id;
        element.name = name;
        element.value = value;
        element.classList.add(className);
        return element;
    }

    static createSelect(className: string): HTMLSelectElement {
        const element = document.createElement('select');
        element.classList.add(className);
        return element;
    }

    static createOPtion(value: string, text: string): HTMLOptionElement {
        const element = document.createElement('option');
        element.value = value;
        element.textContent = text;
        return element;
    }
}
