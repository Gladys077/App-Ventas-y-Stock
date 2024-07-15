import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../componentes/js/header.js";
import Main from "../../componentes/js/main.js";
import { TablaEncabezado, TablaDetalles, Pedidoactual, TablaFooter } from "../js/registros.js"

 

export class PlanillaPedido {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        

    }

    createHeader=()=>{
        this.header = new Header("Pedido Actual", iconoVolver, iconoMenu,null,function(){ navigateToMenu('stock'); });
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Cant.", "Producto", "Precio")
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

new PlanillaPedido();