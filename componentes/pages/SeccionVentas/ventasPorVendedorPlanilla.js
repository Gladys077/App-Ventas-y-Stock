import { Header } from "../../js/header.js";
import { iconoVolver, iconoMenu, iconoDescargar } from '../../js/iconosSVG.js';
import Main from "../../js/main.js";
import { TablaEncabezado, MostrarVendedor, FiltroFecha, TablaDetalles,TablaFooter, BtnFlotante } from "../../js/registros.js"
 

export class PlanillaVtasxVendedor {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarVendedor();
        this.createFiltroFecha();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createBtnFlotante();
        

    }

    createHeader=()=>{
        this.header = new Header("Ventas por Vendedor", iconoVolver, iconoMenu,null,function(){ navigateToMenu('stock'); });
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    createMostrarVendedor= ()=>{
        const mainPedido=document.querySelector("main");
        this.vendedor = new MostrarVendedor();
        mainPedido.appendChild(this.vendedor.getElement());
    }

    createFiltroFecha= ()=>{
        const mainPedido=document.querySelector("main");
        this.filtro = new FiltroFecha()
        mainPedido.appendChild(this.filtro.getElement())
    }

    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Cant.", "Producto", "Total")
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

new PlanillaVtasxVendedor();