import { Header } from "../../js/header.js";
import { iconoVolver } from "../../js/iconosSVG.js";
import { createSearchContainer, RadioProductList, verificarCss } from "../../js/utils.js";
import { navigateToPage } from "../../js/navigateToPage.js";
import { Notification } from "../../js/notificacion.js";

export class VentasPorProductoBuscador {
  constructor() {
    document.body.innerHTML = "";
    if (!verificarCss("ul-product-list")) this.agregarCss();
    this.selectedProduct = [];
    this.createHeader();
    this.createMain();
  }

  getElement() {
    return this.element;
  }

agregarCss() {
    const style = document.createElement("style");
    style.textContent = ` 
        .search-results {
            max-width: 400px;
            }

        .ul-product-list {
            margin-top: 16px;
            list-style-type: none;
            text-align: left;
            overflow-y: auto; 
            overflow-x: hidden;
            background-color: #fff;
        }

        .li-product-list {
            border-bottom: 1px solid var(--secondary-color);
            padding: 8px 0;
            padding-left: 16px;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        .li-product-list:first-child{
            border-top: 1px solid var(--secondary-color);
        }
    }

    `;
    document.head.appendChild(style);
}
  createHeader() {
    this.header = new Header(
      "Ventas por Producto",
      iconoVolver,
      null,
      () => {
        navigateToPage("MenuVentas");
      },
      () => {
        navigateToPage("");
      }
    );
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
}

document.addEventListener("DOMContentLoaded", () => {
  new VentasPorProductoBuscador(true);
});

