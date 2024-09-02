import { Header } from "../../js/header.js";
import { iconoVolver, iconoMenu } from '../../js/iconosSVG.js';
import Main from "../../js/main.js";
import { TablaEncabezado, TablaDetalles, TablaFooter,  BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js";
import { ButtonContainer } from "../../js/btnsContainer.js";
import { conexionAPI } from "../../js/services/conectionFakeApi.js";
 



export class PlanillaVentaActual {
    constructor(){
        document.body.innerHTML = ''; 

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
            input.setAttribute("data-price",`${precioUnitario}`)
            input.addEventListener("input", (event)=>actualizarPrecio(event))

            const prod = document.createElement("div");
            prod.className="producto";
            prod.textContent= `${producto}`;
                        

            const precio = document.createElement("div");
            precio.className = "precio";
                let costo = parseInt(input.value) * parseFloat(`${precioUnitario}`)//calculo. Funciona ok
            
                    const spanprecio= document.createElement("span")
                    spanprecio.textContent = costo;

                    const buttonEliminar= document.createElement("button");
                        const iconEliminar = document.createElement("img");
                        iconEliminar.src= "../../../img/iconos/cancel2rojo.png"
                        iconEliminar.className = "iconEliminar";
                        iconEliminar.addEventListener("click", (event) =>{
                            const art = document.getElementById(`${id}`)
                            conexionAPI.borrararticulo(`${id}`);
                            detalle.removeChild(art);
                            calcularTotal();
                            
                        }) //verificar como pasar el id, corregir y agregar button
                    buttonEliminar.appendChild(iconEliminar);    

            precio.append(spanprecio, buttonEliminar)        
                    
            lineaArt.append(input, prod, precio)
        
            return lineaArt

    }///se crea linea de articulo

    mostrarArticulos = async ()=>{
        const tablaDetalles = document.querySelector(".tabla_detalles");
        const articulos = await conexionAPI.articulospedidos();
        // console.log(articulos);

        if(articulos.length===0){
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_productos";
            mensaje.innerText="no existen articulos en el pedido";
            main.appendChild(mensaje);
        }

        articulos.forEach(articulo=>{
            tablaDetalles.append(this.createLineaArticulo(articulo.id, articulo.cant, articulo.producto, articulo.precioUnitario))
            // console.log("Cant " + articulo.cant,  "producto " +articulo.producto, "precio " + articulo.precioUnitario);
        })

        calcularTotal();

    }//se muestran todas las líneas de artículos

    createTablaFooter= ()=>{
        const mainPedido=document.querySelector("main");
        this.footer = new TablaFooter()
        mainPedido.appendChild(this.footer.getElement());
        
        // calcularTotal();
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



function calcularTotal(){
    
    const precios =document.querySelectorAll(".precio");
    console.log(typeof(precios));
    console.log("todos los precio", precios);
        let totalVenta = 0;
        precios.forEach(precio =>{
            const span = precio.querySelector("span");
            totalVenta += parseFloat(span.textContent);
            // if(span&&span.textContent){
            //     totalVenta += parseFloat(span.textContent);
            // }
            
        });
        document.querySelector(".valorTotal").textContent = `$${totalVenta}`;

}

async function actualizarPrecio(event){
    const linea=event.target.closest(".tabla_lineaArticulo")
    const cantArt = parseInt(linea.querySelector(".cant").value)
    const precio= parseFloat(event.target.getAttribute("data-price"))
    const idArt = linea.getAttribute("id")
    console.log(idArt);
    // console.log(typeof(cantArt));console.log(cantArt);console.log(typeof(precio));
    let costo = cantArt * precio
    // console.log(costo);
    const precioxNuevaCant = linea.querySelector("span");
    precioxNuevaCant.innerText = costo;
    calcularTotal();

    try{
            
        const response = await fetch(`http://localhost:3000/venta/${idArt}`,{
            method:"PATCH" ,
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                cant: cantArt                
            })

        })
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        } else {
            console.log('Actualización exitosa en db.json');
        }
    } catch (error) {
        console.error('Hubo un problema al actualizar la venta:', error);
    }

}


