import { Header } from "../../js/header.js";
import Main from "../../js/main.js";
import { iconoVolver, iconoLupaN } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { TablaEncabezado, MostrarMainNav,TablaDetalles, TablaFooter,BtnFlotante } from "../../js/registros.js"


 

export class PlanillaStock {
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
        this.header = new Header("Stock", iconoVolver, iconoLupaN, ()=>{ navigateToPage('MenuStock') }); 
        //dentro del new HEADER, FALTA agregar otra función que se activa cuando presiona la lupa, debe crear el buscador y la lista de productos en stock
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
        this.mainNav =  new MostrarMainNav("Stock", "Bajo stock", "Sin movimiento", true,false,false,null,()=>{ navigateToPage('StockBajo')},()=>{ navigateToPage('StockSinMvto')})
        mainPedido.appendChild(this.mainNav.getElement());
        return
    }

    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Producto", "Cant.")
        mainPedido.appendChild(this.encabezado.getElement());
        return
    }

    createTablaDetalles= ()=>{
        const mainPedido=document.querySelector("main");
        this.detalles= new TablaDetalles();
        mainPedido.appendChild(this.detalles.getElement());
        return
    }

    createLineaArticulos= ()=>{}///Acá se debe conectar a la bd y hacer el foreach o map


    createTablaFooter= ()=>{
        const mainPedido=document.querySelector("main");
        this.footer = new TablaFooter()
        mainPedido.appendChild(this.footer.getElement());
        return
    }

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante("descargar","contenedor-btn-flotante",()=>{alert("descarga exitosa")});
        mainPedido.appendChild(this.btn.getElement());

    }


}

new PlanillaStock();