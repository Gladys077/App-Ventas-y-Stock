import { Header } from '../../js/header.js';
import { CardVtasPorProducto } from '../../js/cardVtasPorProducto.js';
import { Footer } from '../../js/footer.js';
import { FabButton} from '../../js/utils.js';
import { iconoVolver, iconoDescargar } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { Notification } from '../../js/notificacion.js';

export class VentasPorFechaPage {
    constructor() {
        document.body.innerHTML = ''; 

        this.ventasPorFecha = null;
        this.createHeader();
        this.createMain();
        this.createFooter();
    }
    createHeader() {
        this.header = new Header('Ventas por fecha', iconoVolver, null, ()=>navigateToPage('MenuVentas'));
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        // const selectedProductName = 'Nombre_del_producto'; 
        this.ventasPorFecha = new CardVtasPorProducto('', 'Buscar', () => this.onClick, true, 'Importe facturado');
        this.ventasPorFecha.element.className.add('espacio-encima'); 

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

