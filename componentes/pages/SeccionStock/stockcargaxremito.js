import { Header } from "../../js/header.js";
import Main from "../../js/main.js";
import { MostrarRemito, TablaEncabezado, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js";
import { ButtonContainer } from "../../js/btnsContainer.js";
import { navigateToPage } from "../../js/navigateToPage.js";
import { iconoVolver } from "../../js/iconosSVG.js";

export class PlanillaStockCargaxRemito {
    constructor(){
        document.body.innerHTML = '';
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarRemito();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createBtnFlotante();
        this.createFooter();
        this.createButtonsFooter();
        

    }

    createHeader=()=>{
        this.header = new Header("Carga de stock por remito", iconoVolver, null,()=>{navigateToPage("MenuCargaDeStock")});
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    createMostrarRemito= ()=>{
        const mainPedido= document.querySelector("main");
        this.remito =  new MostrarRemito()
        mainPedido.appendChild(this.remito.getElement());
    }

    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("CANT", "PRODUCTO","PRECIO")
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
        this.botones= new ButtonContainer("Cargar", "Cancelar", ()=>{console.log("ingresando a Planilla Cargar Stock por Remito");},()=>{console.log("se canceló ingreso de stock por remito");},"save2","cancelViolet" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
        return
    }




}

new PlanillaStockCargaxRemito();