import { Header, iconoVolver, iconoMenu, navigateToMenu } from '../header.js';
import { CardNewProduct } from '../cardNewProduct.js';
import { Notification } from '../notificacion.js';
import { Producto } from '../../js/producto.js';
import { ModalInput } from '../modalInput.js'; 

export class NewProductPage {
    constructor() {
        this.createHeader();
        this.createMain();
    }

    createHeader() {
        const header = new Header('Nuevo producto', iconoVolver, iconoMenu, null, function(){ navigateToMenu('stock'); });
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
                        new Notification('../../../img/emojis/pare.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
                    }
                }).catch(error => {
                    new Notification('../../../img/emojis/pare.png', 'Error inesperado al guardar el producto', 'error');
                });
            }, () => {
                console.log('Acción cancelada');
            });
        }
    }

    async guardarProducto(datosProducto) {
        
        try {
            const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
            
            const nuevoId = productosGuardados.length ? productosGuardados[productosGuardados.length - 1].id + 1 : 1;
            datosProducto.id = nuevoId;
            
            const nuevoProducto = new Producto(
                nuevoId,
                datosProducto.nombre,
                datosProducto.proveedor,
                datosProducto.costo,
                datosProducto.porcentaje,
                datosProducto.stockMinimo,
                datosProducto.stock || 0,
                true // Activo por default
            );
    
            productosGuardados.push(nuevoProducto.toJSON());
            localStorage.setItem('productos', JSON.stringify(productosGuardados));
            return true;
        } catch (error) {
            new Notification('../img/emojis/triste.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
            return false;
        }
    }

    btnSecondaryCallback(event) {
        console.log('Click en btn cancelar');
        this.cardNewProduct.resetForm();
    }

    //---------> Versión LStorage
    generarListaProximoPedido() {   
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
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

        localStorage.setItem('proximoPedido', JSON.stringify(listaProximoPedido));
        console.log('Lista de Próximo Pedido generada:', listaProximoPedido);
    }

    
}

new NewProductPage();
