import { Header, iconoVolver, iconoMenu } from "../..//js/header.js";
import Main from "../../js/main.js";
import { BtnFlotante } from "../../js/registros.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"



export class PlanillaPedidoListaxProveedor{

    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();

        this.crearCard();
        this.mostrarCards();

        this.createBtnFlotante();
    }

    createHeader=()=>{
        this.header = new Header("Pedido listado x proveedor", iconoVolver, iconoMenu,null,()=>{loadView("pedidoproximo");});
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    crearCard= (nombre,lista)=>{
        const card = document.createElement("div");
        card.className = "card-proveedor";
            const proveedor = document.createElement("section");
                proveedor.className = "nombre-proveedor"
                proveedor.textContent = `Proveedor: ${nombre}`
            
            
            const encabezado = document.createElement("section");
            encabezado.className="tabla_encabezados";
            encabezado.innerHTML = `
                <h3 class="th">CANT</h3>
                <h3 class="th">PRODUCTO</h3>
                <h3 class="th">COSTO</h3>
            `
        
            const tablaDetalles = document.createElement("section")
            tablaDetalles.className="tabla_detalles"

            if (Array.isArray(lista) && lista.length > 0) {
                lista.forEach(item=>{                    
                    console.log("cant" +item.Cant);
                    console.log("prod" +item.Prod);
                    console.log("costo" +item.Costo);
                    const linea = document.createElement("div");
                    linea.className="tabla_lineaArticulo";
                        const input = document.createElement("input");
                        input.className = "cant";
                        input.value =`${item.Cant}`;

                        const producto= document.createElement("div");
                        producto.className="producto";
                        producto.textContent=`${item.Prod}`

                        const valor = document.createElement("div");
                        valor.className = "precio";
                        valor.textContent = `${item.Costo}`;
                    
                    linea.append(input,producto,valor);
                    tablaDetalles.appendChild(linea);


                            
                })
            } else {
                console.error('Error: lista no es un array o está vacía', lista);
            }
        


        card.append(proveedor, encabezado, tablaDetalles);


        return card
    }
    
    mostrarCards= async ()=> {
        const main = document.querySelector("main");
        const proveedores = await conexionAPI.listaproveedores();
        console.log(proveedores);
        

        if(proveedores.length===0){
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_productos";
            mensaje.innerText="no existe un pedido pendiente";
            main.appendChild(mensaje);
        }
        
        proveedores.forEach(proveedor=>{
            main.appendChild(this.crearCard(proveedor.nombre, proveedor.lista))
        })
        
    }

    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante("descargar","contenedor-btn-flotante _listaxproveedor");
        mainPedido.appendChild(this.btn.getElement());

    }
    

}

new PlanillaPedidoListaxProveedor()
