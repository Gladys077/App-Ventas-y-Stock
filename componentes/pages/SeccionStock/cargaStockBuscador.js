import { Header } from '../../js/header.js';
import { createSearchContainer, RadioProductList, ExtendedFabButton, verificarCss } from '../../js/utils.js';
import { Footer } from '../../js/footer.js';
import { iconoAgregarArticulo, iconoVolver } from '../../js/iconosSVG.js';
import { ModalInput } from '../../js/modalInput.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { Notification } from '../../js/notificacion.js';

export class CargarStockSearchPage {
    constructor() {
        document.body.innerHTML = ''; 
        this.selectedProducts = [];
        this.createHeader();
        this.createMain();
        this.createFooter();
        // if (!verificarCss("ul-product-list"))  
            this.agregarCss();
    }

    getElement() {
        return this.element;
    }

     agregarCss() {
        const style = document.createElement("style");
        style.textContent = ` 
            .search-results-stock {
                max-width: 200px;
                }

            .ul-product-list {
                margin-top: 16px;
                list-style-type: none;
                text-align: left;
                overflow-y: auto; 
                overflow-x: hidden;
                background-color: #fff;
            }

            .li-product-list {
                border-bottom: 1px solid var(--secondary-color);
                padding: 8px 0;
                padding-left: 16px;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }

            .li-product-list:first-child{
                border-top: 1px solid var(--secondary-color);
            }
        }

	    `;
        document.head.appendChild(style);
  }

    createHeader() {
        const header = new Header('Cargar stock por producto', iconoVolver, null, function() { navigateToPage('MenuStock')});
        document.body.appendChild(header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const productSearch = createSearchContainer(this.onProductClick.bind(this), RadioProductList, 'calc(100vh - 290px)');
        main.appendChild(productSearch);

        // Container para la lista de productos
        this.resultContainer = document.createElement('div');
        this.resultContainer.classList.add('search-results-stock');
        main.appendChild(this.resultContainer);

        document.body.appendChild(main);
    }
    
    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());

        // Fab extended 
        const iconSVG = iconoAgregarArticulo; 
        const extendedFabButton = new ExtendedFabButton(iconSVG, 'Artículo nuevo', () => navigateToPage('NuevoProducto'));
    
        const footerElement = document.querySelector('footer');
        footerElement.appendChild(extendedFabButton.getElement());
    }


    onProductClick(producto, event) {
        if (event.target.closest('.product-radio')) {
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

                new Notification('../../img/emojis/like.png', 'Agregado a tu stock', 'success');
            }, '1');
    }

    updateProductList(searchWord) {
        this.resultContainer.innerHTML = ''; 
        const productList = new RadioProductList(searchWord, this.onProductClick.bind(this), 'calc(100vh - 60px)');
        const productListElement = productList.render();

        if (productListElement.children.length === 0) {
            new Notification('../../img/emojis/asombro.png', '¡No hay producto en stock!', 'error');
        }

        this.resultContainer.appendChild(productListElement);
    }
}

new CargarStockSearchPage();




