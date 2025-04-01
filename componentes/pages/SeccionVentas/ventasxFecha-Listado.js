import { Header } from "../../js/header.js";
import { iconoVolver, iconoMenu, iconoDescargar } from "../../js/iconosSVG.js";
import { navigateToPage } from "../../js/navigateToPage.js"
import Main from "../../js/main.js";
import { TablaEncabezado, FiltroFecha, TablaDetalles, TablaFooter } from "../../js/registros.js"
import { Footer } from '../../js/footer.js';
import { FabButton, handleDownloadClick, verificaContenedorPrincipal } from '../../js/utils.js';
 ///importe total de ese día

export class PlanillaVtasPorFecha {
    constructor(){
        this.contenedorPrincipal = verificaContenedorPrincipal();
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createFiltroFecha();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createFooter();
    }

    createHeader=()=>{
        this.header = new Header("Ventas por Fecha", iconoVolver, iconoMenu, ()=>{ navigateToPage('VentasPorFecha') }, ()=>{ navigateToPage('MenuVentas') });
        this.contenedorPrincipal.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        this.contenedorPrincipal.appendChild(this.main.getElement());
        return
    }

    createFiltroFecha= ()=>{
        const mainPedido=document.querySelector("main");
        this.filtro = new FiltroFecha()
        mainPedido.appendChild(this.filtro.getElement())
    }
    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Producto",  "Cantidad")
        mainPedido.appendChild(this.encabezado.getElement());
    }

    createTablaDetalles= ()=>{
        const mainPedido=document.querySelector("main");
        this.detalles= new TablaDetalles();
        mainPedido.appendChild(this.detalles.getElement());
    }

    createLineaArticulos= ()=>{}///Acá se debe conectar a la bd y hacer el foreach o map


    createTablaFooter= ()=>{
        const mainPedido=document.querySelector("main");
        this.footer = new TablaFooter()
        mainPedido.appendChild(this.footer.getElement());
    }

    createFooter() {
        this.footer = new Footer();
        this.createBtnFlotante();
        this.contenedorPrincipal.appendChild(this.footer.getElement());
    }
         
    createBtnFlotante= ()=>{
        const downloadButton = new FabButton(iconoDescargar, ()=> handleDownloadClick("Ventas_desde_hasta"));
        this.footer.getElement().appendChild(downloadButton.getElement());
    }

}

new PlanillaVtasPorFecha();