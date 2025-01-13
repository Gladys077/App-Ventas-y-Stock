import { Header, iconoVolver, iconoMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { CrearInput , CrearTextArea} from "../../js/formulariosvarios.js"
import { conexionAPI } from "../../../public/js/services/conectionFakeApi.js"
import { ButtonContainer } from "../../js/btnsContainer.js"


export class EditarProveedor {
    constructor(){
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createInputs();
        this.createTextArea();
        this.createButtonsForm();

    }

    createHeader=()=>{
        this.header = new Header("Proveedor", iconoVolver, iconoMenu,()=>{ loadView('stockcargaxremito');},()=>{ loadView('pedidolistaxproveedor');});
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
                                                                    editarDatos(e);
                                                                    loadView("stocknuevoremito");
                                                                    },
                                                             ()=>{loadView("stocknuevoremito");},
                                                             "saveWhite" ,"cancelViolet")
        form.appendChild(this.botones.getButtonContainer());
    }



}/*fin class EditarProveedor */
new EditarProveedor;

async function editarDatos(e){
    alert("datos editados");
}