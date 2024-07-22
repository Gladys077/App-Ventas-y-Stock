import { Header, navigateToMenu, iconoAjustes, iconoVolver } from "../header.js";
import { createMenuPrincipal } from "../utils.js";
import { Footer } from "../footer.js";
import { navigateToPage } from "../navigateToPage.js";

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

function createMenuVentas() {
    const menuVentas = document.createElement('div');
    menuVentas.classList.add('botonera-container');

    const buttonsData = [
        { src: '../img/iconos/vender1.png', alt: '', text: 'Vender', page: 'pageProductSearch' },
        { src: '../img/iconos/Movim-Dia.png', alt: '', text: 'Movimientos del día', page: 'movimiento' },
        { src: '../img/iconos/ventasPorPersona.png', alt: '', text: 'Ventas por vendedor', page: 'ventasPorVendedor' },
        { src: '../img/iconos/Movimiento.png', alt: '', text: 'Ventas por producto', page: 'ventasPorProducto' },
        { src: '../img/iconos/VtasPorFecha.png', alt: '', text: 'Ventas por fecha', page: 'ventasPorFecha' }
    ];

    buttonsData.forEach(data => {
        const button = document.createElement('button');
        button.classList.add('botonera');

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
    // Llama a navigateToMenu después de crear todos los elementos
    // navigateToPage('menuVentas');
});