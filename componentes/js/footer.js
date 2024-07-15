export class Footer {
    constructor() {
        this.element = this.createFooter();
    }

    createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'footer-container';
        return footer;
    }

    addFabButton(tabButton) {
        this.element.appendChild(tabButton.getElement());
    }

    getElement() {
        return this.element;
    }
}