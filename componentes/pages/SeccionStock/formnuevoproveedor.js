import { Header, iconoVolver, iconoMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { CrearInput , CrearTextArea} from "../../js/formulariosvarios.js"
import { conexionAPI } from "../../../public/js/services/conectionFakeApi.js"
import { ButtonContainer } from "../../js/btnsContainer.js"


export class NuevoProveedor {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createInputs();
        this.createTextArea();
        this.createButtonsForm();

    }

    createHeader=()=>{
        this.header = new Header("Nuevo proveedor", iconoVolver, iconoMenu,()=>{ loadView('stockcargaxremito');},()=>{ loadView('pedidolistaxproveedor');});
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main()
        document.body.appendChild(this.main.getElement());
        return
    }

    createInputs=()=>{
        const mainForm= document.querySelector("main");
        const form= document.createElement("form")
        
        this.empresa = new CrearInput("nombre-proveedor","Empresa Proveedora","text");
        form.appendChild(this.empresa.getElement());

        this.vendedor = new CrearInput("nombre-vendedor","Nombre del Vendedor/a","text");
        form.appendChild(this.vendedor.getElement());

        this.numContacto = new CrearInput("llamar","Teléfono / Celular","text");
        form.appendChild(this.numContacto.getElement());

        this.email= new CrearInput("email","Email","text");
        form.appendChild(this.email.getElement());

        mainForm.appendChild(form);

        return mainForm;

    }

    createTextArea=()=>{
        const form= document.querySelector("form");
        
        this.textarea = new CrearTextArea("notas","Notas");
        form.appendChild(this.textarea.getElement());        
    }

    createButtonsForm=()=>{
        const form= document.querySelector("form");
        this.botones= new ButtonContainer("Guardar", "Cancelar",
                                                            (e)=>{
                                                                    agregarProveedor(e);
                                                                    form.reset();},
                                                             ()=>{form.reset();},
                                                             "saveWhite" ,"cancelViolet")
        form.appendChild(this.botones.getButtonContainer());
    }



}/*fin class NuevoProveedor */
new NuevoProveedor;

    
async function agregarProveedor(e){
    e.preventDefault();
    const nombre= document.querySelector(".contenedor-nombre-proveedor input").value;
    const vendedor= document.querySelector(".contenedor-nombre-vendedor input").value;
    const cel= document.querySelector(".contenedor-llamar input").value;
    const email= document.querySelector(".contenedor-email input").value;
    const notas= document.querySelector(".contenedor-notas textarea").value;
    console.log(nombre, vendedor, cel, email, notas);
    await conexionAPI.nuevoproveedor(nombre,[],vendedor,cel,email,notas)
}/*fin agregarProveedor */

