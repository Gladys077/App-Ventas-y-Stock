import { Header, iconoVolver, iconoMenu } from '../header.js';
import { createSearchContainer, ExtendedFabButton } from '../utils.js';
import { Footer } from '../footer.js';
import { iconoVerPedido } from '../iconosSVG.js';
import { ModalInput } from '../modalCantidad.js';


export class ProductSearchPage {
    constructor() {
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
        
        const productSearch = createSearchContainer(this.onProductClick.bind(this));
        main.appendChild(productSearch);

        document.body.appendChild(main);
    }
    
    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());

        // Implementación del botón extendido
        const iconSVG = iconoVerPedido; 
        const navigateToRoute = '/ruta/a/pedido/actual';
    
        const extendedFabButton = new ExtendedFabButton(iconSVG, 'Ver Pedido', navigateToRoute);
    
        const footerElement = document.querySelector('footer');
        if (footerElement) {
            footerElement.appendChild(extendedFabButton.getElement());
        } else {
            console.error('No se pudo encontrar el elemento footer.');
        }
    }
    onProductClick(product) {
        // Aquí iría la lógica de lo que debe hacer cuando se clickea un producto
        new ModalInput(`Cantidad`, () => {
            console.log('Cantidad confirmada para:', product.nombre);
        });
    }
}
new ProductSearchPage;
