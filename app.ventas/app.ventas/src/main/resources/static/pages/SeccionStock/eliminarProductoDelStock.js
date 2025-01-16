import { Header } from '../../js/header.js';
import { Footer } from '../../js/footer.js';
import { iconoVolver } from '../../js/iconosSVG.js';
import { createSearchContainer, RadioProductList, verificarCss } from '../../js/utils.js';
import { ButtonContainer } from '../../js/btnsContainer.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { Notification } from '../../js/notificacion.js';
import { ModalDialogo } from '../../js/modalDialogo.js';

export class EliminarProductosPage {
    constructor() {
            document.body.innerHTML = ''; 
            if(!verificarCss('search-results-elininar')) this.agregarCss();
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
            // .search-results-eliminar {
            //     max-width: 300px;
            //     }
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
                    border-bottom: 1px solid var(--secondary-color);
                    padding: 8px 0;
                    padding-left: 16px;
                    word-wrap: break-word;
                    overflow-wrap: break-word;

                    &:first-child {
                        border-top: 1px solid var(--secondary-color);
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
            this.onCancelarClick.bind(this)
        );
        this.footer.getElement().appendChild(buttonContainer.getButtonContainer());
        document.body.appendChild(this.footer.getElement());
    }

    onEliminarClick() {
        if (!this.selectedProduct) {
            new Notification('../../../img/emojis/pare.png', 'Selecciona un producto primero', 'error');
            return;
        }

        new ModalDialogo('../../../img/emojis/trash.png', '¿Estás seguro de eliminarlo?', () => {
            this.removeProductFromStock(this.selectedProduct[0]);     
            new Notification('../../../img/emojis/trash.png', '¡Eliminaste el producto de tu stock!', 'success');
            this.updateProductList(''); // Refresca la lista
            // this.selectedProduct = null; // Conviene resetearla? Ver con LIO
        });
    }

    onCancelarClick() {
        navigateToPage('MenuStock');
    }

    onProductClick(producto, event) {
        if (event.target.closest('.product-radio')) {
            this.selectedProduct = producto;
        }
    }

    removeProductFromStock(producto) {
        // Lógica para eliminar el producto del stock - VER CON LIO
        console.log('Producto eliminado:', producto);
        // Aquí iría la lógica para eliminar el producto de la BBDD
    }

}

    new EliminarProductosPage(true);

