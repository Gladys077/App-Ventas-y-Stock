export default class Main {
    constructor() {
        this.element = document.createElement('main');
        this.element.className = 'main-container';
        document.body.appendChild(this.element);
    }

    getElement() {
        return this.element;
    }
}
