import { Header, iconoVolver, iconoMenu, navigateToMenu } from '../header.js';
import { CardNewProduct } from '../cardNewProduct.js';
import { Notification } from '../notificacion.js';
import { Producto } from '../../js/producto.js';

export class NewProductPage {
    constructor() {
        this.createHeader();
        this.createMain();
        this.createPage();
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
    
    async btnPrimaryCallback(event) {
        if (event) event.preventDefault();
        
        if (this.cardNewProduct.validarCampos()) {
            try {
                const datosProducto = this.cardNewProduct.obtenerDatosProducto();
                const guardadoExitoso = await this.guardarProducto(datosProducto);
                if (guardadoExitoso) {
                    new Notification('../../../img/emojis/like.png', '¡Producto guardado exitosamente!', 'success');
                    this.cardNewProduct.resetForm();
                } else {
                    new Notification('../../../img/emojis/pare.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
                }
            } catch (error) {
                new Notification('../../../img/emojis/pare.png', 'Error inesperado al guardar el producto', 'error');
            }
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

        // Versión LStorage
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

    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
    }
}

new NewProductPage();