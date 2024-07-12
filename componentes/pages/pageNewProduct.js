import { Header, iconoVolver, iconoMenu, navigateToMenu } from '../js/header.js';
import { CardNewProduct } from '../js/cardNewProduct.js';
import { Notification } from '../js/notificacion.js';

export class NewProductPage {
    constructor() {
        this.createHeader();
        this.createMain();
        this.createPage();
    }

    createHeader() {
        const header = new Header('Nuevo Producto', iconoVolver, iconoMenu, null, function(){ navigateToMenu('stock'); });
        document.body.appendChild(header.getElement());
    }

    createMain() {
        this.cardNewProduct = new CardNewProduct(
            'Guardar', 
            'Cancelar', 
            this.btnPrimaryCallback.bind(this), 
            this.btnSecondaryCallback.bind(this)
        );
        document.body.appendChild(this.cardNewProduct.getElement());
    }

    async btnPrimaryCallback(event) {
        if (event) event.preventDefault();
        
        if (this.cardNewProduct.validarCampos()) {
            try {
                const datosProducto = this.cardNewProduct.obtenerDatosProducto();
                const guardadoExitoso = await this.guardarProducto(datosProducto);
                if (guardadoExitoso) {
                    new Notification('../img/emojis/like.png', '¡Producto guardado exitosamente!', 'success');
                    this.cardNewProduct.resetForm();
                } else {
                    new Notification('../img/emojis/pare.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
                }
            } catch (error) {
                new Notification('../img/emojis/pare.png', 'Error inesperado al guardar el producto', 'error');
            }
        }
    }

    async guardarProducto(datosProducto) {
        try {
            const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
            productosGuardados.push(datosProducto);
            // localStorage.setItem('productos', JSON.stringify(productosGuardados));
            return true;
        } catch (error) {
            new Notification('../img/emojis/pare.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
            return false;
        }
    }

    btnSecondaryCallback(event) {
        console.log('Click en btn cancelar');
        this.cardNewProduct.resetForm();
    }

    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
    }
}

new NewProductPage();