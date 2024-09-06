import { Header } from "../../js/header.js";
import { iconoVolver, iconoAjustes } from '../../js/iconosSVG.js'
import { createMenuPrincipal } from "../../js/utils.js";
import { Footer } from "../../js/footer.js";
import { navigateToPage } from "../../js/navigateToPage.js";

export class PageMenuVentas {
    constructor() {
        document.body.innerHTML = ''; 
        this.createHeader();
        this.createMain();
        this.createFooter();
        this.setActiveTab('Ventas');
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
        menu.appendChild(createMenuVentas());

        main.appendChild(menu);
        document.body.appendChild(main);
    }

    createFooter() {
        const footer = new Footer();
        const footerElement = footer.getElement();

        const logoutContainer = document.createElement('button');
        logoutContainer.className = 'logout-container';

        logoutContainer.addEventListener('click', ()=> {navigateToPage('Login')});

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

export function createMenuVentas() {
    const menuVentas = document.createElement('div');
    menuVentas.classList.add('botonera-container');

    const buttonsData = [
        { src: '../../../img/iconos/vender1.png', alt: '', text: 'Vender', page: 'BuscadorParaVender' },
        { src: '../../../img/iconos/Movim-Dia.png', alt: '', text: 'Movimientos del día', page: 'Movimientos' },
        { src: '../../../img/iconos/ventasPorPersona.png', alt: '', text: 'Ventas de cada vendedor', page: 'VentasPorVendedor' },
        { src: '../../../img/iconos/vta-x-producto.png', alt: '', text: 'Ventas por producto', page: 'ProductosVendidos' },
        { src: '../../../img/iconos/VtasPorFecha.png', alt: '', text: 'Ventas por fecha', page: 'VentasPorFecha' }
    ];

    buttonsData.forEach((data, index) => {
        const button = document.createElement('button');
        button.classList.add('botonera');

        if (index === 0) {
            button.classList.add('btn-large');
        }

        const img = document.createElement('img');
        img.src = data.src;
        img.alt = data.alt;

        const h3 = document.createElement('h3');
        h3.textContent = data.text;

        button.appendChild(img);
        button.appendChild(h3);
        button.addEventListener('click', () => navigateToPage(data.page));

        menuVentas.appendChild(button);
    });

    return menuVentas;
}

document.addEventListener('DOMContentLoaded', () => {
    new PageMenuVentas();
});
