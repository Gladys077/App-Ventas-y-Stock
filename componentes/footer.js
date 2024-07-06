import { ButtonContainer } from './btnsContainer.js';

export class Footer {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        this.element = this.createFooter(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback);
    }

    createFooter(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        const footer = document.createElement('footer');
        footer.className = 'app-footer';

        const btnsContainer = new ButtonContainer(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback);
        footer.appendChild(btnsContainer.getButtonContainer());

        return footer;
    }

    getElement() {
        return this.element;
    }
}
