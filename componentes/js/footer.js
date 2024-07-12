export class Footer {
    constructor() {
        this.element = this.createFooter();
        this.addStyles();
    }

    createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'app-footer';
        return footer;
    }

    getElement() {
        return this.element;
    }

    addStyles() {
        Object.assign(this.element.style, {
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            bottom: '0',
            left: '0',
            width: 'calc(100% - 32px)',
            maxWidth: '400px',
            // height: '60px',
            padding: '0 16px', // Añadido para compensar el ancho reducido
            backgroundColor: '#ffffff', // Añadido para dar un fondo al footer
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)' // Opcional: añade una sombra sutil
        });
    }

    addTabButton(tabButton) {
        this.element.appendChild(tabButton.getElement());
    }
}