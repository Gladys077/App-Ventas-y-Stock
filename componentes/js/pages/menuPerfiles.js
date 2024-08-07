import { Header, iconoAjustes, iconoVolver } from "../header.js";
import { createMenuPrincipal } from "../utils.js";
import { Footer } from "../footer.js";
import { navigateToPage } from "../navigateToPage.js";

export class MenuPerfiles {
    constructor() {
        document.body.innerHTML = ''; 

        this.createHeader();
        this.createMain();
        this.createFooter();
        this.setActiveTab('Perfiles');
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Administrador', iconoVolver, iconoAjustes, ()=> { navigateToPage('Login') }, ()=> { navigateToPage('Config') });
        
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main');
        const menu = document.createElement('div');
        menu.className = 'menu';

        menu.appendChild(createMenuPrincipal());
        menu.appendChild(createMenuPerfiles());

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

    setActiveTab(tabName) {
        const buttons = document.querySelectorAll('.main-menu .tab');
        buttons.forEach(button => {
            if (button.textContent === tabName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

export function createMenuPerfiles() {
    const menuPerfiles = document.createElement('div');
    menuPerfiles.classList.add('botonera-container', 'large');

    const buttonsData = [
        { src: '../../../img/iconos/perfil.png', alt: '', text: 'Agrega nuevo perfil', page: 'nuevoPerfil' },
        { src: '../../../img/iconos/perfilListo.png', alt: '', text: 'Ver / editar perfil', page: 'editPerfil' }
    ];

    buttonsData.forEach(data => {
        const button = document.createElement('button');
        button.classList.add('botonera', 'botonera-vertical');

        const img = document.createElement('img');
        img.src = data.src;
        img.alt = data.alt;

        const h3 = document.createElement('h3');
        h3.textContent = data.text;

        button.appendChild(img);
        button.appendChild(h3);
        button.addEventListener('click', () => navigateToPage(data.page));

        menuPerfiles.appendChild(button);
    });

    return menuPerfiles;
}

document.addEventListener('DOMContentLoaded', () => {
    new MenuPerfiles();
});
