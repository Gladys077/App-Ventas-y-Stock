export class CardVtasPorProducto {
    constructor(title, textBtn, onClick, includeUnidadesVendidas = true, cuadroInferiorTitulo = "Unidades vendidas") {
        this._title = title;
        this._textBtn = textBtn;
        this._onClick = onClick;
        this._includeUnidadesVendidas = includeUnidadesVendidas;
        this._cuadroInferiorTitulo = cuadroInferiorTitulo;
        this._element = null;

        this.cargarCss();
        this.armarCardVtasPorProducto();
    }

    cargarCss(){
        const link = document.createElement('link');
        link.rel='stylesheet';
        link.href = './cardBase.css';
        document.head.appendChild(link);
    }

    armarCardVtasPorProducto() {

        this._element = document.createElement('div');
        this._element.className = 'card';

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
        button.addEventListener('click', this._onClick);

        const verListado = document.createElement('a');
        verListado.textContent = "Listado por fecha";
        verListado.href = "#";
        verListado.className = 'card-link';
        verListado.addEventListener('click', () => {
            // Aquí va el código que muestra el listado
            console.log('Mostrar listado');
        });

        this._element.appendChild(titleElement);
        this._element.appendChild(desdeInput);
        this._element.appendChild(hastaInput);
        this._element.appendChild(button);

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

            this._element.appendChild(cuadroInferior);
        }

        this._element.appendChild(verListado);

        return this._element;
    }

}



function onClick() {
    console.log('btn clickeado');
}
const mainElement = document.querySelector('main');


//---------------------------VENTAS POR PRODUCTOS---------------------------
//----------------------CON cuadro 'unidades vendidas'
const miCardConUnidadesVendidas = new CardVtasPorProducto('nombre_del_producto', 'Buscar', onClick, true);
mainElement.appendChild(miCardConUnidadesVendidas.armarCardVtasPorProducto());

// -------------------SIN cuadro de 'unidades vendidas'
// const miCardSinUnidadesVendidas = new CardVtasPorProducto('nombre_del_producto', 'Buscar', onClick, false);
// mainElement.appendChild(miCardSinUnidadesVendidas.armarCardVtasPorProducto());


//---------------------------  CARD VENTAS por FECHA - Importe facturado  ---------------------------
// const miCardVentasPorFecha = new CardVtasPorProducto('', 'Buscar', onClick, true, 'Importe facturado')
// mainElement.appendChild(miCardVentasPorFecha.armarCardVtasPorProducto());