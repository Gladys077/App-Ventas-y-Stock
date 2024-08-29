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
        if(!verificarCss('search-container')) this.agregarCss();
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
        }

        .ul-product-list {
            width: calc(100vw - 32px);
            max-width: 400px;
            padding: 0 ;
            margin-top: 16px;
            list-style-type: none;
            text-align: left;
            /* max-height: calc(100vh - 350px);  */
            max-height: var(--product-list-max-height, calc(100vh - 350px)); 
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

	    `
        document.head.appendChild(style);
    }

    createHeader() {
        const header = new Header('Vender', iconoVolver, null, function() { navigateToPage('MenuVentas')});
        document.body.appendChild(header.getElement());
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

                new Notification('../../img/emojis/like.png', 'Producto añadido al carrito', 'success');
            }, '1');
    }

    updateProductList(searchWord) {
        this.resultContainer.innerHTML = ''; 
        const productList = new ProductList(searchWord, this.onProductClick.bind(this));
        const productListElement = productList.render();

        if (productListElement.children.length === 0) {
            new Notification('../../img/emojis/asombro.png', '¡No hay producto en stock!', 'error');
        }

        this.resultContainer.appendChild(productListElement);
    }
}

new VenderProductSearchPage();




