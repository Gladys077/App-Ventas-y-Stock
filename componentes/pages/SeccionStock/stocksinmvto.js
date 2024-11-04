import { Header } from "../../js/header.js";
import { iconoVolver, iconoMenu } from "../../js/iconosSVG.js";
import { navigateToPage } from "../../js/navigateToPage.js";
import Main from "../../js/main.js";
import { TablaEncabezado, MostrarMainNav, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"

 

export class PlanillaStockSinMvto {
    constructor(){
        document.body.innerHTML = '';
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarMainNav();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createBtnFlotante();

    }

    createHeader=()=>{
        this.header = new Header("Sin Movimiento", iconoVolver, iconoMenu,null,()=>{ navigateToPage('ventasporfecha') });
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    createMostrarMainNav= ()=>{
        const mainPedido= document.querySelector("main");
        this.mainNav =  new MostrarMainNav("Stock", "Bajo stock", "Sin movimiento",false,false,true,()=>{ navigateToPage('VerStock')},()=>{ navigateToPage("StockBajo")},null)
        mainPedido.appendChild(this.mainNav.getElement());
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

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante("descargar","contenedor-btn-flotante",()=>{alert("descarga exitosa")});
        mainPedido.appendChild(this.btn.getElement());

    }
    


}

new PlanillaStockSinMvto();