import {iconoVolver, iconoMenu} from './header.js'
import { Header } from './header.js';
import { Footer } from './footer.js';
import { CardNewProduct } from './cardNewProduct.js';
import { ButtonContainer } from './btnsContainer.js'; // Asegúrate de importar el contenedor de botones

export class NewProductPage {
    constructor() {
         // Instancia del header
        this.header = new Header('Pedido finalizado', iconoVolver, iconoMenu, null, function(){ navigateToMenu('stock'); } ); 
        
        // Instancia del contenido main
        this.cardNewProduct = new CardNewProduct(); 

        // Instancia del pie de página con btns
        this.footer = new Footer('Guardar', 'Cancelar', () => this.onPrimaryBtnClick(), () => this.onSecondaryBtnClick()); 

        document.querySelector('main').appendChild(this.cardNewProduct.getElement());
        document.querySelector('footer').appendChild(this.footer.getElement());

        this.createPage(); // Método para renderizar la página completa
    }

    onGuardarClick() {
        console.log('cliqueó en btnGuardar')
    }
}

new NewProductPage(); // Crear una instancia de la página de nuevo producto
