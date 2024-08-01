import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, TablaDetalles, Pedidoactual, TablaFooter,  BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js";
import { ButtonContainer } from "../../js/btnsContainer.js";
 

export class PlanillaPedido {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createBtnFlotante();
        this.createFooter();
        this.createButtonsFooter();
        

    }

    createHeader=()=>{
        this.header = new Header("Venta Actual", iconoVolver, iconoMenu,function(){ loadView('formnuevoproveedor');},function(){ loadView('pedidoproximo');});
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

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante("masblanco","contenedor-btn-flotante adicionarArticulo", ()=>{alert("agregando nuevo item")});
        mainPedido.appendChild(this.btn.getElement());

    }

    createFooter=()=>{
        this.footer = new Footer()
        document.body.appendChild(this.footer.getElement());
        return
    }

    createButtonsFooter=()=>{
        const footerRegistro= document.querySelector(".footer-container");
        this.botones= new ButtonContainer("Finalizar", "Eliminar", ()=>{console.log("se guardó pedido");},()=>{console.log("se eliminó pedido");},"pedidowhite","trashViolet" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
    }


    


}

new PlanillaPedido();