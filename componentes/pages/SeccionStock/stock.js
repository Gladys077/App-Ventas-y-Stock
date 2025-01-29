import { Header } from "../../js/header.js";
import Main from "../../js/main.js";
import { iconoVolver, iconoLupaN, iconoDescargar } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { createSearchContainer, ProductList } from '../../js/utils.js';
import { TablaEncabezado, MostrarMainNav, TablaDetalles,  BtnFlotante } from "../../js/registros.js";
import { conexionAPI } from "../../js/services/conectionFakeApi.js"

import { ModalInput } from "../../js/modalInput.js";
import { Notification } from "../../js/notificacion.js";

export class PlanillaStock {
    constructor() {
        document.body.innerHTML = '';
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

            const unidades = document.createElement("input");
            unidades.className = "cant";
            unidades.value=`${cant}`;
    
        


        
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
        const productSearch = createSearchContainer(
            this.handleProductSelection.bind(this), 
            ProductList, 
            'calc(100vh - 240px)'
        );
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

    handleProductSelection(producto) {
        this.openQuantityModal(producto);
    }

    openQuantityModal(producto) {
        const modal = new ModalInput("Cantidad:",
            (cantidad) => {
                const selectedProduct = {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precioVenta,
                    cantidad: parseInt(cantidad, 10)
                };

                // Guarda el producto seleccionado en el stock
                this.selectedProducts.push(selectedProduct);
                localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));

                // Actualiza la tabla de stock
                this.updateStockList(selectedProduct);

                new Notification('../../../img/emojis/like.png', 'Producto añadido al stock', 'success');
            }, '1'
        );
       
    }

    updateStockList(selectedProduct) {
        const tablaDetalles = document.querySelector(".tabla_detalles"); 
        if (tablaDetalles) {
            const lineaArticulo = this.createLineaArticulo(selectedProduct.cantidad, selectedProduct.nombre);
            tablaDetalles.appendChild(lineaArticulo);
        } else {
            console.error("No se encontró el contenedor de detalles de la tabla.");
        }
    }
    

   
}

new PlanillaStock();
