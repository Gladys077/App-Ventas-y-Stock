import { Header } from "../../js/header.js";
import { Footer } from "../../js/footer.js";
import Main from "../../js/main.js";
import { navigateToPage } from "../../js/navigateToPage.js";
import { iconoVolver, iconoDescargar } from "../../js/iconosSVG.js"
import { TablaEncabezado, MostrarMontoTotal, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"

export class PlanillaVtasdelDia {
    constructor(){
        document.body.innerHTML = '';
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarMonto();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createFooter();
        this.createBtnFlotante();
    }

    createHeader=()=>{
        this.header = new Header("Ventas del Día", iconoVolver, null, ()=>{ navigateToPage('MenuVentas'); });
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
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

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante(iconoDescargar,"contenedor-btn-flotante", ()=>{alert("Descarga exitosa")});
        mainPedido.appendChild(this.btn.getElement());

    }

    createFooter() {
        this.footer = new Footer();
        const buttonContainer = new BtnFlotante(
                iconoDescargar,
                "contenedor-btn-flotante", 
                ()=>{alert("Descarga exitosa")}
            );        
            this.footer.getElement().appendChild(buttonContainer.getBtnFlotante());
            document.body.appendChild(this.footer.getElement());
        }
}

new PlanillaVtasdelDia();
