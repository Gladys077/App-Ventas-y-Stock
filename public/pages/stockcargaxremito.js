import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { MostrarRemito, TablaEncabezado, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js";
import { ButtonContainer } from "../../js/btnsContainer.js";
import { conexionAPI } from "../js/services/conectionFakeApi.js";

export class PlanillaStockCargaxRemito {
    constructor(id) {
        this.id = id;
        this.init();
    }

    async init() {
        this.createHeader();
        this.mainPedido = this.createMain();
        await this.traerRemito(); // Espera que se obtengan los datos antes de continuar
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createTablaFooter();
        this.createBtnFlotante();
        this.createFooter();
        this.createButtonsFooter();
    }


    
    traerRemito=async()=>{
        const remito=await conexionAPI.mostrarRemito(this.id);
        console.log("remito recibido", remito);
        console.log("remito recibido", remito.numero, remito.fecha, remito.proveedor);
        const mainPedido= document.querySelector("main");
        const datosRemito =  new MostrarRemito(remito.numero, remito.fecha, remito.proveedor)
        mainPedido.appendChild(datosRemito.getElement());
    }

    
    createHeader= () => {
        
        this.header = new Header("Carga de stock por remito", iconoVolver, iconoMenu,()=>{loadView("stocknuevoremito")},function(){ navigateToMenu('stock'); });
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }
    

    // createMostrarRemito=()=>{   
    //     this.traerRemito()
    // }

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
        this.botones= new ButtonContainer("Guardar", "Cancelar", ()=>{console.log("ingresando a planilla Ingreso de stock por remito");},()=>{console.log("se canceló pedido");},"save2","cancelViolet" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
        return
    }




}

// new PlanillaStockCargaxRemito();