import { Header, iconoVolver, iconoMenu, navigateToMenu } from '../js/header.js';
import { CardNewProduct } from '../js/cardNewProduct.js';
import { Notification } from '../js/notification.js';

export class NewProductPage {
    constructor() {
        this.createHeader();
        this.createMain();
        this.createPage();
    }

    createHeader() {
        this.header = new Header('Nuevo Producto', iconoVolver, iconoMenu, null, function(){ navigateToMenu('stock'); });
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        this.cardNewProduct = new CardNewProduct('Guardar', 'Cancelar', this.btnPrimaryCallback.bind(this), this.btnSecondaryCallback.bind(this));
        document.body.appendChild(this.cardNewProduct.getElement());
    }

    btnPrimaryCallback() {
        this.cardNewProduct.guardarProducto();
        console.log('click en btn guardar');
        const guardado = new Notification('../img/emojis/ok.png', '¡Listo, guardado!', 'success');
        guardado.show();
    }

    btnSecondaryCallback() {
        this.cardNewProduct.resetForm();
        console.log('click btn cancelar')
    }

    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');

        // Verifica que los elementos existan antes de tratar de manipularlos
        // if (headerElement && mainElement) {
        //     headerElement.innerHTML = '';
        //     mainElement.innerHTML = '';

        //     headerElement.appendChild(this.header.getElement());
        //     mainElement.appendChild(this.cardNewProduct.getElement());
        // } else {
        //     console.error('Los elementos header y main no se encontraron en el DOM.');
        // }
    }
}

new NewProductPage();
