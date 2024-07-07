import { Header, iconoVolver, iconoMenu, navigateToMenu } from './header.js';
import { CardNewProduct } from './cardNewProduct.js';

export class NewProductPage {
    constructor() {
        this.createHeader();
        this.createMain();
        document.addEventListener('DOMContentLoaded', () =>{
            this.createPage();
        });
    }

    createHeader() {
        this.header = new Header('Nuevo Producto', iconoVolver, iconoMenu, null, function(){ navigateToMenu('stock'); });
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        this.cardNewProduct = new CardNewProduct('Guardar', 'Cancelar', this.onPrimaryBtnClick.bind(this), this.onSecondaryBtnClick.bind(this));
        document.body.appendChild(this.cardNewProduct.getElement());
    }



    onPrimaryBtnClick() {
        this.cardNewProduct.guardarProducto();
        console.log('click en btn guardar');
    }

    onSecondaryBtnClick() {
        this.cardNewProduct.resetForm();
        console.log('click btn cancelar')
    }

    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');

        // Verifica que los elementos existan antes de tratar de manipularlos
        if (headerElement && mainElement) {
            headerElement.innerHTML = '';
            mainElement.innerHTML = '';

            headerElement.appendChild(this.header.getElement());
            mainElement.appendChild(this.cardNewProduct.getElement());
        } else {
            console.error('Los elementos header y main no se encontraron en el DOM.');
        }
    }
}

new NewProductPage();
