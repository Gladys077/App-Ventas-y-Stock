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
      this.footer.getElement().appendChild(downloadButton.getElement());
  }

    onClick() {
      console.log('btn clickeado');
      if (this.ventasPorProducto){
        this.ventasPorProducto.toggleLastValue;
      }
    }
  }
  
  new VentasPorProductoPage();

  //---------------------------VENTAS POR PRODUCTOS---------------------------
//           >>>>>>> CON cuadro 'unidades vendidas' <<<<<<
// const miCardConUnidadesVendidas = new CardVtasPorProducto('nombre_del_producto', 'Buscar', onClick, true);
// mainElement.appendChild(miCardConUnidadesVendidas.armarCardVtasPorProducto());

//           >>>>>>> SIN cuadro de 'unidades vendidas' <<<<<<<
// const miCardSinUnidadesVendidas = new CardVtasPorProducto('nombre_del_producto', 'Buscar', onClick, false);
// mainElement.appendChild(miCardSinUnidadesVendidas.armarCardVtasPorProducto());


//---------------------------  CARD VENTAS por FECHA - Importe facturado  ---------------------------
// const miCardVentasPorFecha = new CardVtasPorProducto('', 'Buscar', onClick, true, 'Importe facturado')
// mainElement.appendChild(miCardVentasPorFecha.armarCardVtasPorProducto());