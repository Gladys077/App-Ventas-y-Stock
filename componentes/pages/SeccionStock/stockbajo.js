import { Header } from "../../js/header.js";
import { iconoVolver, iconoMenu, iconoDescargar } from "../../js/iconosSVG.js";
import { navigateToPage } from "../../js/navigateToPage.js";
import Main from "../../js/main.js";
import { TablaEncabezado, MostrarMainNav, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { Footer } from '../../js/footer.js';
import { FabButton, handleDownloadClick } from '../../js/utils.js';
import { conexionAPI } from "../../js/services/conectionFakeApi.js"
 

export class PlanillaStockBajo {
    constructor(){
        document.body.innerHTML = '';
        
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarMainNav();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaArticulo();
        this.mostrarLineasArticulos();
        //this.createTablaFooter();
        this.createFooter();

    }

    createHeader=()=>{
        this.header = new Header("Stock bajo", iconoVolver, iconoMenu, ()=>{ navigateToPage('VerStock') }, ()=>{ navigateToPage('MenuStock') });
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
        this.mainNav =  new MostrarMainNav("Stock", "Bajo stock", "Sin movimiento",false,true,false,()=>{ navigateToPage('VerStock')},null,()=>{ navigateToPage('StockSinMvto')})
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

        createLineaArticulo= (cant,nombre)=>{
            
            const lineaArt = document.createElement("div");
            lineaArt.className = "tabla_lineaArticulo";
    
                const icon = document.createElement("img");
                icon.src="../../img/iconos/bajoStock.png";
                icon.title=`Producto con bajo stock`;
                icon.alt="icon";
    
                const prod = document.createElement("div");
                prod.className="producto";
                prod.textContent= `${nombre}`;
                // console.log(nombre);
    
                const unidades = document.createElement("div");
                unidades.className = "cantHist";
                unidades.textContent=`${cant}`;
        
            
    
    
            
            lineaArt.append(icon,prod,unidades)
            
            return lineaArt
            
        }//Se crea la linea de articulo para hacer el foreach en "MostrarLineasArticulos"
    
        mostrarLineasArticulos = async ()=>{
    
            const tablaDetalles = document.querySelector(".tabla_detalles");
            const articulos = await conexionAPI.stockDisponible();
            // console.log(articulos);
    
            if(articulos.length===0){
                const mensaje = document.createElement("span");
                mensaje.classList="no_hay_productos";
                mensaje.innerText="no existen articulos en el pedido";
                main.appendChild(mensaje);
            }
            
    
            articulos.forEach(articulo=>{
                if(articulo.cant<=articulo.pp){
                tablaDetalles.append(this.createLineaArticulo(articulo.cant,articulo.producto))
                console.log("nombre " + articulo.producto);
                }
            })
    
        
    
        }//Acá se debe conectar a la bd y hacemos el foreach para cada articulo
    
    

    createTablaFooter= ()=>{
        const mainPedido=document.querySelector("main");
        this.footer = new TablaFooter()
        mainPedido.appendChild(this.footer.getElement());
    }

    createFooter() {
        this.footer = new Footer();
        this.createBtnFlotante();
        document.body.appendChild(this.footer.getElement());
        }
    
    createBtnFlotante= ()=>{
        const downloadButton = new FabButton(iconoDescargar, ()=> handleDownloadClick("Bajo_Stock"));
        this.footer.getElement().appendChild(downloadButton.getElement());
        }


}

new PlanillaStockBajo();