import { Header, iconoVolver, iconoMenu, navigateToMenu } from '../js/header.js';
import { CardVtasPorProducto } from '../js/cardVtasPorProducto.js';

export class VentasPorProductoPage {
    constructor() {
        this.ventasPorProducto = null;
        this.createHeader();
        this.createMain();
        this.createPage();
    }
    createHeader() {
        this.header = new Header('Unidades vendidas', iconoVolver, iconoMenu, null, function(){ navigateToMenu('ventas');});
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        this.ventasPorProducto = new CardVtasPorProducto('Nombre_del_producto', 'Buscar', () => this.onClick(), false);
        document.body.appendChild(this.ventasPorProducto.getElement());
    }
    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
    }
  
    onClick() {
      console.log('btn clickeado');
      if (this.ventasPorProducto){
        this.ventasPorProducto.toggleLastValue;
      }
    }
  }
  
  new VentasPorProductoPage();