import {Header, iconoVolver} from '../js/header.js';
import { CardVtasPorVendedor } from '../js/cardVtasPorVendedor.js';

export class VentasPorVendedorPage {
    constructor() {
        this.createHeader();
        this.createMain();
        this.createPage();
    }
    createHeader() {
        this.header = new Header('Ventas por vendedor', iconoVolver, null, null, null);
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        this.cardVtasPorVendedor = new CardVtasPorVendedor('nombre_del_vendedor', 'DIA', 'Buscar', this.onClick);
        document.body.appendChild(this.cardVtasPorVendedor.getElement());
    }
    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
    }
  
    onClick() {
      console.log('btn clickeado');
    }
  }
  
  new VentasPorVendedorPage();