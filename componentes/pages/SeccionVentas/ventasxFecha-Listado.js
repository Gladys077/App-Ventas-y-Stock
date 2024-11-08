import { Header } from "../../js/header.js";
import { iconoVolver, iconoMenu } from "../../js/iconosSVG.js";
import { navigateToPage } from "../../js/navigateToPage.js"
import Main from "../../js/main.js";
import { TablaEncabezado, FiltroFecha, TablaDetalles, TablaFooter } from "../../js/registros.js"

 ///importe total de ese día

export class PlanillaVtasPorFecha {
    constructor(){
        document.body.innerHTML = '';
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createFiltroFecha();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
    }

    createHeader=()=>{
        this.header = new Header("Ventas por Fecha", iconoVolver, iconoMenu, ()=>{ navigateToPage('VentasPorFecha') }, ()=>{ navigateToPage('MenuVentas') });
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
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

}

new PlanillaVtasPorFecha();