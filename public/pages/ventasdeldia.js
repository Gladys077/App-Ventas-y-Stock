import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, MostrarMontoTotal, TablaDetalles, Ventasdeldia, TablaFooter, BtnFlotante } from "../../js/registros.js"

 

export class PlanillaVtasdelDia {
export class PlanillaVtasdelDia {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarMonto();
        this.createMostrarMonto();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createBtnFlotante();
        

    }

    createHeader=()=>{
        this.header = new Header("Ventas del Día", iconoVolver, iconoMenu,null,function(){ navigateToMenu('stock'); });
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

    createMostrarMonto= ()=>{
        const mainPedido=document.querySelector("main");
        this.monto = new MostrarMontoTotal();
        mainPedido.appendChild(this.monto.getElement());
    }

    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Producto", "Cant.")
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

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante("descargar");
        mainPedido.appendChild(this.btn.getElement());

    }


}

new PlanillaVtasdelDia();
new PlanillaVtasdelDia();