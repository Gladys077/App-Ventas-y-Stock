import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../..//js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, TablaDetalles} from "../../js/registros.js"
import { Footer } from "../../js/footer.js"
import { ButtonContainer } from "../../js/btnsContainer.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"

export class PlanillaPedidoHistorial {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();

        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaPedido();
        this.mostrarLineasPedidos();
        this.createFooter();
        // this.createEnlace();
        this.createButtonsFooter();
        
    }

    createHeader=()=>{
        this.header = new Header ("Historial de Pedidos", iconoVolver, iconoMenu, null, ()=>{loadView("pedidolistaxproveedor")});
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

    createTablaDetalles= ()=>{
        const mainPedido=document.querySelector("main");
        this.detalles= new TablaDetalles();
        mainPedido.appendChild(this.detalles.getElement());
    }

    createLineaPedido=(id, fecha,descripcion,listaproductos)=>{
        const detalle=document.querySelector(".tabla_detalles")
        const lineaPedido = document.createElement("div");
            lineaPedido.className = "tabla_lineaPedido";
            lineaPedido.setAttribute("id",`${id}`);

                const fechaPedido = document.createElement("div");
                    fechaPedido.className ="fecha";
                    fechaPedido.textContent=`${fecha}`;

                const descripcionPedido = document.createElement("input");
                    descripcionPedido.className= "descripcion";
                    descripcionPedido.value=`${descripcion}`;
                    descripcionPedido.addEventListener("input",(event)=>actualizarDescripcion(event))

                const acciones= document.createElement("div");
                    acciones.className = "acciones";

                        const btnVerPedido=document.createElement("button");
                            btnVerPedido.className="verPedido";
                            const imgVer=document.createElement("img");
                                imgVer.src="../img/iconos/pedido2.png";
                                imgVer.title=`Ver contenido de ${descripcion}`;
                                imgVer.alt="Icon ver";
                        btnVerPedido.appendChild(imgVer);

                        const btnCopiar=document.createElement("button");
                            btnCopiar.className= "copiarPedido";
                            const imgCopiar = document.createElement("img");
                                imgCopiar.src = "../img/iconos/saveGreen.png";
                                imgCopiar.title = "Hacer copia pedido";
                                imgCopiar.alt = "Icon copiar";
                        btnCopiar.appendChild(imgCopiar);

                        const btnBorrar=document.createElement("button");
                            btnBorrar.className= "borrarPedido";
                            const imgBorrar = document.createElement("img");
                                imgBorrar.src = "../img/iconos/trashRojo.PNG";
                                imgBorrar.title = "Borrar pedido del Historial";
                                imgBorrar.alt = "Icon Borrar";
                        btnBorrar.appendChild(imgBorrar);

                        //se agrega eventos a los botones
                        btnVerPedido.addEventListener("click",async(event)=>{console.log("falta desarrollar");})
                        btnCopiar.addEventListener("click",async(event)=>{
                            const pedidoOriginal =  await conexionAPI.obtenerpedido(`${id}`)
                            const nuevaCopia = {
                                ...pedidoOriginal,
                                id:`cop-${Math.random().toString(36).substr(2, 9)}`, //genera un nuevo id para la copia
                                fecha: new Date().toLocaleDateString(), // Usamos la fecha actual
                                descripcion: pedidoOriginal.descripcion,
                                listaproductos: [...pedidoOriginal.listaproductos], // Copiar los productos asociados

                            }

                            await conexionAPI.crearpedido(nuevaCopia);
                            detalle.appendChild(this.createLineaPedido(nuevaCopia.id, nuevaCopia.fecha, nuevaCopia.descripcion, nuevaCopia.listaproductos));
                        })//Fin evento btnCopiar
                        btnBorrar.addEventListener("click",async(event) =>{
                            const pedido = document.getElementById(`${id}`)
                            await conexionAPI.borrarpedido(`${id}`);
                            detalle.removeChild(pedido);
                            
                        }) //Fin evento btnBorrar 
                acciones.append(btnVerPedido, btnCopiar, btnBorrar);    
        lineaPedido.append(fechaPedido,descripcionPedido, acciones);
        return lineaPedido
        
    }//se crea linea de pedido para historial

    mostrarLineasPedidos = async ()=>{

        const tablaDetalles = document.querySelector(".tabla_detalles");
        const pedidos = await conexionAPI.listapedidos();
        // console.log(pedidos);

        if(pedidos.length===0){
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_pedidos";
            mensaje.innerText="no existen pedidos guardados en el Historial";
            main.appendChild(mensaje);
        }

        pedidos.forEach(pedido=>{
            tablaDetalles.append(this.createLineaPedido(pedido.id, pedido.fecha, pedido.descripcion,pedido.listaproductos))
            console.log("Descripcion " + pedido.descripcion,  "fecha " +pedido.fecha);
        })

        

    }//Acá se debe conectar a la bd y hacemos el forEach para cada pedido

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


async function actualizarDescripcion(event){

    const linea=event.target.closest(".tabla_lineaPedido")
    const nuevaDescripcion=linea.querySelector(".descripcion").value
    const idLinea=linea.getAttribute("id");
    //console.log(idLinea);
    await conexionAPI.actualizarPedido(idLinea,nuevaDescripcion);
}

