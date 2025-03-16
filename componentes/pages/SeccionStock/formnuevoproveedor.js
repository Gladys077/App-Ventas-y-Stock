import { Header } from "../../js/header.js";
import { iconoVolver, iconoMenu, iconoCancelViolet, iconoGuardar } from "../../js/iconosSVG.js";
import Main from "../../js/main.js";
import { CrearInput , CrearTextArea} from "../../js/formulariosvarios.js";
import { conexionAPI } from "../../../public/js/services/conectionFakeApi.js";
import { Footer } from "../../js/footer.js";
import { ButtonContainer } from "../../js/btnsContainer.js";
import { navigateToPage } from '../../js/navigateToPage.js';
import { Notification } from "../../js/notificacion.js";


export class NuevoProveedor {
    constructor(){
        document.body.innerHTML = ''; 
        this.createHeader();
        this.mainPedido=this.createMain();
        this.createInputs();
        this.createTextArea();
        this.createFooter();
        this.createButtonsForm();
    }

    createHeader=()=>{
        this.header = new Header("Nuevo proveedor", iconoVolver, iconoMenu, ()=>window.history.back(), ()=>navigateToPage('MenuStock'));
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
        this.botones= new ButtonContainer(
            "Guardar", 
            "Cancelar",
            (e)=>{ agregarProveedor(e); // Llama a la función para guardar
                   form.reset();},
            (e) => { e.preventDefault(); // Evita comportamiento predeterminado (como recargar la página)
            form.reset();}, // Limpia los campos escritos
            iconoGuardar,
            iconoCancelViolet);
        form.appendChild(this.botones.getButtonContainer());
    };

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
    // await conexionAPI.nuevoproveedor(nombre,[],vendedor,cel,email,notas)


    // Verificar campos obligatorios
    if (!nombre) {
        new Notification(
            '../../../img/emojis/pare.png',
            'Faltan completar el nombre de la empresa proveedora',
            'error'
        );
    } else if (!vendedor) {
            new Notification(
                '../../../img/emojis/pare.png',
                'Faltan completar el nombre del vendedor',
                'error'
            );
    } else if (!cel) {
                new Notification(
                    '../../../img/emojis/pare.png',
                    'Falta completar el número de teléfono o celular',
                    'error'
                );
            } else {
                
                // Si toda la información está completa, puedes proceder a guardar
                // await conexionAPI.nuevoproveedor(nombre, [], vendedor, cel, email, notas);

                new Notification(
                    '../../../img/emojis/like.png',
                    '¡Proveedor guardado exitosamente!',
                    'success'
                );
                // Aquí llamarías a la función para guardar el proveedor
                form.reset(); // Vacía los campos únicamente si la información se guardó correctamente
            }}

    // Guardar la información
    try {
        console.log(nombre, vendedor, cel, email, notas);

        // Notificación de éxito
        new Notification(
            '../../../img/emojis/like.png',
            '¡El proveedor se guardó correctamente!',
            'success'
        );
    } catch (error) {
        console.error(error);
        new Notification(
            '../../../img/emojis/triste.png',
            'Hubo un error al guardar el proveedor.',
            'error'
        );
    }



/*fin agregarProveedor */

