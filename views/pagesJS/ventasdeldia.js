import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../componentes/js/header.js";
import Main from "../../componentes/js/main.js";
import { TablaEncabezado, MostrarMontoTotal, TablaDetalles, Ventasdeldia, TablaFooter } from "../js/registros.js"

 

export class PlanillaVtasdelDia {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarMonto();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        

    }

    createHeader=()=>{
        this.header = new Header("Ventas del Día", iconoVolver, iconoMenu,null,function(){ navigateToMenu('stock'); });
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
        this.footer = new TablaFooter()
        mainPedido.appendChild(this.footer.getElement());
    }

    


}

new PlanillaVtasdelDia();