import { Header, iconoVolver, iconoMenu, navigateToMenu } from '../header.js';
import { CardVtasPorProducto } from '../cardVtasPorProducto.js';
import { Footer } from '../footer.js';
import { FabButton } from '../utils.js';
import { iconoDescargar } from '../iconosSVG.js';
import { Notification } from '../notificacion.js';

export class VentasPorFechaPage {
    constructor() {
        this.ventasPorFecha = null;
        this.createHeader();
        this.createMain();
        this.createFooter();
    }
    createHeader() {
        this.header = new Header('Ventas por fecha', iconoVolver, iconoMenu, null, function(){ navigateToMenu('ventas');});
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const selectedProductName = 'Nombre_del_producto'; // Aquí debo obtener el nombre del producto seleccionado
        this.ventasPorFecha = new CardVtasPorProducto('', 'Buscar', () => this.onClick, true, 'Importe facturado');
        document.body.appendChild(this.ventasPorFecha.armarCardVtasPorProducto());
    }

    createFooter() {
      this.footer = new Footer();
      document.body.appendChild(this.footer.getElement());
  
      const downloadButton = new FabButton(iconoDescargar, this.handleDownloadClick);
      this.footer.getElement().appendChild(downloadButton.getElement());
  }

  
    onClick() {
      console.log('btn clickeado');
      if (this.ventasPorFecha){
        this.ventasPorFecha.toggleLastValue;
      }
    }
  }
  
  new VentasPorFechaPage();

