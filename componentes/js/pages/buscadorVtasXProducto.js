import { Header, iconoVolver } from '../header.js';
import { createSearchContainer, RadioProductList } from '../utils.js';
import { navigateToPage } from '../navigateToPage.js';
import { Notification } from '../notificacion.js';

export class BuscadorVtasXProducto {
    constructor() {
        if (!document.querySelector('.search-results')) {
            this.selectedProducts = [];
            this.createHeader();
            this.createMain();
        }
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Ventas por Producto', iconoVolver, null, function() { navigateToPage('menuVentas')});
        document.body.appendChild(this.header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const productSearch = createSearchContainer(this.onProductClick.bind(this));
        main.appendChild(productSearch);

        // Container para la lista de productos
        this.resultContainer = document.createElement('div');
        this.resultContainer.classList.add('search-results');
        main.appendChild(this.resultContainer);

        document.body.appendChild(main);
    }

    onProductClick(producto, event) {
        if (event.target.closest('.product-radio')) {
            localStorage.setItem('selectedProduct', JSON.stringify(producto));
            navigateToPage('VentasPorProducto');
        }
    }

    updateProductList(searchWord) {
        this.resultContainer.innerHTML = ''; 
        const productList = new RadioProductList(searchWord, this.onProductClick.bind(this));
        const productListElement = productList.render();

        if (productListElement.children.length === 0) {
            new Notification('../img/emojis/asombro.png', '¡No hay producto en stock!', 'error');
        }

        this.resultContainer.appendChild(productListElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BuscadorVtasXProducto();
});
