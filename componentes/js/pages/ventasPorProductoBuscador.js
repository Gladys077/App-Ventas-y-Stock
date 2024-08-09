import { Header, iconoVolver } from '../header.js';
import { createSearchContainer, RadioProductList } from '../utils.js';
import { navigateToPage } from '../navigateToPage.js';
import { Notification } from '../notificacion.js';

export class VentasPorProductoBuscador {
    constructor(useFullHeight = true) {
            document.body.innerHTML = ''; 

            this.selectedProduct = [];
            this.useFullHeight = useFullHeight;
            this.createHeader();
            this.createMain();
        }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Ventas por Producto', iconoVolver, null, ()=> { navigateToPage('MenuVentas')}, ()=> { navigateToPage('')});
        document.body.appendChild(this.header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const productSearch = createSearchContainer(this.onProductClick.bind(this), RadioProductList, true);
        main.appendChild(productSearch);

        // Para modificar la alt. de la lista de productos 
        if (this.useFullHeight) {
            document.documentElement.style.setProperty('--product-list-max-height', 'calc(100vh - 260px)');
        }

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
    new VentasPorProductoBuscador(true);
});
