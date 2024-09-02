import { Header } from '../../js/header.js';
import { iconoVolver } from "../../js/iconosSVG.js";
import { CardEditProduct } from '../../js/cardEditProduct.js';
import { Notification } from '../../js/notificacion.js';
import { Producto } from '../../js/producto.js';
import { navigateToPage } from '../../js/navigateToPage.js';

export class EditProductPage {
    constructor(productId) {
        document.body.innerHTML = ''; 
        this.productId = productId;
        this.createHeader();
        this.createMain();
    }

    createHeader() {
        const header = new Header('Editar Producto', iconoVolver, null, () => navigateToPage('MenuStock'));
        document.body.appendChild(header.getElement());
    }

    createMain() {
        this.cardEditProduct = new CardEditProduct(
            'Guardar', 
            'Cancelar', 
            this.btnPrimaryCallback.bind(this), 
            this.btnSecondaryCallback.bind(this)
        );
        document.body.appendChild(this.cardEditProduct.getElement());
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