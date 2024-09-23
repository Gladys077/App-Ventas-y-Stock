import { Header } from '../../js/header.js';
import { createSearchContainer, ProductList, ExtendedFabButton, verificarCss } from '../../js/utils.js';
import { Footer } from '../../js/footer.js';
import { iconoVerPedido, iconoVolver } from '../../js/iconosSVG.js';
import { ModalInput } from '../../js/modalInput.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { Notification } from '../../js/notificacion.js';
import { Producto } from '../../js/producto.js';

export class VenderProductSearchPage {
    constructor() {
        document.body.innerHTML = ''; 
        this.selectedProducts = [];
        this.createHeader();
        this.createMain();
        this.createFooter();
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        const header = new Header('Vender', iconoVolver, null, function() { navigateToPage('MenuVentas')});
        document.body.appendChild(header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const productSearch = createSearchContainer(this.onProductClick.bind(this), ProductList, 'calc(100vh - 280px)');
        main.appendChild(productSearch);

        // Container para la lista de productos
        this.resultContainer = document.createElement('div');
        this.resultContainer.classList.add('search-results-ventas');
        main.appendChild(this.resultContainer);

        document.body.appendChild(main);
    }
    
    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());

        // Fab extended (ver venta actual)
        const iconSVG = iconoVerPedido; 
        const extendedFabButton = new ExtendedFabButton(iconSVG, 'Ver venta actual', () => navigateToPage('ventaActual'));
    
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
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precioVenta,
                    cantidad: parseInt(cantidad, 10)
                };
                

                // Guardar el producto seleccionado en la lista de ventas actuales
                this.selectedProducts.push(selectedProduct);
                localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));

                new Notification('../../../img/emojis/like.png', 'Producto añadido al carrito', 'success');
            }, '1');
    }

    updateProductList(searchWord) {
        this.resultContainer.innerHTML = ''; 
        const productList = new ProductList(searchWord, this.onProductClick.bind(this));
        const productListElement = productList.render();

        if (productListElement.children.length === 0) {
            new Notification('../../../img/emojis/asombro.png', '¡No hay producto en stock!', 'error');
        }

        this.resultContainer.appendChild(productListElement);
    }
}

new VenderProductSearchPage();




