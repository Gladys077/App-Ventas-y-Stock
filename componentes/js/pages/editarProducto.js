import { Header, iconoVolver, iconoMenu, navigateToMenu } from '../header.js';
import { CardNewProduct } from '../cardNewProduct.js';
import { Notification } from '../notificacion.js';
import { Producto } from '../producto.js';


export class EditProductPage {
    constructor(productId) {
        document.body.innerHTML = ''; 

        this.productId = productId;
        this.createHeader();
        this.createMain();
        this.createPage();
    }

    createHeader() {
        const header = new Header('Editar Producto', iconoVolver, iconoMenu, null, function(){ navigateToMenu('stock'); });
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
        this.loadProductData();
    }
    
    async loadProductData() {
        //para usar con la bbdd de LIO:
        /*
        try {
            const response = await fetch(`http://localhost:3000/api/productos/${this.productId}`);
            if (response.ok) {
                const productData = await response.json();
                this.fillProductData(productData);
            } else {
                new Notification('../../../img/emojis/pare.png', 'No se pudo cargar el producto.', 'error');
            }
        } catch (error) {
            new Notification('../../../img/emojis/pare.png', 'Error al cargar el producto.', 'error');
        }
            */

        // Versión con LStorage
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
        const productData = productosGuardados.find(product => product.id == this.productId);
        if (productData) {
            this.fillProductData(productData);
        } else {
            new Notification('../../../img/emojis/pare.png', 'No se pudo cargar el producto.', 'error');
        }
    }


    // Cargo los datos del prod.
    fillProductData(productData) {
        const producto = Producto.fromJSON(productData);
    
        document.querySelector('.productInput').value = producto.nombre;
        document.querySelector('.proveedorSelect').value = producto.proveedor;
        document.getElementById('costo').value = producto.costo;
        document.getElementById('porcentaje').value = producto.porcentaje;
        document.querySelector('.stock-check input').value = producto.stockMinimo;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('active').checked = producto.activo;
        this.cardNewProduct.calculaPrecioVenta(); 
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



    async guardarCambiosProducto(datosProducto) {
        //----------------> Versión para guardar en la BBDD (ver con LIO):
        /*
        try {
            const response = await fetch(`http://localhost:5500/api/productos/${this.productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosProducto)
            });

            if (response.ok) {
                return true;
            } else {
                new Notification('../../../img/emojis/pare.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
                return false;
            }
        } catch (error) {
            new Notification('../../../img/emojis/pare.png', 'Error inesperado al actualizar el producto', 'error');
            return false;
        }
*/

        try {
            const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
            const index = productosGuardados.findIndex(product => product.id == this.productId);
            if (index !== -1) {
                productosGuardados[index] = { id: this.productId, ...datosProducto };
                localStorage.setItem('productos', JSON.stringify(productosGuardados));
                return true;
            } else {
                new Notification('../../../img/emojis/triste.png', '¡Ups! Producto no encontrado.', 'error');
                return false;
            }
        } catch (error) {
            new Notification('../../../img/emojis/triste.png', '¡Ups! Hubo un fallo. Por favor, intenta de nuevo.', 'error');
            return false;
        }


    }

    btnSecondaryCallback(event) {
        console.log('Click en btn cancelar');
        window.location.href = '/ruta-a-la-pagina-anterior(buscador-de-productos-a-editar)';
    }

    createPage() {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
    }
}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
    new EditProductPage(productId);
} else {
    new Notification('../../../img/emojis/asombro.png', 'ID de producto no encontrado.', 'error');
    // window.location.href = '/ruta-a-la-pagina-de-productos';
}

new EditProductPage();