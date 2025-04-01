import { Header } from "../../js/header.js";
import {iconoVolver, iconoMenu} from "../../js/iconosSVG.js";
import Main from "../../js/main.js";
import { Footer } from "../../js/footer.js";
import { conexionAPI } from "../js/services/conectionFakeApi.js";
import { ButtonContainer } from "../../js/btnsContainer.js";
import { verificaContenedorPrincipal } from "../../js/utils.js";
// import { navigateToPage } from "../../js/navigateToPage.js";


export class SolicitarPerfil {
    constructor(){
        this.contenedorPrincipal = verificaContenedorPrincipal();
        
        this.createHeader();
        this.createMain();
        this.createLineaPerfil();
        this.mostrarLineaPerfil();
        this.createFooter();
        this.createButtonsFooter();
        
    }


    createHeader=()=>{
        this.header = new Header("Ver o Editar Perfil", iconoVolver, iconoMenu, ()=> { navigateToPage('MenuPerfiles') }, ()=> { navigateToPage('MenuVentas')} );
        this.contenedorPrincipal.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main();
        this.contenedorPrincipal.appendChild(this.main.getElement());
        return
    }

    createLineaPerfil = (nombre, apellido, id)=>{
        const lineaPerfil = document.createElement("div");
        lineaPerfil.className ="fullname-vendedor";
        lineaPerfil.setAttribute("id",`${id}`)

            const fullname =document.createElement("label");
                fullname.htmlFor = `vendedor_${id}`;
                fullname.textContent = `${apellido}, ${nombre}`
            
            const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `vendedor`;
                radio.id = `vendedor_${id}`;
                radio.value = `${id}` ;

        lineaPerfil.append(fullname, radio);                    

        return lineaPerfil;    
    }

    mostrarLineaPerfil= async ()=>{
        const main = document.querySelector("main");
        main.innerHTML="";
            const form = document.createElement("form");
            form.className = "opciones-perfiles"
            const perfiles = await conexionAPI.listaperfiles();
            console.log("datos perfiles:",perfiles);
        
            if(perfiles.length===0){
                const mensaje = document.createElement("span");
                mensaje.classList="no_hay_perfiles";
                mensaje.innerText="No existen perfiles de vendedores creados";
                main.appendChild(mensaje);
            }
            
            perfiles.forEach(perfil=>{
                form.append(this.createLineaPerfil(perfil.nombre,perfil.apellido,perfil.id))
            })

            main.appendChild(form)

    }//Acá se debe conectar a la bd y hacemos el foreach para cada perfil

    createFooter=()=>{
        this.footer = new Footer()
        this.contenedorPrincipal.appendChild(this.footer.getElement());
        return
    }

    createButtonsFooter=()=>{
        const form = document.querySelector("form");
        const footer= document.querySelector("footer");
        this.botones= new ButtonContainer("Ver Perfil", "Eliminar",
                                                            (e)=>{
                                                                    verPerfil(e);
                                                                },
                                                             (e)=>{
                                                                eliminarPerfil(e);
                                                                },
                                                             "eye" ,"cancelViolet")
        footer.appendChild(this.botones.getButtonContainer());
    }


}

new SolicitarPerfil;

async function eliminarPerfil(e){
    e.preventDefault;
    const perfilSeleccionado = document.querySelector("input[type='radio']:checked");
    const form = document.querySelector("form");
    const id = perfilSeleccionado.value;
    const contenedorPerfil = document.getElementById(id)
    console.log(contenedorPerfil);

    console.log(id);

    if(perfilSeleccionado){
            await conexionAPI.eliminarPerfil(id);
            contenedorPerfil.remove();    
    }else {
        alert("No hay vendedor seleccionado.");
        console.log("No hay vendedor seleccionado.");
    }


}//fin fc eliminar perfil

async function verPerfil(e){
    e.preventDefault;
    const perfilSeleccionado = document.querySelector("input[type='radio']:checked");
    const id = perfilSeleccionado.value;


    console.log(id);

    if(perfilSeleccionado){
        navigateToPage(`perfilModificar?id=${id}`)
        // loadView(`perfilModificar?id=${id}`)
             
    }else {
        alert("No hay vendedor seleccionado.");
        console.log("No hay vendedor seleccionado.");
    }
    
    
}//fin fc ver perfil