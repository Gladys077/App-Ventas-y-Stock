import {Header, iconoVolver} from '../js/header.js';
import { CardVtasPorVendedor } from '../js/cardVtasPorVendedor.js';
import { Footer } from '../js/footer.js';
import { TabButton } from '../js/utils.js';
import { iconoDescargar } from '../js/iconosSVG.js';
import { Notification } from '../js/notificacion.js';

export class VentasPorVendedorPage {
    constructor() {
        this.createHeader();
        this.createMain();
        this.createFooter();
        this.createPage();
        this.handleDownloadClick();
        this.header;
        this.cardVtasPorVendedor;
        this.footer;
    }
    createHeader() {
        this.header = new Header('Ventas por vendedor', iconoVolver, null, null, null);
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        this.cardVtasPorVendedor = new CardVtasPorVendedor('nombre_del_vendedor', 'DIA', 'Buscar', this.onClick);
        document.body.appendChild(this.cardVtasPorVendedor.getElement());
    }

    createFooter() {
        this.footer = new Footer();
        document.body.appendChild(this.footer.getElement());
    
        const tabButton = new TabButton('?', () => {
            console.log('Botón TAB clickeado');
            this.handleDownloadClick();
        });
        this.footer.addTabButton(tabButton);
    }
    
    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
    }

    handleDownloadClick() {
        console.log('Descargando información...');
        // Lógica para descargar la información en formato PDF en el dispositivo
        setTimeout(() => {
            new Notification('../img/emojis/like.png', '¡Descarga exitosa!', 'success');
        }, 1800);
    }
  
    onClick() {
      console.log('btn clickeado');
    }
  }
  
  new VentasPorVendedorPage();