import { NewElement } from './../../../../../utils/element-generator';

export class ResetBlock {
    resetButton: HTMLButtonElement;
    copyButton: HTMLButtonElement;

    constructor() {
        this.resetButton = NewElement.createButton('reset-button', 'Reset filters');
        this.copyButton = NewElement.createButton('copy-button', 'Copy link');
    }

    public createResetBlock(): HTMLDivElement {
        const resetBlock = NewElement.createDivElement('reset-block');
        resetBlock.append(this.resetButton, this.copyButton);

        return resetBlock;
    }

    public applyCopiedState(): void {
        this.copyButton.textContent = 'Copied';
        this.copyButton.classList.add('copy-button-copied');
        setTimeout(() => {
            this.resetCopiedState.call(this);
        }, 1000);
    }

    private resetCopiedState(): void {
        this.copyButton.classList.remove('copy-button-copied');
        this.copyButton.textContent = 'Copy link';
    }
}
