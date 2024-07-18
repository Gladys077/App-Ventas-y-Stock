import { Header, iconoVolver, iconoMenu, navigateToMenu } from '../header.js';
import { CardVtasPorProducto } from '../cardVtasPorProducto.js';
import { Footer } from '../footer.js';
import { FabButton } from '../utils.js';
import { iconoDescargar } from '../iconosSVG.js';
import { Notification } from '../notificacion.js';

export class VentasPorProductoPage {
    constructor() {
        this.ventasPorProducto = null;
        this.createHeader();
        this.createMain();
        this.createFooter();
        this.createPage();
        this.header;
        this.ventasPorProducto;
    }
    createHeader() {
        this.header = new Header('Unidades vendidas', iconoVolver, iconoMenu, null, function(){ navigateToMenu('ventas');});
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const selectedProductName = 'Nombre_del_producto'; // Aquí debo obtener el nombre del producto seleccionado
        this.ventasPorProducto = new CardVtasPorProducto('Nombre_del_producto', 'Buscar', () => this.onClick(), 'Unidades Vendidas');
        document.body.appendChild(this.ventasPorProducto.getElement());
    }

    createFooter() {
      this.footer = new Footer();
      document.body.appendChild(this.footer.getElement());
  
      const downloadButton = new FabButton(iconoDescargar, this.handleDownloadClick);
      this.footer.addFabButton(downloadButton);
  }

    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
        const footerElement = document.querySelector('footer');
    }
  
    onClick() {
      console.log('btn clickeado');
      if (this.ventasPorProducto){
        this.ventasPorProducto.toggleLastValue;
      }
    }
  }
  
  new VentasPorProductoPage();