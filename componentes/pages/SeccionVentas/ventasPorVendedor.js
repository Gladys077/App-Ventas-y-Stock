import { Header } from '../../js/header.js';
import { iconoVolver, iconoDescargar } from '../../js/iconosSVG.js'
import { CardVtasPorVendedor } from '../../js/cardVtasPorVendedor.js';
import { Footer } from '../../js/footer.js';
import { FabButton } from '../../js/utils.js';
import { Notification } from '../../js/notificacion.js';
import { navigateToPage } from '../../js/navigateToPage.js';

export class VentasPorVendedorPage {
    constructor() {
        document.body.innerHTML = ''; 

        this.createHeader();
        this.createMain();
        this.createFooter();

        // Obtengo la lista de vendedores y actualizo la tarjeta
        const SellersList = this.getSellersList();
        // this.cardVtasPorVendedor.updateSellersList(SellersList); // Actualiza la lista de vendedores en la tarjeta
        
        this.salesDate = [];
    }

    createHeader() {
        this.header = new Header('Ventas por vendedor', iconoVolver, null, () => { navigateToPage('MenuVentas')});
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const mainElement = document.createElement('main'); 
        this.cardVtasPorVendedor = new CardVtasPorVendedor('', 'DIA', 'Buscar' , 'cambioDePassword'); // Inicializa con una lista vacía
        mainElement.appendChild(this.cardVtasPorVendedor.getElement());
        document.body.appendChild(mainElement); 
    }

    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());
    
        const downloadButton = new FabButton(iconoDescargar, this.handleDownloadClick.bind(this));
        this.footer.getElement().appendChild(downloadButton.getElement());
    }

    handleSearchBBDD(seller, date) {
        console.log('Buscando ventas de:', seller, 'en la fecha:', date);
        
        this.salesDate = this.datosDePrueba(seller, date);

        if (this.salesDate.length === 0) {
            new Notification('../../../img/emojis/pare.png', 'Sin ventas en esa fecha', 'success');
            return;
        }

        const totalSales = this.salesDate.reduce((total, sale) => total + sale.amount, 0);
        this.updateDisplay(totalSales);
    
        console.log('Resultados:', this.salesDate);
    }

    updateDisplay(totalSales) {
        const displayElement = document.querySelector('.total-sales-display');
        displayElement.textContent = `Total: $${totalSales}`;
    }

    getSellersList() {
        const data = this.datosDePrueba();
        const SellersList = [...new Set(data.map(item => item.seller))];
        return SellersList;
    }

    datosDePrueba(seller, date) {
        const data = [
            { date: '2024-07-10', seller: 'Lionel Messi', amount: 5000 },
            { date: '2024-07-10', seller: 'Dibu Martinez', amount: 4500 },
            { date: '2024-07-10', seller: 'Juan Pérez', amount: 1500 },
            { date: '2024-07-10', seller: 'María García', amount: 2000 },
            { date: '2024-07-10', seller: 'Juanita Pérez', amount: 1800 },
            { date: '2024-07-10', seller: 'Mariano García', amount: 2200 },
        ];

        if (seller || date) {
            return data.filter(sale =>
                (!seller || sale.seller === seller) && (!date || sale.date === date)
            );
        }
        return data;
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
