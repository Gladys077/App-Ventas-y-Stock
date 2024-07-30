import { Notification } from './notificacion.js';
import { isValidDate, formatDateInput } from './utils.js';


export class CardVtasPorProducto {
    constructor(title, textBtn, onClick, includeUnidadesVendidas = true, cuadroInferiorTitulo = "Unidades vendidas") {
        this._title = title;
        this._textBtn = textBtn;
        this._onClick = onClick;
        this._includeUnidadesVendidas = includeUnidadesVendidas;
        this._cuadroInferiorTitulo = cuadroInferiorTitulo;
        this._isBuscarMode = true; // Para rastrear el modo del botón
        this._fechaDesde = null;
        this._fechaHasta = null;
        this.element = this.armarCardVtasPorProducto();
        this.addInputListeners(); // Para añadir listeners a los inputs
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
        verListado.textContent = "Listado por fecha";
        verListado.href = "#";
        verListado.className = 'card-link';
        verListado.addEventListener('click', () => {
            this.mostrarListadoPorFecha();
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
        this._onClick(); // Llamada al callback original
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
    
        // Actualizar el contenido del cuadro inferior
        const boxCuadroInferior = this.element.querySelector('.boxCuadroInferior');
        if (boxCuadroInferior) {
            boxCuadroInferior.textContent = totalUnidadesVendidas;
        }
    }
    

    mostrarListadoPorFecha() {
        console.log('Mostrar listado por fecha:');

    // Limpiamos cualquier listado anterior
    const listadoPrevio = this.element.querySelector('.listado-por-fecha');
    if (listadoPrevio) {
        listadoPrevio.remove();
    }

    const resultados = this.resultadosBusqueda || [];
    if (resultados.length === 0) {
        console.log('No hay resultados para mostrar.');
        return;
    }
        const listado = document.createElement('div');
        listado.className = 'listado-por-fecha';
        
        resultados.forEach(resultado => {
            const item = document.createElement('div');
            item.className = 'listado-item';
            item.textContent = `${resultado.fecha}: ${resultado.unidades} unidades`;
            listado.appendChild(item);
        });

          // Inserta el listado antes del enlace "Listado por fecha"
        this.element.insertBefore(listado, this.element.querySelector('.card-link'));
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
