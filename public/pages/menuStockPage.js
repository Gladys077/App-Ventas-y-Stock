import { Header, iconoAjustes, iconoVolver } from "../js/header.js";
import { createMenuPrincipal } from "../js/utils.js";
import { Footer } from "../js/footer.js";
import { navigateToPage } from "../js/routers/navigateToPage.js";

export class MenuStockPage {
    constructor() {
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
        { src: '../../../img/iconos/cargarStock.png', alt: '', text: 'Cargar Stock', page: 'CargarDeStock' },
        { src: '../../../img/iconos/stock.png', alt: '', text: 'Ver Stock', page: 'VerStock' },
        { src: '../../../img/iconos/editarProducto.png', alt: '', text: 'Editar Producto', page: 'EditarProducto' },
        { src: '../../../img/iconos/agregarProducto.png', alt: '', text: 'Nuevo Producto', page: 'NuevoProducto' },
        { src: '../../../img/iconos/proximoPedido.png', alt: '', text: 'Próximo Pedido', page: 'ProximoPedido' },
        { src: '../../../img/iconos/eliminarProducto.png', alt: '', text: 'Eliminar Producto', page: 'EliminarProducto' },
        { src: '../../../img/iconos/proveedores.png', alt: '', text: 'Proveedores', page: 'Proveedores' }
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
});
