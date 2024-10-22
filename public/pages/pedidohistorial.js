import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../..//js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js"
import { ButtonContainer } from "../../js/btnsContainer.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"

export class PlanillaPedidoHistorial {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();

        this.createTablaEncabezado();
        this.createTablaDetalles();
        // this.createLineaArticulo();
        // this.mostrarLineasArticulos();
        this.createFooter();
        // this.createEnlace();
        this.createButtonsFooter();
        this.createAzBtn();
    }

    createHeader=()=>{
        this.header = new Header ("Historial Pedidos", iconoVolver, iconoMenu, null, ()=>{loadView("pedidolistaxproveedor")});
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main=new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    createTablaEncabezado=()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Fecha", "Descripción", "Acciones");
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

    createLineaPedido=(id, fecha,descripcion)=>{
        const detalle=document.querySelector(".tabla_detalles")
        const lineaPedido = document.createElement("div");
        lineaPedido.className = "tabla_lineaPedido";
        lineaPedido.id=`${id}`;

            const fechaPedido = document.createElement("div");
            fechaPedido.className ="fecha";
            fechaPedido.textContent=`${fecha}`;

            const descripcionPedido = document.createElement("input");
            descripcionPedido.className= "descripcion";
            descripcionPedido.value=`${descripcion}`;

            const acciones= document.createElement("div");
            acciones.className = "acciones";
                const iconCopiar= document.createElement("img");
                iconCopiar.src="../img/iconos/saveGreen.png"
                const iconBorrar = document.createElement("img");
                iconBorrar ="../img/iconos/trashRojo.png"
            acciones.append(copiar, borrar);    
        lineaPedido.append(fechaPedido,descripcionPedido, acciones);
        return lineaPedido

    }//se crea linea de pedido para historial

    createFooter=()=>{
        this.footer = new Footer()
        document.body.appendChild(this.footer.getElement());
        return
    }

    createButtonsFooter=()=>{
        const footerRegistro= document.querySelector("footer");
        this.botones= new ButtonContainer("Guardar", "Cancelar", ()=>{console.log("se guardó pedido");},()=>{loadView("pedidolistaxproveedor")},"save2","cancelViolet" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
    }

}

new PlanillaPedidoHistorial();
