
export class ButtonContainer {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        this.buttonContainer = this.createButtonContainer(btnPrimary, btnSecondary);
        this.addEventListeners(btnPrimaryCallback, btnSecondaryCallback);
    }

    createButtonContainer(btnPrimary, btnSecondary) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const secondaryBtn = this.createButton(btnSecondary, 'cancelar');
        const primaryBtn = this.createButton(btnPrimary, 'guardar');

        buttonContainer.appendChild(secondaryBtn);
        buttonContainer.appendChild(primaryBtn);

        return buttonContainer;
    }

    createButton(text, className) {
        const button = document.createElement('button');
        button.className = className;
        button.textContent = text;
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
