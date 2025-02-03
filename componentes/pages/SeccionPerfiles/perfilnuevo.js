import { Header, iconoVolver, iconoMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { CrearInput , CrearSectionOptions} from "../js/formulariosvarios.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"
import { ButtonContainer } from "../../js/btnsContainer.js"


export class NuevoPerfil {
    constructor(){
        this.createHeader();
        this.createMain();
        this.createInputs();
        this.createCheckBoxes();
        this.createButtonsForm();
    }


    createHeader=()=>{
        this.header = new Header("Creando Nuevo Perfil", iconoVolver, iconoMenu, null, null);//hay que agregar la navegación de los botones
        document.body.appendChild(this.header.getElement());
        return
    }

    createMain=()=>{
        this.main = new Main();
        document.body.appendChild(this.main.getElement());
        return
    }

    createInputs=()=>{
        const mainForm = document.querySelector("main");
        const form = document.createElement("form");

        this.nombre = new CrearInput("nombre-perfil","Nombre","text");
        form.appendChild(this.nombre.getElement());

        this.apellido= new CrearInput("apellido-perfil","Apellido","text");
        form.appendChild(this.apellido.getElement());

        this.telefono= new CrearInput("llamar","Teléfono/Celular","text");
        form.appendChild(this.telefono.getElement());

        this.email= new CrearInput("email","E-mail","text");
        form.appendChild(this.email.getElement());

        this.permisos =  new CrearInput("permisos","Permisos", null)

        form.appendChild(this.permisos.getElement());

        mainForm.appendChild(form);
    }

    createCheckBoxes=()=>{
        const contenedor = document.querySelector(".contenedor-permisos");
            const opciones = document.createElement("div");
            opciones.className = "opciones";
                                
                this.verStock = new CrearSectionOptions("ver-stock","Ver stock", "checkbox")
                opciones.append(this.verStock.getElement());

                this.recargarStock = new CrearSectionOptions("recargar-stock","Recargar stock", "checkbox")
                opciones.append(this.recargarStock.getElement());

                this.agregarProducto= new CrearSectionOptions("agregar-producto","Agregar Producto", "checkbox")
                opciones.append(this.agregarProducto.getElement());

                this.modificarProducto = new CrearSectionOptions("modificar-producto","Modificar Producto", "checkbox")
                opciones.append(this.modificarProducto.getElement());

                this.eliminarProducto = new CrearSectionOptions("eliminar-producto","Eliminar Producto", "checkbox")
                opciones.append(this.eliminarProducto.getElement());


            contenedor.appendChild(opciones);    

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
    


}

new NuevoPerfil;