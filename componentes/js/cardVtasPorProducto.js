export class CardVtasPorProducto {
    constructor(title, textBtn, onClick, includeUnidadesVendidas = true, cuadroInferiorTitulo = "Unidades vendidas") {
        this._title = title;
        this._textBtn = textBtn;
        this._onClick = onClick;
        this._includeUnidadesVendidas = includeUnidadesVendidas;
        this._cuadroInferiorTitulo = cuadroInferiorTitulo;
        this.element = this.armarCardVtasPorProducto();

        this.cargarCss();
    }

    armarCardVtasPorProducto() {
        // this.cargarCss();

        this.element = document.createElement('div');
        this.element.className = 'card';

        const titleElement = document.createElement('h2');
        titleElement.textContent = this._title;
        titleElement.className = 'card-title';

        const createDateInput = (label) => {
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
        };

        const desdeInput = createDateInput('DESDE');
        const hastaInput = createDateInput('HASTA');

        const button = document.createElement('button');
        button.textContent = this._textBtn;
        button.className = 'card-button';
        button.addEventListener('click', ()=>this.handleClick());

        const verListado = document.createElement('a');
        verListado.textContent = "Listado por fecha";
        verListado.href = "#";
        verListado.className = 'card-link';
        verListado.addEventListener('click', () => {
            // Aquí va el código que muestra el listado
            console.log('Mostrar listado');
        });

        this.element.appendChild(titleElement);
        this.element.appendChild(desdeInput);
        this.element.appendChild(hastaInput);
        this.element.appendChild(button);

        if (this._includeUnidadesVendidas) {
            const cuadroInferior = document.createElement('div');
            cuadroInferior.className = 'cuadroInferior';

            const headerCuadroInferior = document.createElement('div');
            headerCuadroInferior.textContent = this._cuadroInferiorTitulo;
            headerCuadroInferior.className = 'headerCuadroInferior';

            const boxCuadroInferior = document.createElement('span');
            boxCuadroInferior.className = 'boxCuadroInferior';

            cuadroInferior.appendChild(headerCuadroInferior);
            cuadroInferior.appendChild(boxCuadroInferior);

            this.element.appendChild(cuadroInferior);
        }

        this.element.appendChild(verListado);

        return this.element;
    }
    // Este método maneja el clic y actualiza la visualización de la cant. de unid. vendidas
    handleClick() {
        this._includeUnidadesVendidas = !this._includeUnidadesVendidas;
        this._onClick(); // llamo al callback original
        this.actualizarVisualizacion(); //actualiza la visualización
        console.log('Valor de includeUnidadesVendidas', this._includeUnidadesVendidas);
    }

       // NUEVO MÉTODO: Actualiza la visualización basada en _includeUnidadesVendidas
       actualizarVisualizacion() {
        const cuadroInferior = this.element.querySelector('.cuadroInferior');
        if (this._includeUnidadesVendidas) {
            if (!cuadroInferior) {
                const nuevoCuadroInferior = document.createElement('div');
                nuevoCuadroInferior.className = 'cuadroInferior';

                const headerCuadroInferior = document.createElement('div');
                headerCuadroInferior.textContent = this._cuadroInferiorTitulo;
                headerCuadroInferior.className = 'headerCuadroInferior';

                const boxCuadroInferior = document.createElement('span');
                boxCuadroInferior.className = 'boxCuadroInferior';

                nuevoCuadroInferior.appendChild(headerCuadroInferior);
                nuevoCuadroInferior.appendChild(boxCuadroInferior);

                this.element.insertBefore(nuevoCuadroInferior, this.element.lastElementChild);
            }
        } else {
            if (cuadroInferior) {
                cuadroInferior.remove();
            }
        }
    }

    cargarCss(){
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
const mainElement = document.querySelector('main');


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