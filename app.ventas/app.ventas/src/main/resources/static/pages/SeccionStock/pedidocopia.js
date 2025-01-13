import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../..//js/header.js";
import Main from "../../js/main.js";
import { TablaEncabezado, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js"
import { Footer } from "../../js/footer.js"
import { ButtonContainer } from "../../js/btnsContainer.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"


export class PlanillaPedidoCopia {
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
        // this.createEnlace();
        this.createButtonsFooter();
        this.createAzBtn();

    }

    createHeader=()=>{
        this.header = new Header("Copia - pedido", iconoVolver, iconoMenu,null,()=>{loadView("pedidolistaxproveedor")});
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


    createLineaArticulo= (cant,nombre, proveedores)=>{
        
        const lineaArt = document.createElement("div");
        lineaArt.className = "tabla_lineaArticulo";
            
            const input = document.createElement("input");
            input.className = "cant";
            input.value=`${cant}`;
    
        

            const prod = document.createElement("div");
            prod.className="producto";
            prod.textContent= `${nombre}`;
            // console.log(nombre);
            

            const precio = document.createElement("div");
            precio.className = "precio";

                let costo = parseInt(input.value) * 0;//este precio debería venir del proveedor ya seleccionado desde otra pantalla?? ahora vale cero
                const spanprecio= document.createElement("span")
                    spanprecio.textContent = costo;
            precio.appendChild(spanprecio);
            
            const listaProv = document.createElement("div");
            listaProv.className = "cont-proveedores _oculto";

                if(Array.isArray(proveedores)&&proveedores.length>0){
                    proveedores.forEach(proveedor=>{
                        const opcion = document.createElement("div");
                        opcion.className = "proveedor_opcion";

                            const radio = document.createElement("input");
                            radio.type = "radio"
                            radio.name = `proveedor_${nombre}`;
                            radio.value= `${proveedor.precio}`;
                            radio.id = `prov_${proveedor.id}`;
                            

                            const label = document.createElement("label");
                            label.htmlFor = `prov_${proveedor.id}`;
                            label.textContent = `${proveedor.nombre}`;

                            const span = document.createElement("span");
                            span.textContent = `${proveedor.precio}`;

                            radio.addEventListener("change", () => {
                                costo = parseInt(input.value) * parseInt(proveedor.precio); // Precio basado en cantidad y precio del proveedor
                                spanprecio.textContent = costo; // Actualizamos el texto del precio
                            });
                            input.addEventListener("input", ()=>{
                                costo = parseInt(input.value) * parseInt(proveedor.precio); // Precio basado en cantidad y precio del proveedor
                                spanprecio.textContent = costo; // Actualizamos el texto del precio)
                            });
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
        
    }//Se crea la linea de articulo para hacer el foreach 

    mostrarLineasArticulos = async ()=>{

        const tablaDetalles = document.querySelector(".tabla_detalles");
        const articulos = await conexionAPI.listaarticulos();
        // console.log(articulos);

        if(articulos.length===0){
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_productos";
            mensaje.innerText="no existen articulos en el pedido";
            main.appendChild(mensaje);
        }

        articulos.forEach(articulo=>{
            tablaDetalles.append(this.createLineaArticulo(articulo.cant,articulo.nombre, articulo.proveedores))
            console.log("nombre " + articulo.nombre,  "proveedores " +articulo.proveedores);
        })

        calcularTotal()

    }//Acá se debe conectar a la bd y hacemos el foreach para cada articulo

    createAgregarManualmente= ()=>{
        const mainPedido = document.querySelector("main");
        this.boton= new BtnFlotante("agregaManualmente", "contenedor-btn-flotante agregarManualmente", ()=>{alert("Debe abrir un modal para agregar artículos manualmente");},"Agregar al pedido")
        mainPedido.appendChild(this.boton.getElement());
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

    // createEnlace=()=>{
    //     const footer =document.querySelector("footer");
    //     const enlace = document.createElement("a");
    //     enlace.href="#";//hay que agregar el enlace a pedidolistaxproveedor.js
    //     enlace.textContent="Listado por proveedor";
    //     enlace.addEventListener("click", ()=>{
    //         loadView("pedidolistaxproveedor")
    //     })
    //     footer.appendChild(enlace);
    //     return
    // }

    createButtonsFooter=()=>{
        const footerRegistro= document.querySelector("footer");
        this.botones= new ButtonContainer("Finalizar Pedido", "Listar por Proveedor", ()=>{console.log("se guardó pedido");},()=>{loadView("pedidolistaxproveedor")},"save2","pedidoPorProveedorViolet" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
    }

}

new PlanillaPedidoCopia();


function visibilidadOpciones(event){
    const lineaArticulo=event.target.closest(".tabla_lineaArticulo")
    const cont_proveedores=lineaArticulo.querySelector(".cont-proveedores");
    const btnmostrar = lineaArticulo.querySelector(".mostrar-mas");
    const btnocultar = lineaArticulo.querySelector(".mostrar-menos")

    cont_proveedores.classList.toggle("_oculto");
    btnmostrar.classList.toggle("_oculto");
    btnocultar.classList.toggle("_oculto");

}

function calcularTotal(){
    
    const precios =document.querySelectorAll(".precio");
    console.log(typeof(precios));
    console.log("todos los precio", precios);
        let totalPedido = 0;
        precios.forEach(precio =>{
            const span = precio.querySelector("span");
            totalPedido += parseFloat(span.textContent);
            // if(span&&span.textContent){
            //     totalPedido += parseFloat(span.textContent);
            // }
            
        });
        document.querySelector(".valorTotal").textContent = `$${totalPedido}`;

}