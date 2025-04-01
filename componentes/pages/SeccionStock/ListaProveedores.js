import { Header } from '../../js/header.js';
import { createSearchContainer, RadioProveedorList } from '../../js/utils.js';
import { iconoVolver, iconoProveedores } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { Notification } from '../../js/notificacion.js';

import { Footer } from '../../js/footer.js';
import { ExtendedFabButton, verificaContenedorPrincipal } from '../../js/utils.js';

export class ListaProveedores {
    constructor() {
        this.contenedorPrincipal = verificaContenedorPrincipal();
        this.proveedor = [];
        this.createHeader();
        this.createMain();
        this.createFooter();
        this.agregarCss();
    }

    getElement() {
        return this.element;
    }

    agregarCss() {
        const style = document.createElement("style");
        style.textContent = ` 
            .search-results-stock {
                max-width: 200px;
                }

            .ul-product-list {
                margin-top: 16px;
                list-style-type: none;
                text-align: left;
                overflow-y: auto; 
                overflow-x: hidden;
                background-color: #fff;
            }

            .li-product-list {
                border-bottom: 1px solid var(--secondary-color);
                padding: 8px 0;
                padding-left: 16px;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }

            .li-product-list:first-child{
                border-top: 1px solid var(--secondary-color);
            }
        }

	    `;
        document.head.appendChild(style);
  }

    createHeader() {
        const header = new Header('Lista de Proveedores', iconoVolver, null, ()=> { navigateToPage('MenuStock')});
        this.contenedorPrincipal.appendChild(header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const proveedoresBusqueda = createSearchContainer(this.onProductClick.bind(this), RadioProveedorList, 'calc(100vh - 290px)', 'Ese proveedor no está en tu lista');
        main.appendChild(proveedoresBusqueda);

        // Container para la lista de proveedores
        this.resultContainer = document.createElement('div');
        // this.resultContainer.classList.add('search-results-stock');
        main.appendChild(this.resultContainer);

        this.contenedorPrincipal.appendChild(main);
    }
 
    onProductClick(proveedores, event) {
        if (event.target.closest('.product-radio')) {
            // Lógica para buscar en la lista de proveedores
        } 
    }

    createFooter() {
        this.footer = new Footer();
        this.contenedorPrincipal.appendChild(this.footer.getElement());

        // Fab extended (nuevo proveedor)
        const iconSVG = iconoProveedores; 
        const extendedFabButton = new ExtendedFabButton(iconSVG, 'Nuevo Proveedor', () => navigateToPage('FormNuevoProveedor'));
    
        const footerElement = document.querySelector('footer');
        footerElement.appendChild(extendedFabButton.getElement());
    }


}

new ListaProveedores();




