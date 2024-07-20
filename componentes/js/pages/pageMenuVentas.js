import { Header, navigateToMenu, iconoAjustes, iconoVolver } from "../header.js";
import { createMenuPrincipal, createMenuVentas } from "../utils.js";
import { Footer } from "../footer.js";

export class PageMenuVentas {
    constructor() {
        this.createHeader();
        this.createMain();
        this.createFooter();
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Administrador', iconoVolver, iconoAjustes, null, function(){navigateToMenu("ventas")});
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main');
        const menu = document.createElement('div');
        menu.className = 'menu';

        menu.appendChild(createMenuPrincipal());
        menu.appendChild(createMenuVentas());

        main.appendChild(menu);
        document.body.appendChild(main);

    }

    createFooter() {
        const footer = new Footer(); 
        const footerElement = footer.getElement();

        const logoutContainer = document.createElement('button');
        logoutContainer.className = 'logout-container';

        const icon = document.createElement('img');
        icon.src = '../../../img/iconos/CerrarSesion.png'; 
        icon.alt = 'Icono Salida';
        logoutContainer.appendChild(icon);

        const logoutText = document.createElement('span');
        logoutText.textContent = 'Cerrar Sesión';
        logoutText.className = 'logout-text';
        logoutContainer.appendChild(logoutText);

        footerElement.appendChild(logoutContainer);

        document.body.appendChild(footerElement);
    }
}
// Instancia la clase PageMenuVentas cuando la página cargue ¿es necesario hacerlo así?
document.addEventListener('DOMContentLoaded', () => {
    new PageMenuVentas();
    // Llama a navigateToMenu después de crear todos los elementos
    navigateToMenu('ventas');
});