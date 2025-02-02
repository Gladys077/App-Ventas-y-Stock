import { Header } from "../../js/header.js";
import Main from "../../js/main.js";
import { iconoVolver, iconoLupaN, iconoDescargar } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { createSearchContainer, RadioProductList, verificarCss } from '../../js/utils.js';
import { TablaEncabezado, MostrarMainNav, TablaDetalles, TablaFooter, BtnFlotante } from "../../js/registros.js";
import { ModalInput } from "../../js/modalInput.js";
import { Notification } from "../../js/notificacion.js";
import { conexionAPI } from "../../js/services/conectionFakeApi.js"

export class PlanillaStock {
    constructor() {
        document.body.innerHTML = '';
        if(!verificarCss('search-results-eliminar')) this.agregarCss();
        
        this.selectedProducts = [];
        this.createHeader();
        this.mainPedido = this.createMain();
        this.createMostrarMainNav();
        this.createTablaEncabezado();
        this.createTablaDetalles();
        this.createLineaArticulo();
        this.mostrarLineasArticulos();
        this.createBtnFlotante();

        // Limpia productos seleccionados al salir o actualizar la página
        window.addEventListener('beforeunload', () => {
            localStorage.removeItem('selectedProduct');
        });
    }

    agregarCss() {
        const style = document.createElement('style');
        style.textContent = `
            
            .ul-product-list {
                width: calc(100vw - 32px);
                max-width: 380px;
                padding: 0;
                margin-top: 16px;
                list-style-type: none;
                text-align: left;
                height: calc(100vh - 10px));
                overflow-y: auto;
                background-color: #fff;

                .li-product-list {
                    border-bottom: 1px solid var(--color-secundario);
                    padding: 8px 0;
                    padding-left: 16px;
                    word-wrap: break-word;
                    overflow-wrap: break-word;

                    &:first-child {
                        border-top: 1px solid var(--color-secundario);
                    }
                }


	    `
        document.head.appendChild(style);
    }

    createHeader() {
        this.header = new Header("Stock", iconoVolver, iconoLupaN, 
            () => navigateToPage('MenuStock'), 
            () => this.openProductSearch()
        ); 
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        this.main = new Main();
        document.body.appendChild(this.main.getElement());
        return;
    }

    createMostrarMainNav() {
        const mainPedido = document.querySelector("main");
        this.mainNav = new MostrarMainNav(
            "Stock", "Bajo stock", "Sin movimiento", 
            true, false, false, null,
            () => navigateToPage('StockBajo'),
            () => navigateToPage('StockSinMvto')
        );
        mainPedido.appendChild(this.mainNav.getElement());
        return
    }

    createTablaEncabezado() {
        const mainPedido = document.querySelector("main");
        this.encabezado = new TablaEncabezado("Producto", "Cant.");
        mainPedido.appendChild(this.encabezado.getElement());
        return
    }

    createTablaDetalles() {
        const mainPedido = document.querySelector("main");
        this.detalles = new TablaDetalles();
        mainPedido.appendChild(this.detalles.getElement());
        return
    }

    createLineaArticulo= (cant,nombre)=>{
        
        const lineaArt = document.createElement("div");
        lineaArt.className = "tabla_lineaArticulo";

            const prod = document.createElement("div");
            prod.className="producto";
            prod.textContent= `${nombre}`;
            // console.log(nombre);

            const unidades = document.createElement("div");
            unidades.className = "cantHist";
            unidades.textContent=`${cant}`;
    
        lineaArt.append(prod,unidades)
        
        return lineaArt
        
    }//Se crea la linea de articulo para hacer el foreach en "MostrarLineasArticulos"

    mostrarLineasArticulos = async ()=>{

        const tablaDetalles = document.querySelector(".tabla_detalles");
        const articulos = await conexionAPI.stockDisponible();
        console.log(articulos);

        if(articulos.length===0){
            const mensaje = document.createElement("span");
            mensaje.classList="no_hay_productos";
            mensaje.innerText="no existen articulos en el pedido";
            main.appendChild(mensaje);
        }

        articulos.forEach(articulo=>{
            tablaDetalles.append(this.createLineaArticulo(articulo.cant,articulo.producto))
            console.log("nombre " + articulo.producto);
        })

    }//Acá se debe conectar a la bd y hacemos el foreach para cada articulo

    createBtnFlotante() {
        const mainPedido = document.querySelector("main");
        this.btn = new BtnFlotante(iconoDescargar, "contenedor-btn-flotante", () => alert("descarga exitosa"));
        mainPedido.appendChild(this.btn.getElement());
    }

    openProductSearch() {
        // Crea overlay para cubrir el main
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0'; 
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.zIndex = '900';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.paddingTop = '52px';

        // Crea contenedor de búsqueda
        // const productSearch = createSearchContainer(
        //     this.handleProductSelection.bind(this), 
        //     ProductList, 
        //     'calc(100vh - 240px)'
        // );
        const productSearch = createSearchContainer(this.onProductClick.bind(this), RadioProductList, 'calc(100vh - 280px)', '¡Ese producto no existe en tu stock!');
        
        productSearch.style.zIndex = '1001';

        // Btn para cerrar el overlay
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕';
        closeButton.style.position = 'absolute';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.left = 'calc(50% + 250px)';  
        closeButton.style.transform = 'translateX(-50%)';
        closeButton.style.top = '20px';
        closeButton.style.right = '20px';
        closeButton.style.fontSize = '24px';
        closeButton.style.color = '#fff';
        closeButton.style.background = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '902';

        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        overlay.appendChild(closeButton);
        overlay.appendChild(productSearch);
        document.body.appendChild(overlay);
    }

    // Maneja la selección de un producto en la lista
onProductClick(producto, event) {
    if (event.target.closest('.product-radio')) {
        this.updateStockList(producto);
    }
}

updateStockList(selectedProduct) {
    const tablaDetalles = document.querySelector(".tabla_detalles"); 
    if (!tablaDetalles) {
        console.error("No se encontró el contenedor de detalles de la tabla.");
        return;
    }

    // Evitar duplicados: verificar si el producto ya está en la tabla
    const existeProducto = [...tablaDetalles.children].some(linea => 
        linea.querySelector(".producto")?.textContent === selectedProduct.nombre
    );
    if (existeProducto) return;

    // Crear y agregar la línea del producto
    const lineaArticulo = this.createLineaArticulo(selectedProduct.cantidad, selectedProduct.nombre);
    tablaDetalles.appendChild(lineaArticulo);
}

}

new PlanillaStock();
