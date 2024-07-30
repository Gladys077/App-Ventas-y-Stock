import { Header, iconoVolver, iconoMenu} from '../header.js';
import { CardVtasPorProducto } from '../cardVtasPorProducto.js';
import { Footer } from '../footer.js';
import { FabButton } from '../utils.js';
import { iconoDescargar } from '../iconosSVG.js';
import { navigateToPage } from '../navigateToPage.js';

export class VentasPorProductoPage {
    constructor() {
        this.ventasPorProducto = null;
        this.render();
    }

    render() {
        document.body.innerHTML = ''; // Limpio el contenido existente
        this.createHeader();
        this.createMain();
        this.createFooter();
    }

    createHeader() {
        this.header = new Header('Unidades vendidas', iconoVolver, iconoMenu, ()=>{ navigateToPage('BuscadorVentasPorProducto')}, ()=>{ navigateToPage('menuVentas')});
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        const selectedProductName = selectedProduct ? selectedProduct.nombre : 'Nombre_del_producto';
        this.ventasPorProducto = new CardVtasPorProducto(selectedProductName, 'Buscar', () => this.onClick(), 'Unidades Vendidas');
        document.body.appendChild(this.ventasPorProducto.getElement());
    }

    onClick() {
        // Aquí se maneja la lógica de los botones Buscar y Borrar
        if (this.ventasPorProducto.isBuscarMode) {
            // Aquí iría la lógica para realizar la búsqueda
        } else {
            this.ventasPorProducto.resetToBuscarMode();
            this.ventasPorProducto.limpiarInputs();
        }
    }

    createFooter() {
        const fabButton = new FabButton(iconoDescargar, 'Descargar', () => {
            console.log('Descargar informe');
        });
        this.footer = new Footer();
        this.footer.getElement().appendChild(fabButton.getElement());
        document.body.appendChild(this.footer.getElement());
    }
}

// Inicializa la página cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    new VentasPorProductoPage();
});


  //---------------------------VENTAS POR PRODUCTOS---------------------------
//           >>>>>>> CON cuadro 'unidades vendidas' <<<<<<
// const miCardConUnidadesVendidas = new CardVtasPorProducto('nombre_del_producto', 'Buscar', onClick, true);
// mainElement.appendChild(miCardConUnidadesVendidas.armarCardVtasPorProducto());

//           >>>>>>> SIN cuadro de 'unidades vendidas' <<<<<<<
// const miCardSinUnidadesVendidas = new CardVtasPorProducto('nombre_del_producto', 'Buscar', onClick, false);
// mainElement.appendChild(miCardSinUnidadesVendidas.armarCardVtasPorProducto());


//---------------------------  CARD VENTAS por FECHA - Importe facturado  ---------------------------
// const miCardVentasPorFecha = new CardVtasPorProducto('', 'Buscar', onClick, true, 'Importe facturado')
// mainElement.appendChild(miCardVentasPorFecha.armarCardVtasPorProducto());