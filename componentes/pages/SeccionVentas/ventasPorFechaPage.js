import { Header } from '../../js/header.js';
import { CardVtasPorFecha } from '../../js/cardVtasPorFecha.js';
import { iconoVolver, iconoDescargar } from '../../js/iconosSVG.js';
import { Footer } from '../../js/footer.js';
import { FabButton, handleDownloadClick } from '../../js/utils.js';
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
        const main = document.createElement('main');
        // Creo el card y lo agrego al main
        this.ventasPorFecha = new CardVtasPorFecha('', 'Buscar', true,  () => this.onClick(), 'Importe facturado', 'Listado por fecha', 'ventasxFecha-Listado');
        const cardElement = this.ventasPorFecha.armarCardVtasPorProducto();
        main.appendChild(cardElement);

        // Agrego el main al body
        document.body.appendChild(main);
    }

    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());
        this.createBtnFlotante();
        }
    
    createBtnFlotante= ()=>{
        const downloadButton = new FabButton(iconoDescargar, ()=> handleDownloadClick("Ventas_por_fecha"));
        this.footer.getElement().appendChild(downloadButton.getElement());
        }
  
    onClick() {
      console.log('')
    }
  }
  
  new VentasPorFechaPage();

