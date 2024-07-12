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
        if (event) event.preventDefault(); // Previene la recarga de la página
        console.group('Callback del botón Guardar');
        console.log('Botón Guardar clickeado');
        
        if (this.cardNewProduct.validarCampos()) {
          try {
            const guardadoExitoso = await this.cardNewProduct.guardarProducto();
            if (guardadoExitoso) {
              console.log('Producto guardado exitosamente');
              this.cardNewProduct.resetForm();
            } else {
              console.log('Error al guardar el producto');
            }
          } catch (error) {
            console.error('Error durante el guardado:', error);
            new Notification('../img/emojis/pare.png', 'Error inesperado al guardar el producto', 'error');
          }
        } else {
          console.log('Validación de campos fallida');
        }
        
        console.groupEnd();
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