import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../..//js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js"
import { ButtonContainer } from "../../js/btnsContainer.js"


export class PlanillaPedidoProximo {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();

        this.createTablaEncabezado();
        this.createTablaDetalles();

        this.createAgregarManualmente();
        this.createTablaFooter();

        this.createFooter();
        this.createButtonsFooter();
        this.createAzBtn();

    }

    createHeader=()=>{
        this.header = new Header("Próximo pedido", iconoVolver, iconoMenu,null,()=>{loadView("pedidolistaxproveedor")});
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
        this.encabezado = new TablaEncabezado("CANT", "PRODUCTO","COSTO")
        mainPedido.appendChild(this.encabezado.getElement());
    }

    createAzBtn=()=>{
        const encabezado = document.querySelector(".tabla_encabezados");
        this.btn = new BtnFlotante("AZprimario", "az-btn",()=>{console.log("Función para ordenar alfabéticamente la lista de pedido");})
        encabezado.appendChild(this.btn.getElement());
    }

    createTablaDetalles= ()=>{
        const mainPedido=document.querySelector("main");
        this.detalles= new TablaDetalles();
        mainPedido.appendChild(this.detalles.getElement());
    }

    createLineaArticulos= ()=>{}///Acá se debe conectar a la bd y hacer el foreach o map

    createAgregarManualmente= ()=>{
        const tablaDetalle = document.querySelector(".tabla_detalles");
        this.boton= new BtnFlotante("agregaManualmente", "contenedor-btn-flotante agregarManualmente", ()=>{alert("Debe abrir un modal para agregar artículos manualmente");},"Agregar al pedido")
        tablaDetalle.appendChild(this.boton.getElement());
    }

    createTablaFooter= ()=>{
        const mainPedido=document.querySelector("main");
        this.footer = new TablaFooter()
        mainPedido.appendChild(this.footer.getElement());
    }

    createFooter=()=>{
        this.footer = new Footer()
        document.body.appendChild(this.footer.getElement());
        return
    }

    createButtonsFooter=()=>{
        const footerRegistro= document.querySelector("footer");
        this.botones= new ButtonContainer("Guardar", "Eliminar", ()=>{console.log("se guardó pedido");},()=>{console.log("se eliminó pedido");},"pedidowhite","trashViolet" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
    }




}

new PlanillaPedidoProximo();

