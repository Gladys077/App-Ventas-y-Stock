import { Header, iconoVolver, iconoMenu } from '../js/header.js';
import { createSearchContainer, createList } from '../js/utils.js';
import { Footer } from '../js/footer.js';

export class ProductSearchPage {
    constructor() {
        this.createHeader();
        this.createMain();
        this.createFooter();
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Elige el producto', iconoVolver, iconoMenu, null, function() { navigateToMenu('ventas'); });
        document.body.appendChild(this.header.getElement());
    }

    createMain(){
        const main = document.createElement('main');
        
        const productSearch = createSearchContainer();
        main.appendChild(productSearch);

        document.body.appendChild(main);
    }
    
    createFooter(){
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());
    }

}
new ProductSearchPage;
