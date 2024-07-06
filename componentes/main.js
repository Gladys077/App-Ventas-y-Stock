export class Main {
    constructor(content) {
        this.element = this.getExistingMain();
        this.appendContent(content);
    }

    getExistingMain() {
        return document.querySelector('main');
    }

    appendContent(content) {
        if (content instanceof Node) {
            this.element.appendChild(content);
        } else {
            console.error('El contenido pasado a Main no es un nodo válido:', content);
        }
    }

    getElement() {
        return this.element;
    }
}
