/** @jest-environment jsdom */
import { ElementsFactory } from 'utils/ElementGenerator';

describe('Element factory', () => {
    const className = 'test-class';
    const value = 'test-value-1';
    const valueNum = 12345;
    const text = 'test-text-1';
    const src = 'http://test-url.com/';
    const alt = 'test-alt-1';
    const id = 'test-id-1';
    const placeholder = 'test-placeholder-1';
    const targetId = 'target-id-1';

    test('Should create DOM element with given type and class name', () => {
        const div = ElementsFactory.createBaseElement('div', className);
        const main = ElementsFactory.createBaseElement('main', className);
        [div, main].forEach((el) => {
            expect(el).toBeInstanceOf(HTMLElement);
            expect(el.classList).toContain(className);
        });
    });
    test('Should create DOM element with given type, class name and text', () => {
        const div = ElementsFactory.createBaseElementWithText('div', className, text);
        const main = ElementsFactory.createBaseElementWithText('main', className, text);
        [div, main].forEach((el) => {
            expect(el).toBeInstanceOf(HTMLElement);
            expect(el.classList).toContain(className);
            expect(el.textContent).toBe(text);
        });
    });
    test('Should create div element with given class name', () => {
        const div = ElementsFactory.createDivElement(className);
        expect(div).toBeInstanceOf(HTMLDivElement);
        expect(div.classList).toContain(className);
    });
    test('Should create IMG element with given class name, src and alt', () => {
        const img = ElementsFactory.createImgElement(className, src, alt);
        expect(img).toBeInstanceOf(HTMLImageElement);
        expect(img.classList).toContain(className);
        expect(img.src).toBe(src);
        expect(img.alt).toBe(alt);
    });
    test('Should create button element with given class name and text', () => {
        const button = ElementsFactory.createButton(className, text);
        expect(button).toBeInstanceOf(HTMLButtonElement);
        expect(button.classList).toContain(className);
        expect(button.textContent).toBe(text);
    });
    test('Should create anchor link element with given class name, text and string', () => {
        const link = ElementsFactory.createAnchor(className, text, src);
        expect(link).toBeInstanceOf(HTMLAnchorElement);
        expect(link.classList).toContain(className);
        expect(link.textContent).toBe(text);
        expect(link.href).toBe(src);
    });
    test('Should create input element (type range) with given class name and id', () => {
        const input = ElementsFactory.createInputRange(className, id);
        expect(input).toBeInstanceOf(HTMLInputElement);
        expect(input.type).toBe('range');
        expect(input.classList).toContain(className);
        expect(input.id).toBe(id);
    });
    test('Should create input element (type text) with given class name and placeholder', () => {
        const input = ElementsFactory.createInputText(className, placeholder);
        expect(input).toBeInstanceOf(HTMLInputElement);
        expect(input.type).toBe('text');
        expect(input.classList).toContain(className);
        expect(input.placeholder).toBe(placeholder);
    });
    test('Should create input element (type number) with given class name, value and placeholder', () => {
        const input = ElementsFactory.createInputNumber(className, valueNum, placeholder);
        expect(input).toBeInstanceOf(HTMLInputElement);
        expect(input.type).toBe('number');
        expect(input.classList).toContain(className);
        expect(input.placeholder).toBe(placeholder);
        expect(input.value).toBe(String(valueNum));
    });
    test('Should create checkbox element with given class name, id, name and value', () => {
        const input = ElementsFactory.createCheckbox(className, id, 'test-name', value);
        expect(input).toBeInstanceOf(HTMLInputElement);
        expect(input.type).toBe('checkbox');
        expect(input.classList).toContain(className);
        expect(input.id).toBe(id);
        expect(input.name).toBe('test-name');
        expect(input.value).toBe(value);
    });
    test('Should create label element with given class name, target and text', () => {
        const input = ElementsFactory.createLabel(className, targetId, text);
        expect(input).toBeInstanceOf(HTMLLabelElement);
        expect(input.classList).toContain(className);
        expect(input.htmlFor).toBe(targetId);
        expect(input.textContent).toBe(text);
    });
    test('Should create select element with given class name', () => {
        const input = ElementsFactory.createSelect(className);
        expect(input).toBeInstanceOf(HTMLSelectElement);
        expect(input.classList).toContain(className);
    });
    test('Should option select element with given class name, value and text', () => {
        const input = ElementsFactory.createOption(className, 'text-value', text);
        expect(input).toBeInstanceOf(HTMLOptionElement);
        expect(input.classList).toContain(className);
        expect(input.value).toBe('text-value');
        expect(input.textContent).toBe(text);
    });
});
