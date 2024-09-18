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
            if(!verificarCss('ul-product-list')) this.agregarCss();
            this.selectedProduct = [];
            this.createHeader();
            this.createMain();
            this.createFooter();
            this.agregarCss();
        }

    getElement() {
        return this.element;
    }
    agregarCss(){
        const style = document.createElement('style');
        style.textContent = `
        .search-container {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 400px;
            width: calc(100vw - 32px);
            margin: 0 auto;
            margin-top: 40px;
            position: sticky;
            top: 0;
            padding: 10px;

            .search-input {
                width: 100%;
                height: 48px;
                padding: 16px;
                margin-bottom: 16px;
                border: 1px solid #ccc;
                border-radius: 50px;
                font-size: 16px;

                &::placeholder {
                    text-align: center;
                }
            }

            .search-button {
                width: 100%;
                height: 48px;
                padding: 12px;
                background-color: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);

                &:hover {
                    background-color: var(--color-hover);
                }

                &:active {
                    transform: scale(95%);
                }
            }

            .ul-product-list {
                width: calc(100vw - 32px);
                max-width: 400px;
                padding: 0;
                margin-top: 16px;
                list-style-type: none;
                text-align: left;
                // max-height: var(--product-list-max-height, calc(100vh - 350px));
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
        
        const productSearch = createSearchContainer(this.onProductClick.bind(this), RadioProductList, 'calc(100vh - 330px)');
        main.appendChild(productSearch);


        // Container para la lista de productos
        this.resultContainer = document.createElement('div');
        this.resultContainer.classList.add('search-results');
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
        this.updateProductList('');
    }

    updateProductList(searchWord) {
        this.resultContainer.innerHTML = ''; 
        const productList = new RadioProductList(searchWord, this.onProductClick.bind(this));
        const productListElement = productList.render();

        if (productListElement.children.length === 0) {
            new Notification('../../../img/emojis/asombro.png', '¡No hay producto en stock!', 'error');
        }

        this.resultContainer.appendChild(productListElement);
    }
}

    new EliminarProductosPage(true);
