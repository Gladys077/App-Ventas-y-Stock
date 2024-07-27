import { Header, iconoVolver } from '../header.js';
import { createSearchContainer, ProductList, ExtendedFabButton } from '../utils.js';
import { Footer } from '../footer.js';
import { iconoVerPedido } from '../iconosSVG.js';
import { ModalInput } from '../modalInput.js';
import { navigateToPage } from '../navigateToPage.js';
import { Notification } from '../notificacion.js';


export class ProductSearchPage {
    constructor() {
        if (!document.querySelector('.search-results')) {
        this.selectedProducts = [];
        this.createHeader();
        this.createMain();
        this.createFooter();
        }
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Vender', iconoVolver, null, function() { navigateToPage('menuVentas')});
        document.body.appendChild(this.header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const productSearch = createSearchContainer(this.onProductClick.bind(this), ProductList);
        main.appendChild(productSearch);

        // Container para la lista de productos
        this.resultContainer = document.createElement('div');
        this.resultContainer.classList.add('search-results');
        main.appendChild(this.resultContainer);

        document.body.appendChild(main);
    }
    
    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());

        // Fab extended (ver pedido)
        const iconSVG = iconoVerPedido; 
        const extendedFabButton = new ExtendedFabButton(iconSVG, 'Ver Pedido', () => navigateToPage('pedidoActual'));
    
        const footerElement = document.querySelector('footer');
        footerElement.appendChild(extendedFabButton.getElement());
    }


    onProductClick(producto, event) {
        if (event.target.closest('.product-icon')) {
            this.openQuantityModal(producto);
        } 
    }

    openQuantityModal(producto) {
        new ModalInput(`Cantidad:`,
            (cantidad) => {    
                const selectedProduct = {
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: parseInt(cantidad, 10)
                };
                
                this.selectedProducts.push(selectedProduct);
    
                localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
            },'1');
    }

    updateProductList(searchWord) {
        this.resultContainer.innerHTML = ''; 
        const productList = new ProductList(searchWord, this.onProductClick.bind(this));
        const productListElement = productList.render();

        if (productListElement.children.length === 0) {
            new Notification('../img/emojis/asombro.png', '¡No hay producto en stock!', 'error');
        }

        this.resultContainer.appendChild(productListElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductSearchPage();
});