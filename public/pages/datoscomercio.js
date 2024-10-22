import { Header, iconoVolver, iconoMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { CrearInput } from "../js/formulariosvarios.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"
import { ButtonContainer } from "../../js/btnsContainer.js"

export class DatosComercio {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createInputs();
        this.createButtonsForm();
    }

    
    createHeader=()=>{
        this.header = new Header("Datos del Comercio", iconoVolver, iconoMenu,()=>{},()=>{ loadView('formnuevoproveedor');});
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main();
        document.body.appendChild(this.main.getElement());
        return
    }

    createInputs=()=>{
        const mainForm=document.querySelector("main");
        const form=document.createElement("form");

        this.comercio= new CrearInput("nombre-comercio", "Nombre del Comercio", "text");
        form.appendChild(this.comercio.getElement());

        this.inscripcion= new CrearInput("num-inscripcion", "Número de Inscripción (CUIT)", "text");
        form.appendChild(this.inscripcion.getElement());

        this.direccion= new CrearInput("direccion", "Dirección", "text");
        form.appendChild(this.direccion.getElement());

        this.numContacto= new CrearInput("llamar", "Teléfono / Celular", "text");
        form.appendChild(this.numContacto.getElement());

        this.email= new CrearInput("email","Email","text");
        form.appendChild(this.email.getElement());

        mainForm.appendChild(form);

        return mainForm;

    }

    createButtonsForm=()=>{
        const form= document.querySelector("form");
        this.botones= new ButtonContainer("Guardar", "Cancelar",
                                                            (e)=>{
                                                                agregarComercio(e);
                                                                form.reset();},
                                                             ()=>{form.reset();},
                                                             "saveWhite" ,"cancelViolet")
        form.appendChild(this.botones.getButtonContainer());
    }

}/*fin class DatosComercio */
new DatosComercio;

async function agregarComercio(e){
    e.preventDefault();
    const nombre= document.querySelector(".contenedor-nombre-comercio input").value;
    const inscripcion= document.querySelector(".contenedor-num-inscripcion input").value;
    const direccion= document.querySelector(".contenedor-direccion input").value;
    const email= document.querySelector(".contenedor-email input").value;
    const contacto= document.querySelector(".contenedor-llamar input").value;
    console.log(nombre, inscripcion, direccion, email, contacto);
    await conexionAPI.nuevocomercio(nombre, inscripcion, direccion, email, contacto);

}