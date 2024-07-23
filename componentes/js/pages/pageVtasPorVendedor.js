import { Header, iconoVolver } from '../header.js';
import { CardVtasPorVendedor } from '../cardVtasPorVendedor.js';
import { Footer } from '../footer.js';
import { FabButton } from '../utils.js';
import { iconoDescargar } from '../iconosSVG.js';
import { Notification } from '../notificacion.js';

// const { jsPDF } = window.jspdf;

export class VentasPorVendedorPage {
    constructor() {
        if (!document.querySelector('.card')){
        this.createHeader();
        this.createMain();
        this.createFooter();
        this.createPage();

        // Obtengo la lista de los vendedores y creo la con esa info
        const SellersList = this.getSellersList();
        this.cardVtasPorVendedor = new CardVtasPorVendedor(SellersList, 'DIA', 'Buscar', this.handleSearchBBDD.bind(this));
        
        //para probar función de descarga:
        this.salesData = [];
    }}

    createHeader() {
        this.header = new Header('Ventas por vendedor', iconoVolver, null, null, null);
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        this.cardVtasPorVendedor = new CardVtasPorVendedor('nombre_del_vendedor', 'DIA', 'Buscar', this.handleSearchBBDD.bind(this));
        document.body.appendChild(this.cardVtasPorVendedor.getElement());
    }

    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());
    
        const downloadButton = new FabButton(iconoDescargar, this.handleDownloadClick.bind(this));
       
        this.footer.getElement().appendChild(downloadButton.getElement());
    }
    
    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
    }

    // Métodos para buscar en la BBDD
    handleSearchBBDD(seller, date) {
        console.log('Buscando  ventas de: ', seller, 'en la fecha: ', date);
        // Aquí iría la lógica para buscar en la BBDD
        this.salesDate = this.datosDePrueba(seller, date);
        console.log('Resultados: ', this.salesDate);
        if (this.salesDate == ''){
        new Notification('../img/emojis/pare.png', 'Sin ventas en esa fecha', 'success');
    }
    }


    getSellersList() {
        const data = this.datosDePrueba();
        const SellersList = [...new Set(data.map(item => item.seller))];
        return SellersList;
    }
    datosDePrueba(seller, date){
        const data = [
            { date: '2024-07-10', seller: 'Lionel Messi', amount: 5000 },
            { date: '2024-07-01', seller: 'Dibu Martinez', amount: 4500 },
            { date: '2024-07-14', seller: 'Juan Pérez', amount: 1500 },
            { date: '2024-07-14', seller: 'María García', amount: 2000 },
            { date: '2024-07-15', seller: 'Juanita Pérez', amount: 1800 },
            { date: '2024-07-15', seller: 'Mariano García', amount: 2200 },
        ];

        if (seller || date) {
            return data.filter(sale =>
                (!seller || sale.seller === seller) && (!date || sale.date === date)
            );
        }
        return data;
    }

    handleDownloadClick() {
        console.log('Descargando contenido...');
        if (this.salesData.length === 0) {
            new Notification('../../../img/emojis/asombro.png', 'No hay datos para descargar', 'error');
            return;
        }

        this.generatePDF(this.salesData);
        new Notification('../../../img/emojis/like.png', '¡Descarga exitosa!', 'success');
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