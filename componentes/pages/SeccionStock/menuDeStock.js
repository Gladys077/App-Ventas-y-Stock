import { Header } from "../../js/header.js";
import { iconoAjustes, iconoVolver, iconoCargarStock, iconoStock, iconoEditarProducto, iconoNuevoProducto, iconoEliminarProducto, iconoProveedores, iconoProximoPedido, iconoHistorial, iconoCerrarSesion } from "../../js/iconosSVG.js";
import { createMenuPrincipal } from "../../js/utils.js";
import { Footer } from "../../js/footer.js";
import { navigateToPage } from "../../js/navigateToPage.js";

export class MenuStockPage {
    constructor() {
        document.body.innerHTML = ''; 
        this.createHeader();
        this.createMain();
        this.createFooter();
        this.setActiveTab('Stock');
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
        menu.appendChild(createMenuStock());

        main.appendChild(menu);
        document.body.appendChild(main);
    }

    createFooter() {
        const footer = new Footer();
        const footerElement = footer.getElement();

        // footerElement.style.position = 'static'; // Cambié el 'position' a 'static'

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

        // footerElement.appendChild(logoutContainer);
     
        footerElement.appendChild(logoutContainer);
        document.body.appendChild(footerElement);

    }

    setActiveTab(tabName) {
        const buttons = document.querySelectorAll('.pestanas-menu .tab');
        buttons.forEach(button => {
            if (button.textContent === tabName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

export function createMenuStock() {
    const menuStock = document.createElement('div');
    menuStock.classList.add('botonera-container');

    const buttonsData = [
        { icon: iconoCargarStock, alt: '', text: 'Cargar Stock', page: 'MenuCargaDeStock' },
        { icon: iconoStock, alt: '', text: 'Ver Stock', page: 'VerStock' },
        { icon: iconoEditarProducto, alt: '', text: 'Editar Producto', page: 'EditarProducto' },
        { icon: iconoNuevoProducto, alt: '', text: 'Nuevo Producto', page: 'NuevoProducto' },
        { icon: iconoEliminarProducto, alt: '', text: 'Eliminar Producto', page: 'EliminarProducto' },
        { icon: iconoProveedores, alt: '', text: 'Proveedores', page: 'ListaProveedores' },
        { icon: iconoProximoPedido, alt: '', text: 'Próximo Pedido', page: 'ProximoPedido' },
        { icon: iconoHistorial, alt: '', text: 'Historial Pedidos', page: 'PedidoHistorial' }

    ];

    buttonsData.forEach(data => {
        const button = document.createElement('button');
        button.classList.add('botonera');

        const iconContainer = document.createElement('div');
        iconContainer.innerHTML = `<div class="icon-menu">${data.icon}</div>`;

        const h3 = document.createElement('h3');
        h3.textContent = data.text;

        button.appendChild(iconContainer);
        button.appendChild(h3);
        button.addEventListener('click', () => navigateToPage(data.page));

        menuStock.appendChild(button);
    });

    return menuStock;
}

document.addEventListener('DOMContentLoaded', () => {
    new MenuStockPage();
});
