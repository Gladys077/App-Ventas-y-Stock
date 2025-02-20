import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import {TablaDetalles} from "../js/registros.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"
import { Footer } from "../js/footer.js";
import { ButtonContainer } from "../js/btnsContainer.js";

let productosSeleccionados = [];

export class BuscadorProductos{

    constructor(id){
        
        this.id=id;
        this.createHeader();
        this.mainPedido=this.createMain();
        this.crearBarraBuscador();
        this.createFooter();
        this.createButtonsFooter(this.id);
    }

    createHeader=()=>{
        this.header = new Header("Carga de stock por remito ", iconoVolver, iconoMenu,null,()=>{loadView(stockcargaxremitol)});
        document.body.appendChild(this.header.getElement());
        return
    }//fin createHeader

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }//fin createMain

    crearBarraBuscador=()=>{
        const mainForm = document.querySelector("main");
        //crear barra de busqueda    
            const seccion = document.createElement("section");
            seccion.className = "contenedor-buscador";

                const input = document.createElement("input");
                input.className = "buscador";
                input.type = "text";
                input.placeholder = "Buscar Producto..."
                input.addEventListener("input",async()=>{
                    try {
                        const productos = await conexionAPI.listaarticulos();
                        console.log(productos);
                        filtrarProductos(productos);
                        
                    } catch (error) {
                        console.error("Error obteniendo productos: ", error);
                        return;
                    }
                })

                const btn = document.createElement("label");
                btn.className = "buscar"
                    const icon = document.createElement("img");
                    icon.src = "../../img/iconos/lupa.png";
                btn.appendChild(icon);    

            seccion.appendChild(input);
            seccion.appendChild(btn);
            
        //crear lista de sugerencias
            const listaSugerencias = document.createElement("ul");
            listaSugerencias.id = "sugerencias";
        
        //crear tabla de detalles
            this.detalles= new TablaDetalles();

        mainForm.appendChild(seccion);
        mainForm.appendChild(listaSugerencias);
        mainForm.appendChild(this.detalles.getElement());

        return
    }//fin crearBarraBuscador
    
    createFooter=()=>{
        this.footer = new Footer()
        document.body.appendChild(this.footer.getElement());
        return
    }//fin createFooter

    createButtonsFooter=(id)=>{
        const footerRegistro= document.querySelector(".footer-container");
        this.botones= new ButtonContainer(
            "Nuevo Producto", 
            "Remito",
            async ()=>{
                alert("debe llevar a planilla para agregar nuevo producto")
            },
             async ()=>{
                console.log("id",id)
                await conexionAPI.agregarItemRemito(id,productosSeleccionados);
                alert("Productos agregados al remito")
                loadView(`stockcargaxremito?id=${id}`)
             },
             "agregarProducto",
             "pedido2" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
        return
    }// fin createButtonsFooter

}

// new BuscadorProductos();


//Funcionalidades

        function filtrarProductos(productos) {
            const myInput = document.querySelector(".buscador");
            const texto = document.querySelector(".buscador").value.toLowerCase();
            const sugerencias = document.querySelector("#sugerencias");
            sugerencias.innerHTML="";//para limpiar la lista antes de agregar nuevas sugerencias

            if(texto.length>0){
                const resultados = productos.filter(producto => 
                    producto.nombre.toLowerCase().includes(texto));

                resultados.forEach(prod=>{
                    console.log("texto ingresado:",texto);    
                    console.log(prod.nombre);

                    const item = document.createElement("li");
                    item.textContent = prod.nombre;
                    item.classList.add("sugerencia-producto");
            
                    item.addEventListener("click", ()=>{
                        if(texto){
                            myInput.value = "";
                            sugerencias.innerHTML="";
                            mostrarProducto(prod);
                        }else{
                            console.error("Error: texto no está definido")
                        }

                    });
                    sugerencias.appendChild(item);
                })
            };
            
        }//fin function filtrarProductos

        function mostrarProducto (nuevoItem) {
            
            const detalle = document.querySelector(".tabla_detalles");    
            if(!detalle){
                console.error("Error: No se encontró el contenedor .talla_detalles")
                return
            }

            const lineaArt = document.createElement("div");
            lineaArt.className = "tabla_lineaArticulo";

                const cant = document.createElement("input");
                cant.className = "cant";
                cant.type = "text"
                cant.value="1";
                cant.min="1";
                cant.title = "Ingrese cantidad de unidades compradas"
                cant.addEventListener("input",()=>{
                    const producto = productosSeleccionados.find(p=>p.id===nuevoItem.id);
                    if(producto){
                        producto.cant = parseInt(cant.value);
                    }
                    console.log(productosSeleccionados);
                })

                const prod = document.createElement("div");
                prod.className="producto";
                prod.textContent= nuevoItem.nombre;

                const precio = document.createElement("input");
                precio.className = "precioUnit";
                precio.placeholder ="$ unitario";
                precio.type = "text";
                precio.value = nuevoItem.precio || 0;
                precio.title = "Ingrese precio unitario";
                precio.addEventListener("input",()=>{
                    const producto = productosSeleccionados.find(p=>p.id===nuevoItem.id);
                    if(producto){
                        producto.precio = parseFloat(precio.value)
                    }
                    console.log(productosSeleccionados);
                })

                // Botón para eliminar producto
                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "❌";
                btnEliminar.addEventListener("click", () => {
                    // Filtrar el array y eliminar el producto
                    productosSeleccionados = productosSeleccionados.filter(prod => prod.id !== nuevoItem.id);
                    lineaArt.remove();
                    console.log(productosSeleccionados);
                });
                console.log("listaAntes: ", productosSeleccionados);    
            lineaArt.append(cant, prod, precio,btnEliminar)
            detalle.appendChild(lineaArt);
            
            //agrego producto seleccionado al array

            productosSeleccionados.push({
                id: nuevoItem.id,
                cant: parseInt(cant.value),
                nombre: nuevoItem.nombre,
                precio:parseFloat(precio.value),

            })
            console.log("lista: ", productosSeleccionados);

            

            
        }//fin function mostrarProducto

