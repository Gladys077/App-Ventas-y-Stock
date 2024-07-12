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
    // set isBuscarMode(value){
    //     this._isBuscarMode = value;
    // }
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
        this.cargarCss();
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
            //Aquí va el cód. que muestra la página con el listado
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

    // formatDateInput(e) {
    //     let input = e.target;
    //     let value = input.value.replace(/\D/g, '');
    //     if (value.length > 8) value = value.slice(0, 8);
    //     let formattedValue = '';
        
    //     if (value.length > 0) {
    //         let day = value.slice(0, 2);
    //         if (parseInt(day) > 31) day = '31';
    //         formattedValue += day;
    //     }
    //     if (value.length > 2) {
    //         let month = value.slice(2, 4);
    //         if (parseInt(month) > 12) month = '12';
    //         formattedValue += '/' + month;
    //     }
    //     if (value.length > 4) {
    //         formattedValue += '/' + value.slice(4, 8);
    //     }
        
    //     input.value = formattedValue;
    // }

    handleDateChange(e, label) {
        const value = e.target.value;
        if (value && !isValidDate(value)) {
            // new Notification('../img/emojis/mueca.png', 'Fecha inválida. Use el formato DD/MM/AAAA', 'error');
            e.target.value = '';
            return;
        }
        if (label === 'DESDE') {
            this._fechaDesde = value || null;
        } else {
            this._fechaHasta = value || null;
        }
    }

    isValidDate(dateString) {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(dateString)) return false;
        const [, day, month, year] = dateString.match(regex);
        const date = new Date(year, month - 1, day);
        return date.getFullYear() == year && (date.getMonth() + 1) == parseInt(month) && date.getDate() == parseInt(day);
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

    // Añade listeners a los inputs
    addInputListeners() {
        const inputs = [
            this.desdeInput.querySelector('input'),
            this.hastaInput.querySelector('input')
        ];
        inputs.forEach(input => {
            input.addEventListener('input', () => this.handleInputChange());
        });
    }
    // Para manejar cambios en los inputs
    handleInputChange(e, label) {
        const value = e.target.value;
        if (value && !isValidDate(value)) {
            new Notification('../img/emojis/mueca.png', 'Fecha inválida. Use el formato DD/MM/AAAA', 'error');
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

    // Nuevo método para resetear al modo "Buscar"
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
        // Aquí iría la lógica para buscar en la base de datos
        console.log('Realizando búsqueda:');
        console.log('Fecha desde:', this._fechaDesde);
        console.log('Fecha hasta:', this._fechaHasta);
        // Implementa la lógica de búsqueda según si hay una o dos fechas
        if (this._fechaDesde && this._fechaHasta) {
            console.log('Búsqueda por período');
            // Lógica para buscar en un período
        } else if (this._fechaDesde) {
            console.log('Búsqueda para la fecha:', this._fechaDesde);
            // Lógica para buscar en una fecha específica (desde)
        } else if (this._fechaHasta) {
            console.log('Búsqueda para la fecha:', this._fechaHasta);
            // Lógica para buscar en una fecha específica (hasta)
        }
    }
    cargarCss() {
        const estilos = document.querySelector('.dia') ?? null;
        if(estilos == null){
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './css/cardBase.css';
        document.head.appendChild(link);
        }
    }

    getElement() {
        return this.element;
    }
}

function onClick() {
    console.log('btn clickeado');
    realizarBusqueda()
}