import { Header } from '../../js/header.js';
import { Footer } from '../../js/footer.js';
import { iconoVolver, iconoEliminarProducto, iconoCancel, iconoCancelViolet } from '../../js/iconosSVG.js';
import { createSearchContainer, RadioProductList, verificarCss } from '../../js/utils.js';
import { ButtonContainer } from '../../js/btnsContainer.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { Notification } from '../../js/notificacion.js';
import { ModalDialogo } from '../../js/modalDialogo.js';

export class EliminarProductosPage {
    constructor() {
            document.body.innerHTML = ''; 
            if(!verificarCss('search-results-eliminar')) this.agregarCss();
            this.selectedProduct = [];
            this.createHeader();
            this.createMain();
            this.createFooter();
        }

    getElement() {
        return this.element;
    }
    agregarCss() {
        const style = document.createElement('style');
        style.textContent = `
            
            .ul-product-list {
                width: calc(100vw - 32px);
                max-width: 380px;
                padding: 0;
                margin-top: 16px;
                list-style-type: none;
                text-align: left;
                height: calc(100vh - 10px));
                overflow-y: auto;
                background-color: #fff;

                .li-product-list {
                    border-bottom: 1px solid var(--color-secundario);
                    padding: 8px 0;
                    padding-left: 16px;
                    word-wrap: break-word;
                    overflow-wrap: break-word;

                    &:first-child {
                        border-top: 1px solid var(--color-secundario);
                    }
                }


	    `
        document.head.appendChild(style);
    }
    createHeader() {
        this.header = new Header('Elige el producto a eliminar', iconoVolver, null, ()=> { navigateToPage('MenuStock')}, ()=> { navigateToPage('')});
        document.body.appendChild(this.header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const productSearch = createSearchContainer(this.onProductClick.bind(this), RadioProductList, 'calc(100vh - 280px)', '¡Ese producto no existe en tu stock!');
        main.appendChild(productSearch);

        // Container para la lista de productos
        this.resultContainer = document.createElement('div');
        this.resultContainer.classList.add('search-results-eliminar');
        main.appendChild(this.resultContainer);

        document.body.appendChild(main);

    }

    createFooter() {
        this.footer = new Footer();
        const buttonContainer = new ButtonContainer(
            'Eliminar', 
            'Cancelar', 
            this.onEliminarClick.bind(this),
            this.onCancelarClick.bind(this),
            iconoEliminarProducto,
            iconoCancelViolet
        );
        this.footer.getElement().appendChild(buttonContainer.getButtonContainer());
        document.body.appendChild(this.footer.getElement());
    }

// Verifica que haya un producto seleccionado. Muestra un modal de confirmación. 
// Si se confirma, elimina el producto y muestra una notificación
    onEliminarClick() {
        if (!this.selectedProduct || this.selectedProduct.length === 0) {
            new Notification('../../../img/emojis/pare.png', 'Selecciona un producto primero', 'error');
            return;
        }

        new ModalDialogo('../../../img/emojis/trash.png', '¿Estás seguro de eliminarlo?', () => {
            this.removeProductFromStock(this.selectedProduct[0]);     
            
            new Notification('../../../img/emojis/like.png', '¡Eliminaste el producto de tu stock!', 'success');
            // Limpia el contenedor de resultados
            this.resultContainer.innerHTML = '';
            
            // Resetea el producto seleccionado
            this.selectedProduct = [];
            
            // Limpia el campo de búsqueda si existe
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    }
 
    // Navega de vuelta al menú stock
    onCancelarClick() {
        navigateToPage('MenuStock');
    }
   
    // Maneja la selección de un producto enla lista
    onProductClick(producto, event) {
        if (event.target.closest('.product-radio')) {
            this.selectedProduct = producto;
        }
    }

    //Elimina el producto del LStorage (debería eliminar de la BBDD) VER CON LIO
    removeProductFromStock(producto) {
        // Aquí hay q implementar la lógica real para eliminar el producto del stock, por ejemplo:
        const stockActual = JSON.parse(localStorage.getItem('stock') || '[]');
        const stockActualizado = stockActual.filter(item => item.id !== producto.id);
        localStorage.setItem('stock', JSON.stringify(stockActualizado));
        
        // Actualizar la UI después de eliminar
        this.updateProductList('');
    }
    updateProductList(searchTerm) {
        // Implementar la lógica para actualizar la lista de productos mostrada
        // Por ejemplo:
        const stock = JSON.parse(localStorage.getItem('stock') || '[]');
        const filteredStock = searchTerm ? 
            stock.filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase())) : 
            stock;
        
        // Limpiar el contenedor de resultados
        this.resultContainer.innerHTML = '';
        
        // Crear y mostrar la nueva lista de productos
        if (filteredStock.length > 0) {
            const ul = document.createElement('ul');
            ul.classList.add('ul-product-list');
            
            filteredStock.forEach(producto => {
                const li = document.createElement('li');
                li.classList.add('li-product-list');
                ul.appendChild(li);
            });
            
            this.resultContainer.appendChild(ul);
        }
    }
}

    new EliminarProductosPage(true);

