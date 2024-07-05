import {ModalDialogo} from './modalDialogo.js';
import {Notification} from './notification.js';
import {Header} from './header.js';
// import {CardVtaPorVendedor} from './vtas-por-vendedor.js';
// import {CardVtasPorProducto} from './vtas-por-producto.js';
// import {CardCantCargarStock} from "./cardCantCargaStock.js";
import {CardNewProduct} from "./cardNewProduct.js";


// Instancia del formulario 'Nuevo Producto'
const formNewProd = new CardNewProduct();

// Agrego el formulario al DOM
document.body.appendChild(formNewProd.element);