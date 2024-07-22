import { Header, iconoVolver, iconoMenu } from '../header.js';
import { createSearchContainer, ExtendedFabButton } from '../utils.js';
import { Footer } from '../footer.js';
import { iconoVerPedido } from '../iconosSVG.js';
import { ModalInput } from '../modalInput.js';


export class ProductSearchPage {
    constructor() {
        this.selectedProducts = [];
        this.createHeader();
        this.createMain();
        this.createFooter();
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Elige el producto', iconoVolver, iconoMenu, null, function() { navigateToMenu('ventas'); });
        document.body.appendChild(this.header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        console.log('About to call createSearchContainer');
        console.log('this.onProductClick is:', typeof this.onProductClick);
        const productSearch = createSearchContainer(this.onProductClick.bind(this));
        main.appendChild(productSearch);

        // Si el resultado de la búsqueda está vacío, muestra una notificación
        const resultContainer = main.querySelector('.search-results');
        if (resultContainer && resultContainer.textContent.includes('No hay productos en stock.')) {
            new Notification('../img/emojis/asombro.png', '¡No hay productos en stock!', 'error');
        }

        document.body.appendChild(main);
    }
    
    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());

        // Fab extended (ver pedido)
        const iconSVG = iconoVerPedido; 
        const navigateToRoute = 'ruta a la pág. Pedido Actual';
    
        const extendedFabButton = new ExtendedFabButton(iconSVG, 'Ver Pedido', navigateToRoute);
    
        const footerElement = document.querySelector('footer');
        footerElement.appendChild(extendedFabButton.getElement());
    }


    onProductClick(product, event) {
        if (event.target.closest('.product-icon')) {
            this.openQuantityModal(product);
        } else {
            console.log('Producto clickeado:', product.nombre);
        }
    }

    openQuantityModal(product) {
        new ModalInput(`Cantidad:`,
            (cantidad) => {    
                const selectedProduct = {
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: parseInt(cantidad, 10)
                };
                console.log('Producto seleccionado:', selectedProduct);  // Verificación en consola

                this.selectedProducts.push(selectedProduct);
    
                localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
            },'1');
    }
}

new ProductSearchPage();