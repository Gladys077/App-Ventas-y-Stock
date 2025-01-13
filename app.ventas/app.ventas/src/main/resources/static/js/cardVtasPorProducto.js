import { Notification } from '../js/notificacion.js';
import { isValidDate, formatDateInput, verificarCss } from '../js/utils.js';
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
            margin: 0px auto;
            width: calc(100% - 32px);
            max-width: 400px;
            text-align: center;
            padding-bottom: 24px;
            
            .card-title {
                background-color: var(--primary-color);
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
                border: 1px solid var(--secondary-color);
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
                background-color: var(--primary-color);
                border: none;
                border-radius: 50px;
                color: var(--text-claro);
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                padding: 8px 16px;

                &:hover {
                    background-color: var(--color-hover);
                }

                &:active {
                    transform: scale(90%);
                }
            }

            .card-link {
                color: var(--primary-color);
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
                    color: var(--primary-color);
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
    armarCardVtasPorProducto() {
        this.element = document.createElement('div');
        this.element.className = 'card';

        const titleElement = document.createElement('h2');
        titleElement.textContent = this._title;
        titleElement.className = 'card-title';

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

        this.element.appendChild(titleElement);
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
        input.maxLength = 10;
        input.addEventListener('input', formatDateInput);
        input.addEventListener('blur', (e) => this.handleDateChange(e, label));
        containerDate.appendChild(desdeHasta);
        containerDate.appendChild(input);
        return containerDate;
    }

    handleDateChange(e, label) {
        const value = e.target.value;
        if (value && !isValidDate(value)) {
            e.target.value = '';
            return;
        }
        if (label === 'DESDE') {
            this._fechaDesde = value || null;
        } else {
            this._fechaHasta = value || null;
        }
    }

    handleClick() {
        if (this._isBuscarMode) {
            if (!this._fechaDesde && !this._fechaHasta) {
                new Notification('../../img/emojis/señalar.png', '¡Elige alguna fecha!', 'success');
                return;
            }
            this.realizarBusqueda();
            this._includeUnidadesVendidas = true;
            this.button.textContent = 'Borrar';
            this._isBuscarMode = false;
            this.mostrarUnidadesVendidas();
        } else {
            this.resetToBuscarMode();
            this.limpiarInputs();
        }
        // this._onClick(); // Llamada al callback original
    }

    addInputListeners() {
        const inputs = [
            this.desdeInput.querySelector('input'),
            this.hastaInput.querySelector('input')
        ];
        inputs.forEach(input => {
            input.addEventListener('input', () => this.handleInputChange());
        });
    }

    handleInputChange(e, label) {
        const value = e.target.value;
        if (value && !isValidDate(value)) {
            e.target.value = '';
            return;
        }
        if (label === 'DESDE') {
            this._fechaDesde = value || null;
        } else {
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
    
        productos.forEach(producto => {
            if (producto.ventas) {
                producto.ventas.forEach(venta => {
                    const fechaVenta = new Date(venta.fecha);
                    const fechaDesde = this._fechaDesde ? new Date(this._fechaDesde.split('/').reverse().join('-')) : null;
                    const fechaHasta = this._fechaHasta ? new Date(this._fechaHasta.split('/').reverse().join('-')) : null;
    
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
    
        this.calcularUnidadesVendidas();
    }
    

    calcularUnidadesVendidas() {
        if (!this.ventasFiltradas) return;
    
        let totalUnidadesVendidas = 0;
    
        this.ventasFiltradas.forEach(venta => {
            totalUnidadesVendidas += venta.cantidad;
        });
    
        console.log('Total de unidades vendidas:', totalUnidadesVendidas);
    
        // Actualizo el contenido del cuadro inferior
        const boxCuadroInferior = this.element.querySelector('.boxCuadroInferior');
        if (boxCuadroInferior) {
            boxCuadroInferior.textContent = totalUnidadesVendidas;
        }
    }
    

    mostrarListadoPorFecha() {
        navigateToPage('ListaXFecha_vtaProd');
    // Limpio cualquier listado anterior
    const listadoPrevio = this.element.querySelector('.listado-por-fecha');
    if (listadoPrevio) {
        listadoPrevio.remove();
    }

    // const resultados = this.resultadosBusqueda || [];
    // if (resultados.length === 0) {
    //     console.log('No hay resultados para mostrar.');
    //     return;
    // }
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