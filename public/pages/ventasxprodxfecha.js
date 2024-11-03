import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, MostrarProducto, FiltroFecha, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"

 

export class PlanillaVtasxFecha {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarNombreProducto();
        this.createFiltroFecha();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createBtnFlotante();
        

    }
//Listado venta por producto
    createHeader=()=>{
        this.header = new Header("Listado por Fecha", iconoVolver, iconoMenu,null,function(){ loadView("pedidoactual")});
        document.body.appendChild(this.header.getElement());
        return
    }
///Agregar nombre producto
    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    createMostrarNombreProducto= ()=>{
        const mainPedido=document.querySelector("main");
        this.producto= new MostrarProducto();
        mainPedido.appendChild(this.producto.getElement());
    }

    createFiltroFecha= ()=>{
        const mainPedido=document.querySelector("main");
        this.filtro = new FiltroFecha()
        mainPedido.appendChild(this.filtro.getElement())
    }

    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Fecha","Cant.")
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
        this.btn = new BtnFlotante("descargar","contenedor-btn-flotante",()=>{alert("descarga exitosa")});
        mainPedido.appendChild(this.btn.getElement());

    }


}

new PlanillaVtasxFecha();