import { Header, iconoVolver, iconoMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, MostrarProducto, FiltroFecha, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js";

 

export class PlanillaVtasxFecha {

    constructor(){//cuando esté completo hay que agregar los parametros id, fechadesde y fechahasta
        this.init();
    }

    async init(){
        this.createHeader();
        this.mainPedido=this.createMain();
        await this.traerProd();
        await this.traerHistorialProd();
        await this.createMostrarNombreProducto();
        this.createFiltroFecha();
        this.createEventFiltro();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaArticulos();
        await this.mostrarLineasArticulos();
        this.createTablaFooter();
        this.createBtnFlotante();
    
    }

    //Historial venta por producto

    traerProd = async(prodSolicitado="1334") => {
        
        const prod = await conexionAPI.historialVentaProducto(prodSolicitado);
        if(!prod || prod.length ===0){
            console.log("No se encontró el producto solicitado.");
            return null;
        }
        return prod
    }


    traerHistorialProd = async(prodSolicitado="1334", fechaDesde, fechaHasta) => {
        
        const prod = await conexionAPI.historialVentaProducto(prodSolicitado);
        if(!prod || prod.length ===0){
            console.log("No se encontró el producto solicitado.");
            return null;
        }
        
        console.log("prodEnviado ", prod);
        const historial = prod.historial;
        console.log("Historial Completo: ", historial);


        const historialfiltrado = [];

        if(!fechaDesde && !fechaHasta){
            console.log("historial con filtro: ",historialfiltrado);   
            return historial;
        }else{
        
            historial.forEach(item =>{
                const fechaItem = new Date(item.fecha);
                const fechaInicio = new Date(fechaDesde);
                const fechaFin = new Date(fechaHasta);
                if(fechaItem>=fechaInicio && fechaItem<=fechaFin){
                    historialfiltrado.push(item);
            }
        });

            console.log("historial con filtro: ",historialfiltrado);    
            return historialfiltrado
        
        }
        
        
    }


    createHeader=()=>{
        this.header = new Header("Listado por Fecha", iconoVolver, iconoMenu,null,function(){ loadView("pedidoactual")});
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }
    //Agregar nombre producto
    createMostrarNombreProducto= async()=>{
        
        const prod = await this.traerProd();
        // console.log("prodEnviado ", prod);
    
        const mainHistorial=document.querySelector("main");
        if(prod){
            
            console.log("producto:", prod);
            console.log("nombre:", prod.nombre);
            this.producto= new MostrarProducto(prod.nombre);
            mainHistorial.appendChild(this.producto.getElement());
        }else{
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_producto";
            mensaje.innerText="no se encontró producto";
            mainHistorial.appendChild(mensaje);
        }
        
        
    }///Acá se llama traerHistorialProd para conectar a la bd y mostrar nombre producto

    createFiltroFecha= ()=>{

        const main=document.querySelector("main");
        this.filtro = new FiltroFecha();  
        main.appendChild(this.filtro.getElement())

    }

    createTablaEncabezado= ()=>{
        const mainPedido=document.querySelector("main");
        this.encabezado = new TablaEncabezado("Fecha","Cant.")
        mainPedido.appendChild(this.encabezado.getElement());
    }

    createTablaDetalles= ()=>{
        const mainPedido=document.querySelector("main");
        this.detalles= new TablaDetalles();
        mainPedido.appendChild(this.detalles.getElement());
    }

    createLineaArticulos= (fechaVenta,cantVendidas)=>{
        const lineaArt = document.createElement("div");
        lineaArt.className = "tabla_lineaArticulo";
            const fecha = document.createElement("div") ;
            fecha.className ="fecha";
            fecha.textContent = `${fechaVenta}`;

            const cant = document.createElement("div");
            cant.className = "cantHist";
            cant.textContent = `${cantVendidas}`;
        lineaArt.append(fecha,cant);
        
        return lineaArt
    }//Se crea línea de artículo para hacer el forEach en "MostrarLineasArticulos"
    
    mostrarLineasArticulos = async (prodSolicitado, fechaDesde,fechaHasta) => {
        

        const tablaDetalles =document.querySelector(".tabla_detalles");
        tablaDetalles.innerHTML="";
        const historial =  await this.traerHistorialProd(prodSolicitado, fechaDesde,fechaHasta);
        console.log("historial:", historial);

        if (historial){
            console.log("prodArt:", historial);


            if(historial.lenght===0){
                const mensaje = document.createElement("span");
                mensaje.classList="no_hay_historial";
                mensaje.innerText="no existe un historia de ventas";
                tablaDetalles.appendChild(mensaje);
            }
            historial.forEach(item => {
                tablaDetalles.append(this.createLineaArticulos(item.fecha, item.cant))
                                
            });
            
            
        }
    }///Acá se llama traerHistorial para conectar a la bd y hacer el foreach o map


    createTablaFooter= ()=>{
        const mainPedido=document.querySelector("main");
        this.footer = new TablaFooter("TOTAL CANTIDADES VENDIDAS", "--")
        mainPedido.appendChild(this.footer.getElement());
        calcularTotal();
        observarCambiosTabla();

    }

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante("descargar","contenedor-btn-flotante",()=>{alert("descarga exitosa")});
        mainPedido.appendChild(this.btn.getElement());

    }

    createEventFiltro = ()=>{
        const btnFiltro= document.querySelector(".filtrarFecha");
        btnFiltro.addEventListener("click",()=>{
                const fechaDesde=document.querySelector(".fecha-desde").value
                const fechaHasta=document.querySelector(".fecha-hasta").value
                console.log(fechaDesde);
                console.log(fechaHasta);
                this.mostrarLineasArticulos("1334",fechaDesde,fechaHasta);

        alert("filtrando fecha")})

    
    
    }


}



new PlanillaVtasxFecha();



function calcularTotal(){
    
    const cantidades =document.querySelectorAll(".cantHist");
        // console.log(typeof(cantidades));
        console.log("todos los precio", cantidades);
        let cantTotal = 0;
        cantidades.forEach(cantidad =>{
            const valor = parseFloat(cantidad.textContent) || 0;
            cantTotal += valor;            
        });


        document.querySelector(".valorTotal").textContent = `${cantTotal}`;

}

function observarCambiosTabla(){
    const tablaDetalles = document.querySelector(".tabla_detalles");

    //observador cambio
    const observer = new MutationObserver(()=>{
        
        calcularTotal()
    });
    observer.observe(tablaDetalles,{childList: true, subtree: true});
}

