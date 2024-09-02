import { Header } from '../../js/header.js';
import { iconoVolver, iconoMenu } from '../../js/iconosSVG.js';
import { CardNewProduct } from '../../js/cardNewProduct.js';
import { Notification } from '../../js/notificacion.js';
import { Producto } from '../../js/producto.js';
import { ModalInput } from '../../js/modalInput.js'; 
import { navigateToPage } from "../../js/navigateToPage.js";


export class NewProductPage {
    constructor() {
        document.body.innerHTML = ''; 
        this.createHeader();
        this.createMain();
    }

    createHeader() {
        const header = new Header('Nuevo producto', iconoVolver, iconoMenu, ()=>window.history.back() , ()=>navigateToPage('MenuStock'));
        document.body.appendChild(header.getElement());
    }

    createMain() {
        this.cardNewProduct = new CardNewProduct(
            'Guardar', 
            'Cancelar', 
            this.btnPrimaryCallback.bind(this), 
            this.btnSecondaryCallback.bind(this)
        );
        document.body.appendChild(this.cardNewProduct.getElement());
    }
    
    btnPrimaryCallback(event) {
        if (event) event.preventDefault();
        
        if (this.cardNewProduct.validarCampos()) {
            const datosProducto = this.cardNewProduct.obtenerDatosProducto();
            
            // Modal para ingresar la cantidad
            new ModalInput('Cantidad', (cantidad) => {
                datosProducto.stock = parseInt(cantidad, 10) || 1; // Cantidad ingresada o 1 por default
                this.guardarProducto(datosProducto).then(guardadoExitoso => {
                    if (guardadoExitoso) {
                        new Notification('../../../img/emojis/like.png', '¡Producto guardado exitosamente!', 'success');
                        this.cardNewProduct.resetForm();
                    } else {
                        new Notification('../../../img/emojis/preocupado.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
                    }
                }).catch(error => {
                    new Notification('../../../img/emojis/triste.png', 'Error inesperado al guardar el producto', 'error');
                });
            });
        }
    }

    async guardarProducto(datosProducto) {
        try {
            //-------> Guardar en LocalStorage
            const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
            productosGuardados.push(datosProducto);
            localStorage.setItem('productos', JSON.stringify(productosGuardados));

            return true;



            //-------> Guardar en la base de datos (comentar esto por ahora)
            /*
            const response = await fetch('/ruta-a-la-api-para-guardar-producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosProducto)
            });
    
            if (!response.ok) {
                throw new Notification('../../../img/emojis/preocupado.png', 'Error en la respuesta del servidor', 'error');
            }
    
            const data = await response.json();
            return data.success; // Ver con LIO
            */
        } catch (error) {
            console.error('Error al guardar el producto', error);

            new Notification('../../../img/emojis/mueca.png', 'Error al guardar el producto', 'error');
            return false;
        }
    }
    

    btnSecondaryCallback(event) {
        if (event) event.preventDefault();
        this.cardNewProduct.resetForm();
    }

    //---------> Versión LStorage
    async generarListaProximoPedido() {
        try {
            // Obtener productos desde la API
            const responseProductos = await fetch('/ruta-a-la-api-para-obtener-productos');
            if (!responseProductos.ok) {
                throw new Notification('../../../img/emojis/preocupado.png', 'Error al obtener los productos desde el servidor', 'error');
            }
            const productosGuardados = await responseProductos.json();
    
            const listaProximoPedido = [];
    
            productosGuardados.forEach(producto => {
                if (producto.stock < producto.stockMinimo) {
                    const itemProxPedido = {
                        nombre: producto.nombre,
                        proveedores: producto.proveedor.map(prov => ({
                            proveedor: prov.nombre,
                            costo: prov.costo,
                            cantidad: 0 // Inicia con 0, luego se puede actualizar al momento de realizar el pedido
                        }))
                    };
                    listaProximoPedido.push(itemProxPedido);
                }
            });
    
            // Enviar la lista de próximo pedido a la API
            const responseGuardarPedido = await fetch('/ruta-a-la-api-para-guardar-proximo-pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listaProximoPedido)
            });
    
            if (!responseGuardarPedido.ok) {
                throw new Notification('../../../img/emojis/asombro.png', 'Error al guardar la lista de próximo pedido en el servidor', 'error');
            }
    
            console.log('Lista de Próximo Pedido generada:', listaProximoPedido);
        } catch (error) {
            new Notification('../../../img/emojis/asombro.png', `Error al generar la lista de próximo pedido`, 'error');

            console.error('Error al generar la lista de próximo pedido:', error);
        }
    }
    

    
}

new NewProductPage();
