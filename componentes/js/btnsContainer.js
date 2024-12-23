
import { iconoGuardar, iconoCancel } from './iconosSVG.js';

export class ButtonContainer {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback,iconPrimary,iconSecondary) {
        // Este el contenedor con botones 
        this.buttonContainer = this.createButtonContainer(btnPrimary, btnSecondary,iconPrimary,iconSecondary);
        // Agrego los eventos correspondientes
        this.addEventListeners(btnPrimaryCallback, btnSecondaryCallback);
    }

    createButtonContainer(btnPrimary, btnSecondary,iconPrimary,iconSecondary) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const secondaryBtn = this.createButton(btnSecondary, 'cancelar', iconSecondary);
        const primaryBtn = this.createButton(btnPrimary, 'guardar', iconPrimary);

        buttonContainer.appendChild(secondaryBtn);
        buttonContainer.appendChild(primaryBtn);

        return buttonContainer;
    }

    createButton(text, className, icon) {
        const button = document.createElement('button');
        button.className = className;
        // button.textContent = text;
        const iconDiv = document.createElement("div");
        iconDiv.innerHTML = icon;

        // Contenedor para el texto
        const texto = document.createElement("span");
        texto.textContent=text;

        button.append(iconDiv,texto);
        return button;
    }

    addEventListeners(btnPrimaryCallback, btnSecondaryCallback) {
        const secondaryBtn = this.buttonContainer.querySelector('.cancelar');
        const primaryBtn = this.buttonContainer.querySelector('.guardar');

        if (btnSecondaryCallback) {
            secondaryBtn.addEventListener('click', btnSecondaryCallback);
        }

        if (btnPrimaryCallback) {
            primaryBtn.addEventListener('click', btnPrimaryCallback);
        }
    }

    getButtonContainer() {
        return this.buttonContainer;
    }
}
