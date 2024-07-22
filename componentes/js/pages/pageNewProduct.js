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
        //----------------> Versión para guardar en la BBDD (ver con LIO):
        // try {
        //     const response = await fetch('http://localhost:5500/api/productos', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(datosProducto)
        //     });
    
        //     if (response.ok) {
        //         new Notification('../../../img/emojis/like.png', '¡Producto guardado exitosamente!', 'success');
        //         return true;
        //     } else {
        //         new Notification('../../../img/emojis/pare.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
        //         return false;
        //     }
        // } catch (error) {
        //     new Notification('../../../img/emojis/pare.png', 'Error inesperado al guardar el producto', 'error');
        //     return false;
        // }


        // ------> Versión LStorage
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
    
            productosGuardados.push(nuevoProducto);
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

    //-------> Versión usando BBDD
    /*
    async generarListaProximoPedido() {
        try {
            // Obtener todos los productos desde la base de datos
            const response = await fetch('http://localhost:5500/api/productos');
            
            if (!response.ok) {
                throw new Notification('../img/emojis/mueca.png', '¡Ups! Hubo un error al obtener los productos de la base de datos', 'error');
            }

            const productosGuardados = await response.json();
            const listaProximoPedido = [];

            // Generar la lista de "Próximo Pedido"
            productosGuardados.forEach(producto => {
                if (producto.stock < producto.stockMinimo) {
                    const itemProxPedido = {
                        nombre: producto.nombre,
                        proveedores: producto.proveedor.map(prov => ({
                            proveedor: prov.nombre,
                            costo: prov.costo,
                            cantidad: 0 // Iniciar con 0, luego se puede actualizar al momento de realizar el pedido
                        }))
                    };
                    listaProximoPedido.push(itemProxPedido);
                }
            });

            // Guardar la lista de "Próximo Pedido" en la base de datos
            const saveResponse = await fetch('http://localhost:5500/api/proximoPedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listaProximoPedido)
            });

            if (!saveResponse.ok) {
                throw new Notification('../img/emojis/mueca.png', '¡Ups! Hubo un error al guardar la lista de Próximo Pedido en la base de datos', 'error');

            }

            console.log('Lista de Próximo Pedido generada y guardada en la BBDD:', listaProximoPedido);
        } catch (error) {
            console.error('Error al generar la lista de Próximo Pedido:', error);
            new Notification('../../../img/emojis/pare.png', '¡Ups! Hubo un fallo al generar la lista de Próximo Pedido. Por favor, intenta de nuevo.', 'error');
        }
    }
    */

}

new NewProductPage();
