import { Header, iconoVolver, iconoMenu } from '../header.js';
import { createSearchContainer, ExtendedFabButton } from '../utils.js';
import { Footer } from '../footer.js';
import { iconoVerPedido } from '../iconosSVG.js';
import { ModalInput } from '../modalInput.js';


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

        // Fab extended (ver pedido)
        const iconSVG = iconoVerPedido; 
        const navigateToRoute = '/ruta/a/pedido/actual';
    
        const extendedFabButton = new ExtendedFabButton(iconSVG, 'Ver Pedido', navigateToRoute);
    
        const footerElement = document.querySelector('footer');
        footerElement.appendChild(extendedFabButton.getElement());

    }

    onProductClick(product, event) {
        if (event.target.closest('.product-icon')) {
            // Si se hizo clic en el icono
            this.openQuantityModal(product);
        } else {
            // Si se hizo clic en el resto del ítem
            console.log('Producto clickeado:', product.nombre);
            // Aquí puedes agregar otra lógica si es necesario
        }
    }

    openQuantityModal(product) {
        // new ModalInput('Cantidad', (value) => {
            //   console.log('Cantidad confirmada:', value);
            // }, () => {
            //   console.log('Acción cancelada');
            // });

        new ModalInput(`Cantidad de ${product.nombre}`, (cantidad) => {
            console.log('Cantidad confirmada para:', product.nombre, 'Cantidad:', cantidad);
            // Aquí puedes agregar la lógica para añadir el producto al pedido
        }, '1'); // Pasamos '1' como valor por defecto
    }
}

new ProductSearchPage();