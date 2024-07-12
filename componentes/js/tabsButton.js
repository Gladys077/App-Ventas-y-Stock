export class TabButton {
    constructor(icon, label, onClick) {
        this.element = this.createButton(icon, label, onClick);
    }

    createButton(icon, label, onClick) {
        const button = document.createElement('button');
        button.className = 'tab-button';

        const iconElement = document.createElement('img');
        iconElement.src = icon;
        iconElement.alt = label;
        iconElement.className = 'tab-icon';

        const labelElement = document.createElement('span');
        labelElement.textContent = label;
        labelElement.className = 'tab-label';

        button.appendChild(iconElement);
        button.appendChild(labelElement);

        button.addEventListener('click', onClick);

        return button;
    }

    getElement() {
        return this.element;
    }
}