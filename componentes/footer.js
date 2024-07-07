import { ButtonContainer } from './btnsContainer.js';

export class Footer {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        this.element = this.createFooter(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback);
        this.addStyles();
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

    addStyles() {
        // Agrega estilos CSS al footer aquí
        this.element.style.display = 'flex';
        this.element.style.justifyContent = 'center';
        this.element.style.alignItems = 'flex-end'; // Ajusta la alineación vertical según sea necesario
        this.element.style.position = 'fixed';
        this.element.style.bottom = '0';
        this.element.style.width = '100%';
    }
}
