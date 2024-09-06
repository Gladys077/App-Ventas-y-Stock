import { Header } from '../../js/header.js';
import { CardVtasPorProducto } from '../../js/cardVtasPorProducto.js';
import { Footer } from '../../js/footer.js';
import { FabButton, createSearchContainer, RadioProductList } from '../../js/utils.js';
import { iconoDescargar, iconoVolver, iconoMenu } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';

export class ProductosVendidos {
    constructor() {
        document.body.innerHTML = '';
        this.ventasPorProducto = null;
        this.createHeader();
        this.createMain();
        this.createFooter();    
    }

    

    createHeader() {
        this.header = new Header('Unidades vendidas', iconoVolver, iconoMenu, ()=>{ navigateToPage('BuscadorVentasPorProducto')}, ()=>{ navigateToPage('MenuVentas')});
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement("main");

        const productSearch = createSearchContainer(
          this.onProductClick.bind(this),
          RadioProductList,
          "calc(100vh - 200px)"
        );
        main.appendChild(productSearch);
    
        // Container para la lista de productos
        this.resultContainer = document.createElement("div");
        this.resultContainer.classList.add("search-results");
        main.appendChild(this.resultContainer);
    
        document.body.appendChild(main);




        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        const selectedProductName = selectedProduct ? selectedProduct.nombre : 'Nombre_del_producto';
        this.ventasPorProducto = new CardVtasPorProducto(selectedProductName, 'Buscar', true, () => this.onClick(), 'Unidades Vendidas', 'Ver la lista por fecha', 'Config');
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
    onProductClick(producto, event) {
        if (event.target.closest(".product-radio")) {
          localStorage.setItem("selectedProduct", JSON.stringify(producto));
          navigateToPage("VentasPorProducto");
        }
      }
    
      updateProductList(searchWord) {
        this.resultContainer.innerHTML = "";
        const productList = new RadioProductList(
          searchWord,
          this.onProductClick.bind(this)
        );
        const productListElement = productList.render();
    
        if (productListElement.children.length === 0) {
          new Notification(
            "../../../img/emojis/asombro.png",
            "¡No hay producto en stock!",
            "error"
          );
        }
    
        this.resultContainer.appendChild(productListElement);
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

    new ProductosVendidos();


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