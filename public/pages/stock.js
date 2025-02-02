import { Header, iconoVolver,iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, MostrarMainNav,TablaDetalles, TablaFooter,BtnFlotante } from "../../js/registros.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"



 

export class PlanillaStock {
    constructor(){
        document.body.innerHTML = '';
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarMainNav();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaArticulo();
        this.mostrarLineasArticulos();
        // this.createTablaFooter();
        this.createBtnFlotante();
        

                // Limpia productos seleccionados al salir o actualizar la página
                window.addEventListener('beforeunload', () => {
                    localStorage.removeItem('selectedProduct');
                });
    }

    createHeader=()=>{
        this.header = new Header("Stock", iconoVolver, iconoMenu,null,function(){ loadView('ventasporfecha') });
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
        this.mainNav =  new MostrarMainNav("Stock", "Bajo stock", "Sin movimiento", true,false,false,null,()=>{ loadView('stockbajo');},()=>{ loadView('stocksinmvto');})
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

    createLineaArticulo= (cant,nombre)=>{
        
        const lineaArt = document.createElement("div");
        lineaArt.className = "tabla_lineaArticulo";



            const prod = document.createElement("div");
            prod.className="producto";
            prod.textContent= `${nombre}`;
            // console.log(nombre);

            const unidades = document.createElement("div");
            unidades.className = "cantHist";
            unidades.textContent=`${cant}`;
    
        


        
        lineaArt.append(prod,unidades)
        
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
            tablaDetalles.append(this.createLineaArticulo(articulo.cant,articulo.producto))
            console.log("nombre " + articulo.producto);
        })

    

    }//Acá se debe conectar a la bd y hacemos el foreach para cada articulo


    // createTablaFooter= ()=>{
    //     const mainPedido=document.querySelector("main");
    //     this.footer = new TablaFooter()
    //     mainPedido.appendChild(this.footer.getElement());
    //     return
    // }

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante("descargar","contenedor-btn-flotante",()=>{alert("descarga exitosa")});
        mainPedido.appendChild(this.btn.getElement());

    }

}

new PlanillaStock();