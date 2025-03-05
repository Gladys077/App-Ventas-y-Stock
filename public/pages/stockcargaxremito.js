import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { MostrarRemito, TablaEncabezado, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js";
import { ButtonContainer } from "../../js/btnsContainer.js";
import { conexionAPI } from "../js/services/conectionFakeApi.js";

export class PlanillaStockCargaxRemito {
    constructor(id) {
        this.id = id;
        this.init();
    }

    async init() {
        this.createHeader();
        this.mainPedido = this.createMain();
        await this.traerRemito(); // Espera que se obtengan los datos antes de continuar
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaArticulo();
        this.mostrarArticulos();
        this.createTablaFooter();
        this.createBtnFlotante();
        this.createFooter();
        this.createButtonsFooter();
    }


    
    traerRemito=async()=>{
        const remito=await conexionAPI.mostrarRemito(this.id);
        console.log("remito recibido", remito);
        console.log("remito recibido", remito.numero, remito.fecha, remito.proveedor);
        const mainPedido= document.querySelector("main");
        const datosRemito =  new MostrarRemito(remito.numero, remito.fecha, remito.proveedor)
        mainPedido.appendChild(datosRemito.getElement());
    }

    createHeader= () => {
        
        this.header = new Header("Carga de stock por remito", iconoVolver, iconoMenu,()=>{loadView("stocknuevoremito")},function(){ navigateToMenu('stock'); });
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
        this.encabezado = new TablaEncabezado("CANT", "PRODUCTO","PRECIO")
        mainPedido.appendChild(this.encabezado.getElement());
    }

    createTablaDetalles= ()=>{
        const mainPedido=document.querySelector("main");
        this.detalles= new TablaDetalles();
        mainPedido.appendChild(this.detalles.getElement());
    }

    createLineaArticulo= (id,cant,producto,precioUnitario)=>{
        const detalle = document.querySelector(".tabla_detalles")
        const lineaArt = document.createElement("div");
        lineaArt.className = "tabla_lineaArticulo";
        lineaArt.id = id;

            const input = document.createElement("input");
            input.className = "cant";
            input.value= cant;
            input.setAttribute("data-price", precioUnitario)
            input.addEventListener("input", (event)=>actualizarPrecio(event))

            const prod = document.createElement("div");
            prod.className="producto";
            prod.textContent= producto;
                        

            const precio = document.createElement("div");
            precio.className = "precio";
                let costo = parseInt(input.value) * parseFloat(`${precioUnitario}`)//calculo. Funciona ok
            
                    const spanprecio= document.createElement("span")
                    spanprecio.textContent = costo;

                    const buttonEliminar= document.createElement("button");
                        const iconEliminar = document.createElement("img");
                        iconEliminar.src= "../img/iconos/cancel2rojo.png"
                        iconEliminar.className = "iconEliminar";
                        iconEliminar.addEventListener("click", (e) =>{
                            e.preventDefault();
                            const art = document.getElementById(`${id}`)
                            conexionAPI.borrararticulo(`${id}`);
                            detalle.removeChild(art);
                            calcularTotal();
                            
                        }) 
                    buttonEliminar.appendChild(iconEliminar);    

            precio.append(spanprecio, buttonEliminar)        
                    
            lineaArt.append(input, prod, precio)
        
            return lineaArt
            

    }//fin creaLineaArticulo

    mostrarArticulos = async ()=>{
            const tablaDetalles = document.querySelector(".tabla_detalles");
            tablaDetalles.innerHTML = "";
            const remito = await conexionAPI.mostrarRemito(this.id);
            console.log("datos de remito: ", remito)
            console.log(JSON.stringify(remito, null, 2));
            const listaArticulos = remito.lista;
            console.log(JSON.stringify(listaArticulos, null, 2));

            if(Array.isArray(listaArticulos) && listaArticulos.length>0){
                    listaArticulos.forEach(articulo=>{
                        tablaDetalles.append(this.createLineaArticulo(articulo.id, articulo.cant, articulo.nombre, articulo.precio))
                        // console.log("Cant " + articulo.cant,  "producto " +articulo.producto, "precio " + articulo.precioUnitario);
                    })

            }
            

    
            calcularTotal();
    
    }//Recibe los datos de remito de la api y muestra todas las líneas de artículos

    createTablaFooter= ()=>{
        const mainPedido=document.querySelector("main");
        this.footer = new TablaFooter()
        mainPedido.appendChild(this.footer.getElement());
    }//fin createTabaFooter

    
    createBtnFlotante= ()=>{
        const mainPedido=document.querySelector("main");
        this.btn = new BtnFlotante(
            "masblanco",
            "contenedor-btn-flotante adicionarArticulo", 
            ()=>{
                document.querySelector(".tabla_detalles").innerHTML="";
                loadView(`stocknuevoremitocargaproductos?id=${this.id}`)});
        mainPedido.appendChild(this.btn.getElement());

    }//fin createBtnFlotante

    createFooter=()=>{
        this.footer = new Footer()
        document.body.appendChild(this.footer.getElement());
        return
    }//Fin createFooter

    createButtonsFooter=()=>{
        const footerRegistro= document.querySelector(".footer-container");
        this.botones= new ButtonContainer(
                "Guardar", 
                "Cancelar", 
                async()=>{
                    const remito = await conexionAPI.mostrarRemito(this.id);
                    
                        await conexionAPI.actualizarRemito(remito.id, remito.numero,remito.fecha,remito.proveedor,remito.lista)
                        alert("remito actualizado correctamente")
                        loadView("stocknuevoremito");
                    
                    
                },
                async()=>{
                    await conexionAPI.borrarRemito(this.id);
                    alert("se canceló ingreso remito");
                    loadView("stocknuevoremito");
                },
                "save2",
                "cancelViolet" 
            )
        footerRegistro.appendChild(this.botones.getButtonContainer());
        return
    }//fin createButtonsFooter




}//fin class PlanillaStockCargaxRemito

// new PlanillaStockCargaxRemito();


//Funcionalidades
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

        }//fin calcularTotal

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
                    
                const response = await fetch(`http://localhost:3000/remito/${idArt}`,{
                    method:"PATCH" ,
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify({
                        lista:[
                            {cant: cantArt }
                        ]
                                    
                    })

                })
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                } else {
                    console.log('Actualización exitosa en db.json');
                }
            } catch (error) {
                console.error('Hubo un problema al actualizar el remito:', error);
            }

        }//Fin actualizarPrecio


