import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, MostrarMainNav, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"

 

export class PlanillaStockSinMvto {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createMostrarMainNav();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaArticulo();
        this.mostrarLineasArticulos();
        // this.createTablaFooter();
        this.createBtnFlotante();

    }

    createHeader=()=>{
        this.header = new Header("Sin Movimiento", iconoVolver, iconoMenu,null,()=>{ loadView('ventasporfecha') });
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
        this.mainNav =  new MostrarMainNav("Stock", "Bajo stock", "Sin movimiento",false,false,true,()=>{ loadView('stock');},()=>{ loadView("stockbajo");},null)
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
                    icon.src="../img/iconos/sinMovimiento.png";
                    icon.title=`Producto sin movimiento`;
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

            if(calcularDiasUltimaVenta(articulo.fuv)>=7){
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

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante("descargar","contenedor-btn-flotante",()=>{alert("descarga exitosa")});
        mainPedido.appendChild(this.btn.getElement());

    }
    


}

new PlanillaStockSinMvto();


function  calcularDiasUltimaVenta(ultimaVenta){
    const fechaUltimaVenta= new Date(ultimaVenta)
    const hoy = new Date();
    hoy.setHours(0,0,0,0);//seteo a cero la hora, minuto, segundos, etc.

    const diasTranscurridos = hoy - fechaUltimaVenta;
    const numerodias = Math.floor(diasTranscurridos/(1000 * 60 * 60 *24));//me aseguro que la operación de un número entero

    return numerodias;
}


//Se puede hacer también una función que calcule el porcentaje de ventas en relación al stock y tomarlo como punto de referencia para bajo movimiento