import { Header, iconoVolver, iconoMenu, navigateToMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { CrearInput } from "../js/formulariosvarios.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"
import { Footer } from "../js/footer.js";
import { ButtonContainer } from "../js/btnsContainer.js";


export class BuscadorProductos{
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createCrearInput();
        this.mostrarProductos();
        this.createFooter();
        this.createButtonsFooter();
    }

    createHeader=()=>{
        this.header = new Header("Carga de stock por remito ", iconoVolver, iconoMenu,null,()=>{loadView(stockcargaxremitol)});
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    createCrearInput=()=>{
        const mainForm= document.querySelector("main");
            const seccionBusqueda = document.createElement("section");
            seccionBusqueda.className = "contenedor-buscador"
        
            const inputBusqueda = new CrearInput("buscador","","text","Buscar producto...");
            seccionBusqueda.appendChild(inputBusqueda.getElement());

            const button = document.createElement("button")
            button.className = "buscar-producto"
                const lupa = document.createElement("img")
                lupa.src= "../../img/iconos/lupa.png"
                button.appendChild(lupa);
            seccionBusqueda.appendChild(button)
        mainForm.appendChild(seccionBusqueda);
        //para crear lista de sugerencias
        this.listaSugerencias = document.createElement("ul");
        this.listaSugerencias.id = "sugerencias";
        mainForm.appendChild(this.listaSugerencias);
    
    }


    mostrarProductos= async ()=>{
        try {
            this.productos = await conexionAPI.listaarticulos();
        } catch (error) {
            console.error("Error obteniendo productos: ", error);
            return;
        }
        const inputBusqueda = document.querySelector(".buscador")
        inputBusqueda.addEventListener("input", ()=>filtrarProductos());
        
    }

    
    createFooter=()=>{
        this.footer = new Footer()
        document.body.appendChild(this.footer.getElement());
        return
    }

    createButtonsFooter=()=>{
        const footerRegistro= document.querySelector(".footer-container");
        this.botones= new ButtonContainer(
            "Nuevo Producto", 
            "Remito",
             ()=>{},
             ()=>{},
             "save2",
             "cancelViolet" )
        footerRegistro.appendChild(this.botones.getButtonContainer());
        return
    }

}

new BuscadorProductos();


async function agregarRemito(e){
    e.preventDefault();
    const remitoid="rtn"+Math.floor(Math.random()*1000);
    const numero= document.querySelector(".contenedor-remito input").value;
    const fecha= document.querySelector(".contenedor-fecha input").value;
    const proveedor= document.querySelector(".contenedor-proveedores input[type='radio']:checked").id;


    console.log("datos que se envian", numero, fecha, proveedor,remitoid);
    await conexionAPI.nuevoRemito(remitoid, numero,fecha,proveedor,[])
    loadView(`stockcargaxremito?id=${remitoid}`)
}/*fin agregarRemito */

function filtrarProductos() {
    const texto = this.inputBusqueda.value.toLowerCase();
    this.listaSugerencias.innerHtml="";

    if(texto.length>0){
        const resultados = this.productos.filter(producto => 
            producto.nombre.toLowerCase().includes(texto))

        resultados.forEach(prod=>{
            const item = document.createElement("li");
            item.textContent = prod.nombre;
            item.classList.add("sugerencia-producto");
    
            item.addEventListener("click", ()=>{
                this.inputBusqueda.value = prod.nombre;
                this.listaSugerencias.innerHTML = "";
            });
            this.listaSugerencias.appendChild(item);
        })
    };
    
}//fin function filtrarProductos