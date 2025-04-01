import { Notification } from '../js/notificacion.js';
import { verificarCss } from '../js/utils.js';
import { navigateToPage } from '../js/navigateToPage.js';

export class CardVtasPorProducto {
    constructor(title, textBtn, onClick, includeUnidadesVendidas = true, cuadroInferiorTitulo = "Unidades vendidas", linkText = "Listado por fecha", page = 'MenuVentas') {
        this._title = title;
        this._textBtn = textBtn;
        this._onClick = onClick;
        this._includeUnidadesVendidas = includeUnidadesVendidas;
        this._cuadroInferiorTitulo = cuadroInferiorTitulo;
        this._linkText = linkText;
        this._page = page;
        this._isBuscarMode = true; // Para rastrear el modo del botón
        this._fechaDesde = null;
        this._fechaHasta = null;
        this.element = this.armarCardVtasPorProducto();
        this.addInputListeners(); // Para añadir listeners a los inputs
        if (!verificarCss('cuadroInferior')) this.agregarCss();

        // Event listener para limpiar el título cuando se recarga o se sale de la página
        window.addEventListener('beforeunload', () => this.resetTitle());


    }

    get title() { 
        return this._title; 
    }
    set title(title) {
        this._title = title;
    }
    get textBtn() { 
        return this._textBtn; 
    }
    set textBtn(textBtn) { 
        this._textBtn = textBtn; 
    }
    get includeUnidadesVendidas(){
        return this._includeUnidadesVendidas;
    }
    get cuadroInferiorTitulo(){
        return this._cuadroInferiorTitulo;
    }
    set cuadroInferiorTitulo(cuadroInferiorTitulo){
        this._cuadroInferiorTitulo = cuadroInferiorTitulo;
    }
    get isBuscarMode() {
        return this._isBuscarMode;
    }
    get fechaDesde() {
        return this._fechaDesde;
    }
    set fechaDesde(value) {
        this._fechaDesde = value;
    }
    get fechaHasta() {
        return this._fechaHasta;
    }
    set fechaHasta(value) {
        this._fechaHasta = value;
    }
    get linkText() {
        return this._linkText;
    }
    set linkText(value) {
        this._linkText = value;
    }
    get page() {
        return this._linkHref;
    }
    set page(value) {
        this._page = value;
    }

    agregarCss(){
        const style = document.createElement('style');
        style.textContent = `
        
        .card {
            background-color: var(--background-color);
            border-radius: 12px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            margin: 8px auto 10px;
            width: calc(100% - 32px);
            max-width: 400px;
            text-align: center;
            padding-bottom: 24px;
            
            .card-title {
                background-color: var(--color-primario);
                min-height: 48px;
                height: auto;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-size: 16px;
                font-weight: 500;
                letter-spacing: 0.5px;
                line-height: 1.4;
                padding: 4px;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                margin-bottom: 16px;
                color: var(--text-claro);
            }

            .card-input {
                font-family: Roboto, sans-serif;
                border: 1px solid var(--color-secundario);
                border-radius: 50px;
                font-size: 18px;
                margin-bottom: 12px;
                padding: 8px;
                height: 48px;
                width: 80%;
                max-width: 250px;
                text-align: center;
            }

            .card-button {
                height: 48px;
                width: 80%;
                max-width: 250px;
                background-color: var(--color-primario);
                border: none;
                border-radius: 50px;
                color: var(--text-claro);
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                padding: 8px 16px;
                margin-top: 8px;

                &:hover {
                    background-color: var(--color-hover);
                }

                &:active {
                    transform: scale(90%);
                }
            }

            .card-link {
                color: var(--color-primario);
                font-size: 16px;
                font-weight: 500;
                text-align: center;
                display: block;
                margin-top: 24px;
                margin-bottom: 8px;

                &:hover {
                    color: var(--color-hover);
                }

                &:active {
                    transform: scale(90%);
                }
            }

            .cuadroInferior {
                width: 200px;
                padding: 8px;
                border-radius: 4px;
                margin: auto;

                .headerCuadroInferior {
                    background-color: var(--color-hover);
                    color: #fff;
                    padding: 4px;
                    border-radius: 4px 4px 0 0;
                    margin-top: 16px;
                    font-size: 14px;
                }

                .boxCuadroInferior {
                    display: block;
                    border-radius: 0 0 4px 4px;
                    font-size: 16px;
                    font-weight: 500;
                    color: var(--color-primario);
                    margin: auto;
                    border: 1px solid var(--color-hover);
                    height: 48px;
                    background-color: white;
                    line-height: 48px;
                }
            }
        }
      }
      }

        `
        document.head.appendChild(style);
    }

 // Método para restablecer el título de la card
 resetTitle() {
    const cardTitle = this.element.querySelector('.card-title');
    if (cardTitle) {
        cardTitle.textContent = this._title; // Restablece al título original
        
        // También podríamos guardarlo en sessionStorage o localStorage para recuperarlo después
        // localStorage.setItem('cardTitle', this._title);
    }
}
    armarCardVtasPorProducto() {
        this.element = document.createElement('div');
        this.element.className = 'card';

        const productoElegido = document.createElement('h2');
        productoElegido.textContent = this._title;
        productoElegido.className = 'card-title';

        this.desdeInput = this.createDateInput('DESDE');
        this.hastaInput = this.createDateInput('HASTA');

        this.button = document.createElement('button');
        this.button.textContent = this._textBtn;
        this.button.className = 'card-button';
        this.button.addEventListener('click', () => this.handleClick());

        const verListado = document.createElement('a');
        verListado.textContent = this._linkText;
        verListado.className = 'card-link';
        verListado.addEventListener('click', (e) => {
            e.preventDefault(); // Previene la navegación por defecto
            navigateToPage(this._page);
        });

        this.element.appendChild(productoElegido);
        this.element.appendChild(this.desdeInput);
        this.element.appendChild(this.hastaInput);
        this.element.appendChild(this.button);
        this.element.appendChild(verListado);

        return this.element;
    }

    createDateInput(label) {
        const containerDate = document.createElement('div');
        const desdeHasta = document.createElement('h4');
        desdeHasta.textContent = label;
        desdeHasta.className = 'desdeHasta';
        const input = document.createElement('input');
        input.placeholder = 'DD/MM/AAAA';
        input.className = 'card-input';
        input.type = "date";
        input.maxLength = 10;

        // Agrego la clase para identificar fácilmente el input
        if (label === 'DESDE') {
            input.classList.add('desde');
        } else if (label === 'HASTA') {
            input.classList.add('hasta');
        }

        input.addEventListener('blur', (e) => this.handleInputChange(e, label));
        containerDate.appendChild(desdeHasta);
        containerDate.appendChild(input);
        return containerDate;
    }


    handleClick() {
        console.log("Iniciando handleClick");

        // Verificar si estamos en modo buscar o en modo borrar
        if (!this._isBuscarMode) {
            this.resetToBuscarMode();
            this.limpiarInputs();
            return;
        }
        
        // Comprobar si se ha seleccionado un producto específico
        const productoElegido = this.element.querySelector(".card-title")?.textContent.trim();
        
        // Si no hay producto o es el título predeterminado
        if (!productoElegido || productoElegido === "" || 
            productoElegido === "Nombre_del_producto" || 
            productoElegido === "Nombre del producto") {
            console.log("Mostrando notificación de producto faltante");
            new Notification('../img/emojis/señalar.png', '¡Le faltó elegir un producto!', 'error');
            return;
        }
    
        // Obtener los elementos de input
        const desdeInput = this.element.querySelector('.desde');
        const hastaInput = this.element.querySelector('.hasta');
        
        // Obtener los valores de las fechas
        this._fechaDesde = desdeInput ? desdeInput.value : null;
        this._fechaHasta = hastaInput ? hastaInput.value : null;
        
        console.log("Fecha DESDE:", this._fechaDesde);
        console.log("Fecha HASTA:", this._fechaHasta);
    
        // Verificar si se ingresó la fecha desde
        if (!this._fechaDesde || this._fechaDesde === "") {
            console.log("Mostrando notificación de fecha desde faltante");
            new Notification('../img/emojis/señalar.png', '¡Le faltó ingresar la fecha DESDE!', 'error');
            return;
        }
        
        // Verificar si las fechas son válidas cuando ambas están presentes
        if (this._fechaDesde && this._fechaHasta && this._fechaHasta < this._fechaDesde) {
            new Notification('../img/emojis/pare.png', 'La fecha HASTA no puede ser anterior<br> a la fecha DESDE.', 'error');
            return;
        }
    
        // Realizar búsqueda
        this.realizarBusqueda();
    
        // Verificar si hay resultados
        if (!this.ventasFiltradas || this.ventasFiltradas.length === 0) {
            new Notification('../img/emojis/triste.png', 'No hubo ventas en esas fechas para el producto elegido.', 'success');
            return;
        }
    
        // Cambiar a modo resultados
        this._includeUnidadesVendidas = true;
        this.button.textContent = 'Borrar';
        this._isBuscarMode = false;
        this.mostrarUnidadesVendidas();
    }
    

    addInputListeners() {
        const inputs = [
            this.desdeInput.querySelector('input'),
            this.hastaInput.querySelector('input')
        ];
        inputs.forEach(input => {
            input.addEventListener('input', (e) => this.handleInputChange(e));
        });
    }

    handleInputChange(e) {
        if (!e || !e.target) return;
        const value = e.target.value;
        
        if (e.target.classList.contains('desde')) {
            this._fechaDesde = value || null;
        } else if (e.target.classList.contains('hasta')) {
            this._fechaHasta = value || null;
        } 
    }

    mostrarUnidadesVendidas() {
        if (!this.element.querySelector('.cuadroInferior')) {
            const cuadroInferior = document.createElement('div');
            cuadroInferior.className = 'cuadroInferior';

            const headerCuadroInferior = document.createElement('div');
            headerCuadroInferior.textContent = this._cuadroInferiorTitulo;
            headerCuadroInferior.className = 'headerCuadroInferior';

            const boxCuadroInferior = document.createElement('span');
            boxCuadroInferior.className = 'boxCuadroInferior';
            boxCuadroInferior.textContent = this.calcularUnidadesVendidas(); 

            cuadroInferior.appendChild(headerCuadroInferior);
            cuadroInferior.appendChild(boxCuadroInferior);

            this.element.insertBefore(cuadroInferior, this.element.lastElementChild);
        }
    }

    ocultarUnidadesVendidas() {
        const cuadroInferior = this.element.querySelector('.cuadroInferior');
        if (cuadroInferior) {
            cuadroInferior.remove();
        }
    }

    resetToBuscarMode() {
        this._isBuscarMode = true;
        this.button.textContent = 'Buscar';
        this.ocultarUnidadesVendidas();
        this._fechaDesde = null;
        this._fechaHasta = null;
    }

    limpiarInputs() {
        const inputs = this.element.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }

    realizarBusqueda() {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        let ventasFiltradas = [];
        
        // Obtener el producto elegido del título
        const productoElegido = this.element.querySelector(".card-title")?.textContent.trim() || "";
    
        productos.forEach(producto => {
            // Solo procesar el producto elegido
            if (producto.nombre === productoElegido && producto.ventas) {
                producto.ventas.forEach(venta => {
                    const fechaVenta = new Date(venta.fecha);
                    // Convertir fechas de formato YYYY-MM-DD a Date objects
                    const fechaDesde = this._fechaDesde ? new Date(this._fechaDesde) : null;
                    const fechaHasta = this._fechaHasta ? new Date(this._fechaHasta) : null;
    
                    if ((!fechaDesde || fechaVenta >= fechaDesde) && (!fechaHasta || fechaVenta <= fechaHasta)) {
                        ventasFiltradas.push({
                            producto: producto.nombre,
                            fecha: venta.fecha,
                            cantidad: venta.cantidad
                        });
                    }
                });
            }
        });

        this.ventasFiltradas = ventasFiltradas; // Guardo las ventas filtradas para usarlas 
        console.log('Ventas filtradas:', ventasFiltradas);
        console.log("Fecha Desde:", this._fechaDesde, "Fecha Hasta:", this._fechaHasta);
    }

    calcularUnidadesVendidas() {
        if (!this.ventasFiltradas || this.ventasFiltradas.length === 0) return 0;
    
        let totalUnidadesVendidas = 0;
    
        this.ventasFiltradas.forEach(venta => {
            totalUnidadesVendidas += venta.cantidad;
        });
    
        console.log('Total de unidades vendidas:', totalUnidadesVendidas);
        return totalUnidadesVendidas;
    }

    mostrarListadoPorFecha() {
        navigateToPage('VentaxProducto-Listado');
    // Limpio cualquier listado anterior
    const listadoPrevio = this.element.querySelector('.listado-por-fecha');
    if (listadoPrevio) {
        listadoPrevio.remove();
    }


        const listadoContainer = document.createElement('div');
        listadoContainer.className = 'listado-por-fecha';
        
        resultados.forEach(resultado => {
            const item = document.createElement('div');
            item.className = 'listado-item';
            itemVenta.textContent = `Producto: ${venta.producto}, Fecha: ${venta.fecha}, Cantidad: ${venta.cantidad}`;
            listadoContainer.appendChild(item);
        });

        this.element.appendChild(listadoContainer);

          // Inserta el listado antes del enlace "Listado por fecha"
        // this.element.insertBefore(listado, this.element.querySelector('.card-link'));
    }

    obtenerResultadosPorFecha() {
        // Esta función debería devolver los resultados de ventas por fecha basándose en la búsqueda.
        // Ejemplo de datos:
        return [
            { fecha: '01/01/2023', unidades: 10 },
            { fecha: '02/01/2023', unidades: 15 },
            { fecha: '03/01/2023', unidades: 20 }
        ];
        
    }


    getElement() {
        return this.element;
    }
}

//  Ejemplos de instancias:
// const card1 = new CardVtasPorProducto('Ventas Producto A', 'Buscar', () => { /* callback */ }, true, 'Unidades vendidas', 'Listado por fecha', 'ventasPorFecha.html');
// const card2 = new CardVtasPorProducto('Ventas Producto B', 'Buscar', () => { /* callback */ }, true, 'Unidades vendidas', 'Otra vista', 'otraVista.html');