// import { Header } from '../../js/header.js';
// import { CardVtasPorProducto } from '../../js/cardVtasPorProducto.js';
// import { Footer } from '../../js/footer.js';
// import { FabButton, createSearchContainer, RadioProductList } from '../../js/utils.js';
// import { iconoDescargar, iconoVolver, iconoMenu } from '../../js/iconosSVG.js';
// import { navigateToPage } from '../../js/navigateToPage.js';

// export class ProductosVendidos {
//     constructor() {
//         document.body.innerHTML = '';
//         this.ventasPorProducto = null;
//         this.createHeader();
//         this.createMain();
//         this.createFooter();    
//         this.agregarCss();
//     }

//     agregarCss() {
//       const style = document.createElement("style");
//       style.textContent = ` 
//           fondo-results{
//                position: fixed;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 background-color: rgba(255, 255, 255, 0.9);
//                 z-index: 1000;
//                 display: none;
//             }
//             .search-wrapper {
//                 width: calc(100vw - 32px);
//                 max-width: 400px;
//             }
//             .search-results {
//               width: calc(100vw - 32px);
//               max-width: 400px;
//               height: 100hv;
//               background-color: pink;
//               }
  
//           .ul-product-list {
//               margin-top: 16px;
//               list-style-type: none;
//               text-align: left;
//               overflow-y: auto; 
//               overflow-x: hidden;
//               background-color: #fff;
//           }
  
//           .li-product-list {
//               border-bottom: 1px solid var(--secondary-color);
//               padding: 8px 0;
//               padding-left: 16px;
//               word-wrap: break-word;
//               overflow-wrap: break-word;
//           }
  
//           .li-product-list:first-child{
//               border-top: 1px solid var(--secondary-color);
//           }
//       }
  
//       `;
//     }

//     createHeader() {
//         this.header = new Header('Unidades vendidas', iconoVolver, iconoMenu, ()=>{ navigateToPage('BuscadorVentasPorProducto')}, ()=>{ navigateToPage('MenuVentas')});
//         document.body.appendChild(this.header.getElement());
//     }

//     createMain() {
//         const main = document.createElement("main");

//         const productSearch = createSearchContainer(
//           this.onProductClick.bind(this),
//           RadioProductList,
//           "calc(100vh - 200px)"
//         );
//         main.appendChild(productSearch);
    
//         // Container para la lista de productos
//         this.resultContainer = document.createElement("div");
//         this.resultContainer.classList.add("search-results");
//         main.appendChild(this.resultContainer);
    
//         document.body.appendChild(main);




//         const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
//         const selectedProductName = selectedProduct ? selectedProduct.nombre : 'Nombre_del_producto';
//         this.ventasPorProducto = new CardVtasPorProducto(selectedProductName, 'Buscar', true, () => this.onClick(), 'Unidades Vendidas', 'Ver la lista por fecha', 'Config');
//         document.body.appendChild(this.ventasPorProducto.getElement());
//     }

//     onClick() {
//         // Aquí se maneja la lógica de los botones Buscar y Borrar
//         if (this.ventasPorProducto.isBuscarMode) {
//             // Aquí iría la lógica para realizar la búsqueda
//         } else {
//             this.ventasPorProducto.resetToBuscarMode();
//             this.ventasPorProducto.limpiarInputs();
//         }
//     }
//     onProductClick(producto, event) {
//         if (event.target.closest(".product-radio")) {
//           localStorage.setItem("selectedProduct", JSON.stringify(producto));
//           navigateToPage("ProductosVendidos");
//         }
//       }
    
//       updateProductList(searchWord) {
//         this.resultContainer.innerHTML = "";
//         const productList = new RadioProductList(
//           searchWord,
//           this.onProductClick.bind(this)
//         );
//         const productListElement = productList.render();
    
//         if (productListElement.children.length === 0) {
//           new Notification(
//             "../../../img/emojis/asombro.png",
//             "¡No hay producto en stock!",
//             "error"
//           );
//         }
    
//         this.resultContainer.appendChild(productListElement);
//       }

//     createFooter() {
//         const fabButton = new FabButton(iconoDescargar, 'Descargar', () => {
//             console.log('Descargar informe');
//         });
//         this.footer = new Footer();
//         this.footer.getElement().appendChild(fabButton.getElement());
//         document.body.appendChild(this.footer.getElement());
//     }
// }

//     new ProductosVendidos();


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

import { Header } from '../../js/header.js';
import { CardVtasPorProducto } from '../../js/cardVtasPorProducto.js';
import { Footer } from '../../js/footer.js';
import { FabButton, createSearchContainerCard, RadioProductList } from '../../js/utils.js';
import { iconoDescargar, iconoVolver, iconoMenu } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';

export class ProductosVendidos {
    constructor() {
        document.body.innerHTML = '';
        this.ventasPorProducto = null;
        this.createHeader();
        this.createMain();
        this.createFooter();    
        this.agregarCss();
    }

    agregarCss() {
        const style = document.createElement("style");
        style.textContent = ` 
            .fondo-results {
                position: fixed;
                top: 155px;
                left: 50%;
                transform: translate(-50%,0);
                width: calc(100vw - 32px);
                max-width: 400px;
                margin: 0 auto;
                height: 100%;
                background-color: rgba(255, 255, 255, 1);
                z-index: 1000;
                display: none;
            }
            .search-wrapper {
                width: calc(100vw - 32px);
                max-width: 400px;
            }
            .search-results {
                width: calc(100vw - 32px);
                max-width: 400px;
                // max-height: calc(100vh - 200px);
                height: 100vh;
                overflow-y: auto;
                background-color: #fff;
                position: absolute;
                top: 0px;
                left: 50%;
                transform: translate(-50%, 0);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .ul-product-list {
                margin-top: 16px;
                list-style-type: none;
                text-align: left;
                background-color: #fff;
            }
            .li-product-list {
                border-bottom: 1px solid var(--secondary-color);
                padding: 8px 0;
                padding-left: 16px;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }
            .li-product-list:first-child {
                border-top: 1px solid var(--secondary-color);
            }
        `;
        document.head.appendChild(style);
    }

    createHeader() {
        this.header = new Header('Unidades vendidas', iconoVolver, iconoMenu, () => { navigateToPage('BuscadorVentasPorProducto') }, () => { navigateToPage('MenuVentas') });
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement("main");

        const productSearch = createSearchContainerCard(
            this.handleSearch.bind(this),
            RadioProductList,
            "calc(100vh - 200px)"
        );
        main.appendChild(productSearch);

        this.fondoResults = document.createElement("div");
        this.fondoResults.classList.add("fondo-results");

        this.resultContainer = document.createElement("div");
        this.resultContainer.classList.add("search-results");
        this.fondoResults.appendChild(this.resultContainer);

        main.appendChild(this.fondoResults);

        document.body.appendChild(main);

        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        const selectedProductName = selectedProduct ? selectedProduct.nombre : 'Nombre_del_producto';
        this.ventasPorProducto = new CardVtasPorProducto(selectedProductName, 'Buscar', true, () => this.onClick(), 'Unidades Vendidas', 'Ver la lista por fecha', 'Config');
        document.body.appendChild(this.ventasPorProducto.getElement());
    }

    handleSearch(searchWord) {
        console.log("Searching for:", searchWord);  // Debugging line
        this.updateProductList(searchWord);
    }

    onClick() {
        if (this.ventasPorProducto.isBuscarMode) {
            // Lógica para realizar la búsqueda
        } else {
            this.ventasPorProducto.resetToBuscarMode();
            this.ventasPorProducto.limpiarInputs();
        }
    }

    onProductClick(producto, event) {
        if (event.target.closest(".product-radio")) {
            localStorage.setItem("selectedProduct", JSON.stringify(producto));
            this.updateCardTitle(producto.nombre);
            this.hideFondoResults();
        }
    }

    updateCardTitle(productName) {
        this.ventasPorProducto.title = productName;
        const titleElement = this.ventasPorProducto.getElement().querySelector('.card-title');
        if (titleElement) {
            titleElement.textContent = productName;
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
        } else {
            this.resultContainer.appendChild(productListElement);
            this.showFondoResults();
        }
    }

    showFondoResults() {
        this.fondoResults.style.display = 'block';
    }

    hideFondoResults() {
        this.fondoResults.style.display = 'none';
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