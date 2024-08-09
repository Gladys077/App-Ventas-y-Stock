import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../..//js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js"
import { ButtonContainer } from "../../js/btnsContainer.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"


export class PlanillaPedidoProximo {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();

        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaArticulo();
        this.mostrarLineasArticulos();

        this.createAgregarManualmente();
        this.createTablaFooter();

        this.createFooter();
        this.createButtonsFooter();
        this.createAzBtn();

    }

    createHeader=()=>{
        this.header = new Header("Próximo pedido", iconoVolver, iconoMenu,null,()=>{loadView("pedidolistaxproveedor")});
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
        this.encabezado = new TablaEncabezado("CANT", "PRODUCTO","COSTO")
        mainPedido.appendChild(this.encabezado.getElement());
    }

    createAzBtn=()=>{
        const encabezado = document.querySelector(".tabla_encabezados");
        this.btn = new BtnFlotante("AZprimario", "az-btn",()=>{console.log("Función para ordenar alfabéticamente la lista de pedido");})
        encabezado.appendChild(this.btn.getElement());
    }

    createTablaDetalles= ()=>{
        const mainPedido=document.querySelector("main");
        this.detalles= new TablaDetalles();
        mainPedido.appendChild(this.detalles.getElement());
    }


    createLineaArticulo= (nombre, proveedores)=>{
        const lineaArt = document.createElement("div");
        lineaArt.className = "tabla_lineaArticulo";
            
            const input = document.createElement("input");
            input.className = "cant";
            input.value=1;

            const prod = document.createElement("div");
            prod.className="producto";
            prod.textContent= `${nombre}`;
            console.log(nombre);
            

            const precio = document.createElement("div");
            precio.className = "precio";
                let costo = parseInt(input.value) * 1000//buscar como usar valor de input radio para hacer el calculo
            precio.textContent = costo;//falta resolver
            
            const listaProv = document.createElement("div");
            listaProv.className = "cont-proveedores _oculto";

                if(Array.isArray(proveedores)&&proveedores.length>0){
                    proveedores.forEach(proveedor=>{
                        const opcion = document.createElement("div");
                        opcion.className = "proveedor_opcion";

                            const radio = document.createElement("input");
                            radio.type = "radio"
                            radio.name = "proveedor"
                            radio.value= `${proveedor.precio}`;
                            radio.id = `${proveedor.id}` /*no está bien definido */
                            

                            const label = document.createElement("label");
                            label.for = `${proveedor.id}`; /*ver si está correcto, no está bien definido */
                            label.textContent = `${proveedor.nombre}`;

                            const span = document.createElement("span");
                            span.textContent = `${proveedor.precio}`;

                        opcion.append(radio, label,span);    
                        listaProv.appendChild(opcion);
                    })/*fin forEach */
                }/*fin ifarray */else{
                    console.error("Error: proveedores no es una lista o está vacía", proveedores)
                }
            
            const btnMas = document.createElement("button");
            btnMas.className= "mostrar-mas";
                const imgMas = document.createElement("img");
                imgMas.src = "../img/iconos/masgris.png";
                imgMas.title = "Mostrar lista de proveedores";
                imgMas.alt = "Ver Proveedores";
            btnMas.appendChild(imgMas);

            const btnMenos = document.createElement("button");
            btnMenos.className= "mostrar-menos _oculto";
                const imgMenos = document.createElement("img");
                imgMenos.src = "../img/iconos/menosgris.png";
                imgMenos.title = "Ocultar lista de proveedores";
                imgMenos.alt = "Ocultar Proveedores";
            btnMenos.appendChild(imgMenos);

            btnMas.addEventListener("click",(event)=>{
                visibilidadOpciones(event)
            })

            btnMenos.addEventListener("click",(event)=>{
                visibilidadOpciones(event)
            })
        
        lineaArt.append(input, prod, precio, listaProv, btnMas, btnMenos)
        
        return lineaArt
        
    }//Se crea la linea de articulo. hacemos el foreach 

    mostrarLineasArticulos = async ()=>{

        const tablaDetalles = document.querySelector(".tabla_detalles");
        const articulos = await conexionAPI.listaarticulos();
        console.log(articulos);

        if(articulos.length===0){
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_productos";
            mensaje.innerText="no existen articulos en el pedio";
            main.appendChild(mensaje);
        }

        articulos.forEach(articulo=>{
            tablaDetalles.append(this.createLineaArticulo(articulo.nombre, articulo.proveedores))
            console.log("nombre " + articulo.nombre,  "proveedotes " +articulo.proveedores);
        })

    }//Acá se debe conectar a la bd y hacemos el foreach para cada articulo

    createAgregarManualmente= ()=>{
        const tablaDetalle = document.querySelector(".tabla_detalles");
        this.boton= new BtnFlotante("agregaManualmente", "contenedor-btn-flotante agregarManualmente", ()=>{alert("Debe abrir un modal para agregar artículos manualmente");},"Agregar al pedido")
        tablaDetalle.appendChild(this.boton.getElement());
    }

    createTablaFooter= ()=>{
        const mainPedido=document.querySelector("main");
        this.footer = new TablaFooter()
        mainPedido.appendChild(this.footer.getElement());
    }

    createFooter=()=>{
        this.footer = new Footer()
        document.body.appendChild(this.footer.getElement());
        return
    }

    createButtonsFooter=()=>{
        const footerRegistro= document.querySelector("footer");
        this.botones= new ButtonContainer("Guardar", "Eliminar", ()=>{console.log("se guardó pedido");},()=>{console.log("se eliminó pedido");},"save2","trashViolet" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
    }




}

new PlanillaPedidoProximo();


function visibilidadOpciones(event){
    const lineaArticulo=event.target.closest(".tabla_lineaArticulo")
    const cont_proveedores=lineaArticulo.querySelector(".cont-proveedores");
    const btnmostrar = lineaArticulo.querySelector(".mostrar-mas");
    const btnocultar = lineaArticulo.querySelector(".mostrar-menos")

    cont_proveedores.classList.toggle("_oculto");
    btnmostrar.classList.toggle("_oculto");
    btnocultar.classList.toggle("_oculto");

}