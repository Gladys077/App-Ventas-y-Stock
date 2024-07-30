import { BaseSearchPage } from './BaseSearchPage.js';
import { ProductList, ExtendedFabButton } from './utils.js';
import { iconoVolver, iconoVerPedido } from './iconosSVG.js';
import { ModalInput } from './modalInput.js';
import { navigateToPage } from './navigateToPage.js';

export class ProductSearchPage extends BaseSearchPage {
    constructor() {
        super('Vender', () => navigateToPage('menuVentas'), ProductList);
    }

    createFooter() {
        super.createFooter();
        
        const footerElement = document.createElement('footer');
        document.body.appendChild(footerElement);

        const iconSVG = iconoVerPedido; 
        const extendedFabButton = new ExtendedFabButton(iconSVG, 'Ver Pedido', () => navigateToPage('pedidoActual'));
        footerElement.appendChild(extendedFabButton.getElement());
    }

    onProductClick(product, event) {
        if (event.target.closest('.product-icon')) {
            this.openQuantityModal(product);
        } 
    }

    openQuantityModal(product) {
        new ModalInput(`Cantidad:`,
            (cantidad) => {    
                const selectedProduct = {
                    ...product,
                    cantidad: parseInt(cantidad, 10)
                };
                
                this.setSelectedProduct(selectedProduct);
            }, '1');
    }
}


// ejemplo de instancia
// import { ProductSearch } from './ProductSearch.js';

// document.addEventListener('DOMContentLoaded', () => {
//     new ProductSearch();
// });