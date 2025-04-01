import { Header } from "../../js/header.js";
import { Footer } from "../../js/footer.js";
import Main from "../../js/main.js";
import { navigateToPage } from "../../js/navigateToPage.js";
import { iconoVolver, iconoDescargar } from "../../js/iconosSVG.js"
import { FabButton, handleDownloadClick, verificaContenedorPrincipal } from '../../js/utils.js';
// import { ButtonContainer } from "../../js/btnsContainer.js";
import { TablaEncabezado, MostrarMontoTotal, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"

export class PlanillaVtasdelDia {
    constructor(){
        this.contenedorPrincipal = verificaContenedorPrincipal();
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarMonto();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createFooter();
    }

    createHeader=()=>{
        this.header = new Header("Ventas del Día", iconoVolver, null, ()=>{ navigateToPage('MenuVentas'); });
        this.contenedorPrincipal.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        this.contenedorPrincipal.appendChild(this.main.getElement());
        return
    }

    createMostrarMonto= ()=>{
        const mainPedido=document.querySelector("main");
        this.monto = new MostrarMontoTotal();
        mainPedido.appendChild(this.monto.getElement());
    }

    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Producto", "Cant.")
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
        this.footer = new TablaFooter("--")
        mainPedido.appendChild(this.footer.getElement());
    }

    createFooter() {
        this.footer = new Footer();
        this.createBtnFlotante();
        this.contenedorPrincipal.appendChild(this.footer.getElement());
    }

    createBtnFlotante= ()=>{
        this.btn = new FabButton(iconoDescargar, ()=>handleDownloadClick("Ventas_de_hoy"));
        this.footer.getElement().appendChild(this.btn.getElement());
    }
}

new PlanillaVtasdelDia();
