import { Header, iconoVolver, iconoMenu} from "../../js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, TablaDetalles, TablaFooter,  BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js";
import { ButtonContainer } from "../../js/btnsContainer.js";
import { conexionAPI } from "../js/services/conectionFakeApi.js"
 

export class PlanillaVentaActual {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaArticulo();
        this.mostrarArticulos();
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

    createLineaArticulo= (id, cant, producto, precioUnitario)=>{
        const detalle = document.querySelector(".tabla_detalles")
        const lineaArt = document.createElement("div");
        lineaArt.className = "tabla_lineaArticulo";
        lineaArt.id =`${id}`
            
            const input = document.createElement("input");
            input.className = "cant";
            input.value=`${cant}`;
            input.addEventListener("change", (event)=>actualizarPrecio(event))

            const prod = document.createElement("div");
            prod.className="producto";
            prod.textContent= `${producto}`;
            console.log(producto);
            

            const precio = document.createElement("div");
            precio.className = "precio";
                let costo = parseInt(input.value) * parseFloat(`${precioUnitario}`)//calculo. Funciona ok
            
                    const spanprecio= document.createElement("span")
                    spanprecio.textContent = costo;

                    const buttonEliminar= document.createElement("button");
                        const iconEliminar = document.createElement("img");
                        iconEliminar.src= "../img/iconos/cancel2rojo.png"
                        iconEliminar.className = "iconEliminar";
                        iconEliminar.addEventListener("click", (event) =>{
                            const art = document.getElementById(`${id}`)
                            conexionAPI.borrararticulo(`${id}`);
                            detalle.removeChild(art);
                            
                        }) //verificar como pasar el id, corregir y agregar button
                    buttonEliminar.appendChild(iconEliminar);    
            precio.append(spanprecio, buttonEliminar)        
                    
            lineaArt.append(input, prod, precio)
        
            return lineaArt

    }///se crea linea de articulo

    mostrarArticulos = async ()=>{
        const tablaDetalles = document.querySelector(".tabla_detalles");
        const articulos = await conexionAPI.articulospedidos();
        console.log(articulos);

        if(articulos.length===0){
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_productos";
            mensaje.innerText="no existen articulos en el pedio";
            main.appendChild(mensaje);
        }

        articulos.forEach(articulo=>{
            tablaDetalles.append(this.createLineaArticulo(articulo.id, articulo.cant, articulo.producto, articulo.precio))
            console.log("Cant " + articulo.cant,  "producto " +articulo.producto, "precio " + articulo.precio);
        })

    }

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


}/*fin PlanillaVentaActual */

new PlanillaVentaActual();

function eliminarAppendChild(event){
    const lineaArticulo=event.target.closest(".tabla_lineaArticulo")
    lineaArticulo.removeChild(input, prod, precio);
}

function actualizarPrecio(event){
    const input=event.target.closest("cant")
    const precio=event.target.closest("precio")
    const cantArt = parseInt(input.value);
    const precioUnitario = parseFloat(precio.value);
    
    let costo = cantArt * precioUnitario;
    spanprecio.textContent = $`${costo}`;
            
                    

}