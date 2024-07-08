export class CardVtasPorProducto {
    constructor(title, textBtn, onClick, includeUnidadesVendidas = true, cuadroInferiorTitulo = "Unidades vendidas") {
        this._title = title;
        this._textBtn = textBtn;
        this._onClick = onClick;
        this._includeUnidadesVendidas = includeUnidadesVendidas;
        this._cuadroInferiorTitulo = cuadroInferiorTitulo;
        this._isBuscarMode = true; // Nuevo: para rastrear el modo del botón
        this.element = this.armarCardVtasPorProducto();
        this.cargarCss();
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
        containerDate.appendChild(desdeHasta);
        containerDate.appendChild(input);
        return containerDate;
    }

    handleClick() {
        if (this._isBuscarMode) {
            this._includeUnidadesVendidas = true;
            this.button.textContent = 'Limpiar';
            this._isBuscarMode = false;
            this.mostrarUnidadesVendidas();
        } else {
            this._includeUnidadesVendidas = false;
            this.button.textContent = 'Buscar';
            this._isBuscarMode = true;
            this.limpiarInputs();
            this.ocultarUnidadesVendidas();
        }
        this._onClick(); // Llamada al callback original
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

    limpiarInputs() {
        const inputs = this.element.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }

    cargarCss() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './css/cardBase.css';
        document.head.appendChild(link);
    }

    getElement() {
        return this.element;
    }
}

function onClick() {
    console.log('btn clickeado');
}