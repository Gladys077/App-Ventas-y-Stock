import { Header } from '../../js/header.js';
import { createSearchContainer, RadioProveedorList } from '../../js/utils.js';
import { iconoVolver } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { Notification } from '../../js/notificacion.js';

export class ListaProveedores {
    constructor() {
        document.body.innerHTML = ''; 
        this.proveedor = [];
        this.createHeader();
        this.createMain();
        // if (!verificarCss("ul-product-list"))  
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
        const header = new Header('Lista de Proveedores', iconoVolver, null, function() { navigateToPage('MenuStock')});
        document.body.appendChild(header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const proveedoresBusqueda = createSearchContainer(this.onProductClick.bind(this), RadioProveedorList, 'calc(100vh - 290px)', 'Ese proveedor no está en tu lista');
        main.appendChild(proveedoresBusqueda);

        // Container para la lista de proveedores
        this.resultContainer = document.createElement('div');
        // this.resultContainer.classList.add('search-results-stock');
        main.appendChild(this.resultContainer);

        document.body.appendChild(main);
    }
 
    onProductClick(proveedores, event) {
        if (event.target.closest('.product-radio')) {
            // Lógica para buscar en la lista de proveedores
        } 
    }

   

    // updateProductList(searchWord) {
    //     this.resultContainer.innerHTML = ''; 
    //     const listaProveedores = new RadioProveedorList(searchWord, this.onProductClick.bind(this), 'calc(100vh - 60px)');
    //     const listaProveedoresElement = listaProveedores.render();

    //     if (listaProveedoresElement.children.length === 0) {
    //         new Notification('../../img/emojis/asombro.png', '¡No hay producto en stock!', 'error');
    //     }

    //     this.resultContainer.appendChild(listaProveedoresElement);
    // }
}

new ListaProveedores();




