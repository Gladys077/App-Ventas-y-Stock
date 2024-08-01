

export class ButtonContainer {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback,iconPrimary,iconSecondary) {
        this.buttonContainer = this.createButtonContainer(btnPrimary, btnSecondary,iconPrimary,iconSecondary);
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

    createButton(text, className, img) {
        const button = document.createElement('button');
        button.className = className;
        // button.textContent = text;
            const icon = document.createElement("img");
                icon.src=`./img/iconos/${img}.png`;
            const texto = document.createElement("span");
                texto.textContent=text;
        button.append(icon,texto);
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
