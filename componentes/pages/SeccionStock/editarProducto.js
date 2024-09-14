import { Header } from '../../js/header.js';
import { iconoVolver } from "../../js/iconosSVG.js";
import { CardEditProduct } from '../../js/cardEditProduct.js';
import { Notification } from '../../js/notificacion.js';
import { createSearchContainerCard, RadioProductList } from '../../js/utils.js';
import { Producto } from '../../js/producto.js';
import { navigateToPage } from '../../js/navigateToPage.js';

export class EditProductPage {
    constructor(productId) {
        document.body.innerHTML = ''; 
        this.productId = productId;
        this.createHeader();
        this.createMain();
        this.agregarCss();
    }
    agregarCss() {
        const style = document.createElement("style");
        style.textContent = ` 
            .fondo-results {
                position: fixed;
                top: 135px;
                left: 50%;
                transform: translate(-50%,0);
                width: calc(100vw - 32px);
                max-width: 400px;
                margin: 0 auto;
                height: 100%;
                background-color: rgba(255, 255, 255, 1);
                z-index: 1000;
                display: none;
            }
            
            .search-results {
                width: calc(100vw - 32px);
                max-width: 400px;
                max-height: calc(100vh - 160px);
                height: 100vh;
                overflow-y: auto;
                background-color: #fff;
                position: absolute;
                top: 0px;
                left: 50%;
                transform: translate(-50%, 0);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .ul-product-list {
                margin-top: 16px;
                list-style-type: none;
                text-align: left;
                background-color: #fff;
            }
            .li-product-list {
                border-bottom: 1px solid var(--secondary-color);
                padding: 8px 0;
                padding-left: 16px;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }
            .li-product-list:first-child {
                border-top: 1px solid var(--secondary-color);
            }
        `;
        document.head.appendChild(style);
    }
    createHeader() {
        const header = new Header('Editar Producto', iconoVolver, null, () => navigateToPage('MenuStock'));
        document.body.appendChild(header.getElement());
    }

    createMain() {
        const main = document.createElement("main");

        const productSearch = createSearchContainerCard(
            this.handleSearch.bind(this),
            RadioProductList,
            "calc(100vh - 200px)"
        );
        main.appendChild(productSearch);

        this.fondoResults = document.createElement("div");
        this.fondoResults.classList.add("fondo-results");

        this.resultContainer = document.createElement("div");
        this.resultContainer.classList.add("search-results");
        this.fondoResults.appendChild(this.resultContainer);

        main.appendChild(this.fondoResults);

        document.body.appendChild(main);

        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        // const selectedProductName = selectedProduct ? selectedProduct.nombre : 'Nombre_del_producto';
        
        
    

        this.cardEditProduct = new CardEditProduct(
            // selectedProductName,
            'Guardar', 
            'Cancelar', 
            this.btnPrimaryCallback.bind(this), 
            this.btnSecondaryCallback.bind(this)
        );

        main.appendChild(this.cardEditProduct.getElement());


        this.loadProductData();
    }
    
    async loadProductData() {
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
        const productData = productosGuardados.find(product => product.id == this.productId);
        if (productData) {
            this.fillProductData(productData);
        } else {
            new Notification('../../../img/emojis/pare.png', 'No se pudo cargar el producto.', 'error');
        }
    }

    fillProductData(productData) {
        const producto = Producto.fromJSON(productData);
        this.cardEditProduct.onProductClick(producto);
    }

    async btnPrimaryCallback(event) {
        if (event) event.preventDefault();
        
        if (this.cardEditProduct.validarCampos()) {
            try {
                const datosProducto = this.cardEditProduct.obtenerDatosProducto();
                const guardadoExitoso = await this.guardarCambiosProducto(datosProducto);
                if (guardadoExitoso) {
                    new Notification('../../../img/emojis/like.png', '¡Producto actualizado exitosamente!', 'success');
                    navigateToPage('MenuStock');
                } else {
                    new Notification('../../../img/emojis/pare.png', '¡Ups! Hubo un fallo al guardar los cambios. Por favor, intenta de nuevo.', 'error');
                }
            } catch (error) {
                new Notification('../../../img/emojis/pare.png', 'Error inesperado al actualizar el producto', 'error');
            }
        }
    }

    async guardarCambiosProducto(datosProducto) {
        try {
            const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
            const index = productosGuardados.findIndex(product => product.id == this.productId);
            if (index !== -1) {
                productosGuardados[index] = { id: this.productId, ...datosProducto };
                localStorage.setItem('productos', JSON.stringify(productosGuardados));
                return true;
            } else {
                new Notification('../../../img/emojis/triste.png', '¡Ups! Producto no encontrado.', 'error');
                return false;
            }
        } catch (error) {
            new Notification('../../../img/emojis/triste.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
            return false;
        }
    }

    btnSecondaryCallback(event) {
        console.log('Click en btn cancelar');
        navigateToPage('MenuStock');
    }

    handleSearch(searchWord) {
        this.updateProductList(searchWord);
    }

    onClick() {
        if (this.cardEditProduct.isBuscarMode) {
            // Lógica para realizar la búsqueda
        } else {
            this.cardEditProduct.resetToBuscarMode();
            this.cardEditProduct.limpiarInputs();
        }
    }
    // Se ejecuta cuando el usuario hace clci sobre radiobtn
    onProductClick(producto, event) {
        if (event.target.closest(".product-radio")) {
            localStorage.setItem("selectedProduct", JSON.stringify(producto)); //guardo el prod. elegido en LStorage
            this.updateCardTitle(producto.nombre); // Actualizo el título de la card con el nombre del prod.


            this.hideFondoResults(); // Oculto los resultados
        }
    }

    updateCardTitle(productName) {
        this.cardEditProduct.title = productName;
        const titleElement = this.cardEditProduct.getElement().querySelector('.card-title');
        if (titleElement) {
            titleElement.textContent = productName;
        }
    }

    updateProductList(searchWord) {
        this.resultContainer.innerHTML = "";
        const productList = new RadioProductList(
            searchWord,
            this.onProductClick.bind(this)
        );
        const productListElement = productList.render();

        if (productListElement.children.length === 0) {
            new Notification(
                "../../../img/emojis/asombro.png",
                "¡No hay producto en stock!",
                "error"
            );
        } else {
            this.resultContainer.appendChild(productListElement);
            this.showFondoResults();
        }
    }

    showFondoResults() {
        this.fondoResults.style.display = 'block';
    }

    hideFondoResults() {
        this.fondoResults.style.display = 'none';
    }

}

// Inicialización de la página
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
    new EditProductPage(productId);
} else {
    new Notification('../../../img/emojis/asombro.png', 'ID de producto no encontrado.', 'error');
    navigateToPage('MenuStock');
}