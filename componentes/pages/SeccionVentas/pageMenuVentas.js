import { Header } from "../../js/header.js";
import { iconoVolver, iconoAjustes, iconoVender, iconoMovimientoDelDia, iconoVentasPorPersona, iconoVtasPorProducto, iconoVtasPorFecha, iconoCerrarSesion } from '../../js/iconosSVG.js'
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
        this.header = new Header('Menú Ventas', iconoVolver, iconoAjustes, ()=> { navigateToPage('Login') }, ()=> { navigateToPage('Config') });
        
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main');
        main.className = "main-menu";
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

        const icon = document.createElement('div');
        icon.className = 'logout-icon';
        icon.innerHTML = iconoCerrarSesion;
        logoutContainer.appendChild(icon);

        const logoutText = document.createElement('span');
        logoutText.textContent = 'Cerrar Sesión';
        logoutText.className = 'logout-text';
        logoutContainer.appendChild(logoutText);

        footerElement.appendChild(logoutContainer);
        document.body.appendChild(footerElement);

    }

    setActiveTab(tabName) {
        const buttons = document.querySelectorAll('.btns-main-menu .tab');
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
        { icon: iconoVender, alt: '', text: 'Vender', page: 'BuscadorParaVender' },
        { icon: iconoMovimientoDelDia, alt: '', text: 'Movimientos del día', page: 'VentasDelDia' },
        { icon: iconoVentasPorPersona, alt: '', text: 'Ventas de cada vendedor', page: 'VentasPorVendedor' },
        { icon: iconoVtasPorProducto, alt: '', text: 'Ventas por producto', page: 'ventasPorProducto' },
        { icon: iconoVtasPorFecha, alt: '', text: 'Ventas por fecha', page: 'VentasPorFecha' }
    ];

    buttonsData.forEach((data, index) => {
        const button = document.createElement('button');
        button.classList.add('botonera');

        if (index === 0) {
            button.classList.add('btn-large');
        }

        const iconContainer = document.createElement('div');
        iconContainer.innerHTML = `<div class="${index === 0 ? 'icon-large' : 'icon-menu'}">${data.icon}</div>`;
        // Si el índice del btn(index) es = a 0, tendrá la clase icono-large y sino tendrá la class icon. Los demás btn tendrán la class icon.
        // La variable data.icon contiene el código SVG del ícono que mostraré.

        const h3 = document.createElement('h3');
        h3.textContent = data.text;

        button.appendChild(iconContainer);
        button.appendChild(h3);
        button.addEventListener('click', () => navigateToPage(data.page));

        menuVentas.appendChild(button);
    });

    return menuVentas;
}

document.addEventListener('DOMContentLoaded', () => {
    new PageMenuVentas();
});
