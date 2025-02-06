import { Header, iconoVolver, iconoMenu } from "../../js/header.js";
import Main from "../../js/main.js";
import { CrearInput , CrearSectionOptions} from "../js/formulariosvarios.js"
import { conexionAPI } from "../js/services/conectionFakeApi.js"
import { ButtonContainer } from "../../js/btnsContainer.js"


export class ModificarPerfil {
    constructor(idPerfil){
        this.idPerfil=idPerfil;
        this.init()
    }

    async init(){
        this.createHeader();
        this.createMain();
        this.createInputs();
        this.createCheckBoxes();
        await this.traerPerfil();
        this.createButtonsForm();
        
    }

    

    createHeader=()=>{
        this.header = new Header("Modificar Perfil", iconoVolver, iconoMenu, null, null);//hay que agregar la navegación de los botones
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
                                                                    actualizarPerfil.bind(this);
                                                                    alert("Perfil Actualizado")
                                                                    },
                                                                ()=>{},
                                                                "saveWhite" ,"cancelViolet")
        form.appendChild(this.botones.getButtonContainer());
    }


    traerPerfil=async()=>{
        const perfil = await conexionAPI.mostrarPerfil(this.idPerfil);
        console.log(perfil);
            document.querySelector(".contenedor-nombre-perfil input").value=perfil.nombre;
            document.querySelector(".contenedor-apellido-perfil input").value=perfil.apellido;
            document.querySelector(".contenedor-llamar input").value=perfil.Tel;
            document.querySelector(".contenedor-email input").value=perfil.email;
            document.querySelector(".contenedor-ver-stock input").checked=perfil.verstock;
            document.querySelector(".contenedor-recargar-stock input").checked=perfil.recargastock;
            document.querySelector(".contenedor-agregar-producto input").checked=perfil.nuevoproducto;
            document.querySelector(".contenedor-modificar-producto input").checked=perfil.modproducto;
            document.querySelector(".contenedor-eliminar-producto input").checked=perfil.eliminar;
    }


}

// new ModificarPerfil;


async function actualizarPerfil(e){
    e.preventDefault();
    const id = this.idPerfil;
    if(!id){
        console.log("no se encontró id");
        return
    }
    const nombre = document.querySelector(".contenedor-nombre-perfil input").value;
    const apellido = document.querySelector(".contenedor-apellido-perfil input").value;
    const tel = document.querySelector(".contenedor-llamar input").value;
    const email = document.querySelector(".contenedor-email input").value;
    const verStock = document.querySelector(".contenedor-ver-stock input").checked;
    const recargaStock = document.querySelector(".contenedor-recargar-stock input").checked;
    const agregarProducto = document.querySelector(".contenedor-agregar-producto input").checked;
    const modificarProducto = document.querySelector(".contenedor-modificar-producto input").checked;
    const eliminarProducto = document.querySelector(".contenedor-eliminar-producto input").checked;

    console.log(nombre, apellido, tel, email, verStock,recargaStock,agregarProducto,modificarProducto,eliminarProducto);
    const resultado = await conexionAPI.actualizarPerfil(id,nombre, apellido, tel, email, verStock,recargaStock,agregarProducto,modificarProducto,eliminarProducto)
    if(resultado){
        console.log("Perfil actualizado correctamente: ", resultado);
    }else{
        console.log("no se pudo actualizar");
    }
}/*fin actualizarPerfil */