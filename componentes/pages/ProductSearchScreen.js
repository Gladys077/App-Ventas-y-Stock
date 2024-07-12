import { Header } from '../js/header.js';
import { Footer } from '../js/footer.js';
import { createSearchContainer } from '../js/utils.js';
import { TabButton } from '../js/tabsButton.js';
// import { TabButton } from './TabButton.js';
// import { ProductList } from './ProductList.js';
// import { QuantityModal } from './QuantityModal.js';
// import { OrderManager } from './OrderManager.js';
// import { iconoVolver, iconoMenu, iconoBuscar, iconoPedido } from './iconos.js';

export class ProductSearchPage {
    constructor() {
        this.createHeader();
        this.createMain();
        this.createFooter();

        
        this.productList = new ProductList();
        this.quantityModal = new QuantityModal();
        this.orderManager = new OrderManager();
        this.element = this.createScreenSearch();
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Vender / Elige el producto', iconoVolver, iconoMenu, null, function() { navigateToMenu('ventas'); });
        document.body.appendChild(this.header.getElement());
    }
    
    
    createScreenSearch() {
        const screenSearch = document.createElement('div');
        screenSearch.className = 'product-search-screen';

        const searchContainer = createSearchContainer();
        screenSearch.appendChild(searchContainer);

        screenSearch.appendChild(this.productList.getElement());
        screenSearch.appendChild(this.footer.getElement());

        this.addTabButton();
        this.addEventListeners();

        return screen;
    }

    addTabButton() {
        const tabButton = new TabButton(iconoPedido, 'Pedido', () => {
            console.log('Ir a pantalla de pedido');
        });
        this.footer.addTabButton(tabButton.getElement());
    }

    // addTabButton() {
    //     const tabButton = new TabButton(iconoPedido, 'Pedido', () => {
    //         // Lógica para ir a la pantalla de pedido
    //         console.log('Ir a pantalla de pedido');
    //     });
    //     this.footer.addTabButton(tabButton);
    // }

    addEventListeners() {
        const input = this.element.querySelector('.search-input');
        const button = this.element.querySelector('.search-button');

        input.addEventListener('input', () => this.handleSearch(input.value));
        button.addEventListener('click', () => this.handleSearch(input.value));

        this.productList.onProductSelect((product) => {
            this.quantityModal.show(product, (quantity) => {
                this.orderManager.addProduct(product, quantity);
                // Aquí podrías actualizar la UI o navegar a la pantalla de pedido
            });
        });
    }

    handleSearch(query) {
        // Aquí iría la lógica para buscar productos basados en la consulta
        // y actualizar la lista de productos
        this.productList.updateList(/* resultados de búsqueda */);
    }

}

// Estilos CSS
const styles = `
.product-search-screen {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 16px;
}

.search-container {
    margin-top: 60px;
    margin-bottom: 16px;
}

.search-input {
    width: 100%;
    height: 48px;
    padding: 12px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-button-products {
    width: 100%;
    height: 48px;
    padding: 12px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-button-products:hover {
    background-color: var(--color-hover);
}
`;

// Agregar estilos al documento
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);