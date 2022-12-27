import { ElementsFactory } from '../../../../../utils/element-generator';

export class ResetBlock {
    resetButton: HTMLButtonElement;
    copyButton: HTMLButtonElement;

    constructor() {
        this.resetButton = ElementsFactory.createButton('reset-button', 'Reset filters');
        this.copyButton = ElementsFactory.createButton('copy-button', 'Copy link');
    }

    public createResetBlock(): HTMLDivElement {
        const resetBlock = ElementsFactory.createDivElement('reset-block');
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
