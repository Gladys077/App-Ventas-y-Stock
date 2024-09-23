import { Header } from "../../js/header.js";
import { iconoAjustes, iconoVolver } from "../../js/iconosSVG.js";
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

        // footerElement.appendChild(logoutContainer);
     
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

export function createMenuStock() {
    const menuStock = document.createElement('div');
    menuStock.classList.add('botonera-container');

    const buttonsData = [
        { src: '../../../img/iconos/cargarStock.png', alt: '', text: 'Cargar Stock', page: 'CargaDeStock' },
        { src: '../../../img/iconos/stock.png', alt: '', text: 'Ver Stock', page: 'VerStock' },
        { src: '../../../img/iconos/editarProducto.png', alt: '', text: 'Editar Producto', page: 'EditarProducto' },
        { src: '../../../img/iconos/agregarProducto.png', alt: '', text: 'Nuevo Producto', page: 'NuevoProducto' },
        { src: '../../../img/iconos/eliminarProducto.png', alt: '', text: 'Eliminar Producto', page: 'EliminarProducto' },
        { src: '../../../img/iconos/proveedores.png', alt: '', text: 'Proveedores', page: 'ListaProveedores' },
        { src: '../../../img/iconos/proximoPedido.png', alt: '', text: 'Próximo Pedido', page: 'ProximoPedido' },
        { src: '../../../img/iconos/historialPedidos.png', alt: '', text: 'Historial de Pedidos', page: 'HistorialPedidos' }

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

        menuStock.appendChild(button);
    });

    return menuStock;
}

document.addEventListener('DOMContentLoaded', () => {
    new MenuStockPage();
});
