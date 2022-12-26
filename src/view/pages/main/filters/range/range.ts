import './range.scss';

export class Range {
    private getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): [number, number] {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    public fillSlider(
        from: HTMLInputElement,
        to: HTMLInputElement,
        sliderColor: string,
        rangeColor: string,
        controlSlider: HTMLInputElement
    ): void {
        const rangeDistance = Number(to.max) - Number(to.min);
        const fromPosition = Number(from.value) - Number(to.min);
        const toPosition = Number(to.value) - Number(to.min);
        controlSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
        ${sliderColor} 100%)`;
    }

    private setToggleAccessible(currentTarget: HTMLInputElement): void {
        if (Number(currentTarget.value) <= Number(currentTarget.min)) {
            currentTarget.style.zIndex = '2';
        } else {
            currentTarget.style.zIndex = '0';
        }
    }

    public controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLElement): void {
        const [from, to] = this.getParsed(fromSlider, toSlider);
        this.fillSlider(fromSlider, toSlider, '#d8d7db', 'red', toSlider);
        if (from > to) {
            fromSlider.value = String(to);
            fromInput.textContent = String(to);
        } else {
            fromInput.textContent = String(from);
        }
    }

    public controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLElement): void {
        const [from, to] = this.getParsed(fromSlider, toSlider);
        this.fillSlider(fromSlider, toSlider, '#d8d7db', 'red', toSlider);
        this.setToggleAccessible(toSlider);
        if (to < from) {
            toSlider.value = String(from);
            toInput.textContent = String(from);
        } else {
            toInput.textContent = String(to);
        }
    }
}
