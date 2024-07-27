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
            console.log('Mostrar listado');
            // Aquí va el cód. que muestra la página con el listado
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
            boxCuadroInferior.textContent = '100'; // Ejemplo de unidades vendidas

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
        console.log('Realizando búsqueda:');
        console.log('Fecha desde:', this._fechaDesde);
        console.log('Fecha hasta:', this._fechaHasta);
        if (this._fechaDesde && this._fechaHasta) {
            console.log('Búsqueda por período');
        } else if (this._fechaDesde) {
            console.log('Búsqueda para la fecha:', this._fechaDesde);
        } else if (this._fechaHasta) {
            console.log('Búsqueda para la fecha:', this._fechaHasta);
        }
    }

    getElement() {
        return this.element;
    }
}
