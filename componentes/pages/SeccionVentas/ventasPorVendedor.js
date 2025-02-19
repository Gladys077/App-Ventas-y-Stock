import { Header } from '../../js/header.js';
import { iconoVolver, iconoDescargar } from '../../js/iconosSVG.js'
import { CardVtasPorVendedor } from '../../js/cardVtasPorVendedor.js';
import { FabButton } from '../../js/utils.js';
import { Notification } from '../../js/notificacion.js';
import { navigateToPage } from '../../js/navigateToPage.js';

export class VentasPorVendedorPage {
    constructor() {
        document.body.innerHTML = ''; 
        window.ventasPage = this; // Guarda la instancia para acceder desde la card

        this.createHeader();
        this.createMain();

        // Obtengo la lista de vendedores y actualizo la card
        const vendedores = this.getSellersList() || [];
        this.cardVtasPorVendedor.actualizarListaVendedores(vendedores);
        
        this.salesDate = [];
    }

    createHeader() {
        this.header = new Header('Ventas por vendedor', iconoVolver, null, ()=>{ navigateToPage('MenuVentas')});
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main'); 

        // Creo el card y lo agrego al main
        this.cardVtasPorVendedor = new CardVtasPorVendedor('', 'DIA', 'Buscar' , 'VentasPorVendedorPlanilla'); // Inicializa con una lista vacía
        main.appendChild(this.cardVtasPorVendedor.getElement());

        // Creo el botón y lo agrego después del card
        const downloadButton = new FabButton(iconoDescargar, this.handleDownloadClick.bind(this));
        main.appendChild(downloadButton.getElement());  

        document.body.appendChild(main); 
    }

   

    handleSearchBBDD(seller, date) {
        console.log('Buscando ventas de:', seller, 'en la fecha:', date);
        
        this.salesDate = this.datosDePrueba(seller, date);

        if (this.salesDate.length === 0) {
            new Notification('../../../img/emojis/pare.png', 'En esa fecha no hubo ventas', 'error');
            // Limpiar el monto mostrado cuando no hay ventas
            this.cardVtasPorVendedor.actualizarMonto(0);
            return;
        }

        const totalSales = this.salesDate.reduce((total, sale) => total + sale.amount, 0);
        this.cardVtasPorVendedor.actualizarMonto(totalSales);
    
        console.log('Resultados:', this.salesDate);
    }

    updateDisplay(totalSales) {
        // const displayElement = document.querySelector('.total-sales-display');
        // displayElement.textContent = `Total: $${totalSales}`;
        this.cardVtasPorVendedor.actualizarMonto(totalSales);

    }


    handleDownloadClick() {
        if (this.salesDate.length > 0) {
            this.generatePDF(this.salesDate);
            new Notification('../../../img/emojis/like.png', '¡Descarga exitosa!', 'success');
        } else {
            new Notification('../../../img/emojis/asombro.png', 'No hay datos para descargar', 'error');
        }
    }

    generatePDF(data) {
        const doc = new jsPDF();
        
        doc.text('Reporte de Ventas por Vendedor', 10, 10);
        
        let yPosition = 20;
        data.forEach((sale, index) => {
            doc.text(`${index + 1}. ${sale.date} - ${sale.seller}: $${sale.amount}`, 10, yPosition);
            yPosition += 10;
        });
        
        doc.save('reporte_ventas_por_vendedor.pdf');
    }
}

new VentasPorVendedorPage();
