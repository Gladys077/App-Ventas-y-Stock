import { Header } from "../../js/header.js";
import { iconoVolver, iconoMenu } from "../../js/iconosSVG.js"
import Main from "../../js/main.js";
import { CrearInput } from "../js/formulariosvarios.js"
import { conexionAPI } from "../../../public/js/services/conectionFakeApi.js"

export class NuevoRemito{
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createCrearInput();
        this.crearCard();
        this.mostrarCards();
    }

    createHeader=()=>{
        this.header = new Header("Carga de stock por remito", iconoVolver, iconoMenu,null,()=>{loadView(pedidoactual)});
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
        this.input = new CrearInput("remito","REMITO N°","text","Ingresa el número");
        
        this.fecha = new CrearInput("fecha", "FECHA", "date")
        mainForm.appendChild(this.input.getElement());
        mainForm.appendChild(this.fecha.getElement());
    }


    crearCard= (proveedores)=>{

        const card = document.createElement("section");
        card.className = "contenedor-proveedores";
            const titulo = document.createElement("div");
            titulo.className = "seleccionar-proveedor"
                    const span = document.createElement("span");
                    span.textContent = "SELECCIONAR PROVEEDOR"
            titulo.appendChild(span);
        card.appendChild(titulo);    

            if (Array.isArray(proveedores) && proveedores.length > 0) {
                proveedores.forEach(proveedor=>{                    
                    const linea = document.createElement("div");
                    linea.className="nombre-proveedor";
                        const span = document.createElement("span");
                        span.textContent=`${proveedor.nombre}`
                    linea.appendChild(span);
                        const input = document.createElement("input");
                        input.type ="radio";
                    linea.appendChild(input);        
                
                card.appendChild(linea);
                        
                })
            } else {
                console.error('Error: proveedor no es un array o está vacía');
            }
        
            const sinDatos= document.createElement("div");
            sinDatos.className="nombre-proveedor";
            sinDatos.innerHTML= `<span>Sin datos</span><input type="radio" class=""></input>`;

            const nuevoDato=  document.createElement("div");
            nuevoDato.className="nombre-proveedor";
            nuevoDato.innerHTML= `<span>NUEVO PROVEEDOR</span><input type="radio" class=""></input>`

        card.append(sinDatos, nuevoDato);


        return card
    }
    
    mostrarCards= async ()=> {
        const main = document.querySelector("main");
        const proveedores = await conexionAPI.listaproveedores();
        console.log(proveedores);
        

        if(proveedores.length===0){
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_proveedores";
            mensaje.innerText="no existen proveedores";
            main.appendChild(mensaje);
        }
        
        
        main.appendChild(this.crearCard(proveedores))
        
        
    }


}

new NuevoRemito();