import { ButtonContainer } from './btnsContainer.js';
import { navigateToPage } from './navigateToPage.js';
import { Notification } from './notificacion.js';
import { Producto } from './producto.js';
import { verificarCss } from './utils.js';

export class CardNewProduct {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        this._btnPrimary = btnPrimary;
        this._btnSecondary = btnSecondary;
        this._btnPrimaryCallback = btnPrimaryCallback;
        this._btnSecondaryCallback = btnSecondaryCallback;
        this._element = this.createForm();
        this._producto = new Producto('', '', 0, 0, 0);
        this.agregarCss();
    }
    get btnPrimary(){ 
        return this._btnPrimary; 
    }
    set btnPrimary(value){
        this._btnPrimary = value;
    }

    get btnSecondary(){
        return this._btnSecondary;
    }
    set btnSecondary(value){
        this._btnSecondary = value;
    }

    get btnPrimaryCallback(){
        return this._btnPrimaryCallback;
    }
    set btnPrimaryCallback(value){
        this._btnPrimaryCallback = value;
    }

    get btnSecondaryCallback(){
        return this._btnSecondaryCallback;
    }
    set btnSecondaryCallback(value){
        this._btnSecondaryCallback = value;
    }
    
    getElement() {
        return this._element;
    }

    agregarCss(){
        const style = document.createElement('style');
        style.textContent = `
        
        .nuevo-producto-form {
            font-family: 'Roboto', sans-serif;
            border-radius: 4px 4px 12px 12px;
            width: 400px;
            max-width: calc(100% - 32px);
            margin: 16px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--background-color);
            padding: 10px;

        .input-group {
            width: 100%;
            margin-bottom: 16px;

            label {
                display: block;
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 4px;
                color: var(--text-color);
            }

            .productInput, .proveedorSelect, .costoInput, .porcentajeInput {
                width: 100%;
                height: 48px;
                padding: 0 12px;
                border: 1.5px solid var(--secondary-color);
                border-radius: 4px;
                font-size: 16px;
                transition: border-color 0.3s;

                &.interiorInput {
                    text-align: center;
                }
            }

            .proveedorSelect {
                appearance: none;
                background-image: url('data:image/svg+xml;utf8,<svg fill="%236810AD" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
                background-repeat: no-repeat;
                background-position: right 12px center;
                min-width: 100%;
            }

            input[type="number"] {
                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }
        }

        .costo-porcentaje {
            display: flex;
            gap: 8px;

            .input-group {
                flex: 1;
                color: black;
                font-size: 16px;
                font-weight: 500;
                text-align: center;
            }
        }

        .precio-venta {
            border-radius: 4px;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            width: 70%;
            letter-spacing: .25px;

            label {
                display: block;
                margin: auto;
                margin-bottom: 4px;
                color: var(--primary-color);
            }

            .precio-venta-display {
                width: 100%;
                height: 48px;
                padding: 8px;
                background-color: none;
                border: 2px solid var(--secondary-color);
                border-radius: 4px;
                font-size: 18px;
                font-weight: 500;
                color: var(--primary-color);
                text-align: center;
                align-content: center;
            }
        }

        .divider {
            background-color: rgba(0, 0, 0, 0.15);
            height: 1px;
            width: 100%;
            margin: 16px 0;
            border: none;
        }

        .pedido-optional {
            background-color: var(--fondo-monto);
            border-radius: 4px;
            padding: 8px 12px;
            width: 90%;
            text-align: center;

            h4 {
                margin-bottom: 8px;
                color: var(--text-color);
                font-size: 16px;
                font-weight: 500;
                letter-spacing: 0.25px;
                text-align: left;
                padding: 8px;
            }

            .stock-check {
                padding: 0 12px 12px;
                justify-content: center;

                input {
                    width: 150px;
                    height: 48px;
                    padding: 0 12px;
                    border: 1px solid var(--secondary-color);
                    border-radius: 4px;
                    font-size: 16px;
                    text-align: center;
                }
            }
        }
    }
        .card {
            // background-color: var(--background-color);
            // border-radius: 12px;
            // border-top-left-radius: 4px;
            // border-top-right-radius: 4px;
            // box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            // margin: 0px auto;
            width: 100%;
            // text-align: center;
            // padding-bottom: 24px;

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
                margin-bottom: 8px;
                color: var(--text-claro);
            }

	`
        document.head.appendChild(style);
    }

    createForm() {
        const form = document.createElement('form');
        form.className = 'nuevo-producto-form';

        form.appendChild(this.createProductInput());
        form.appendChild(this.createProveedorSelect());
        form.appendChild(this.createCostoPorcentaje());
        form.appendChild(this.createPrecioVenta());
        form.appendChild(this.createDivider());
        form.appendChild(this.createPedidoOptional());
        form.appendChild(this.createButtonContainer()); 

        return form;
    }

    createProductInput() {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const productInput = document.createElement('input');
        productInput.type = 'text';
        productInput.className = 'productInput';
        productInput.placeholder = 'Escriba el nombre del producto';

        productInput.addEventListener('input', (e)=>{
            this._producto.nombre = e.target.value;
        })

        inputGroup.appendChild(productInput);
        return inputGroup;
    }

    createProveedorSelect() {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const select = document.createElement('select');
        select.className = 'proveedorSelect';

        const options = ['Selecciona el proveedor', 'Nuevo proveedor', 'Sin datos'];
        options.forEach(optionText => {
            const option = document.createElement('option');
            option.textContent = optionText;
            option.className = 'option';
            select.appendChild(option);
        });

        select.addEventListener('change', (e)=> {
            this._producto.proveedor = e.target.value;

            const selectedOption = select.options[select.selectedIndex];
            selectedOption.classList.add('selected-option');

            // Redirige a otra página si el proveedor es "Nuevo proveedor"
            if (selectedOption.textContent === 'Nuevo proveedor') {
                ()=>navigateToPage('../../componentes/pages/SeccionStock/formnuevoproveedor.js');
                
            }
        });

        inputGroup.appendChild(select);
        return inputGroup;
    }

    createCostoPorcentaje() {
        const costoPorcentaje = document.createElement('div');
        costoPorcentaje.className = 'costo-porcentaje';

        const costoGroup = this.createInputGroup('costo', 'Costo');
        const porcentajeGroup = this.createInputGroup('porcentaje', '%');

        // Calcula el precio de venta
        const costoInput = costoGroup.querySelector('input');
        const porcentajeInput = porcentajeGroup.querySelector('input');

        costoInput.classList.add('interiorInput');
        porcentajeInput.classList.add('interiorInput');

        costoInput.addEventListener('input', (e) => {
            this._producto.costo = parseFloat(e.target.value) || 0;
            this.mostrarPrecioVenta();
        });

        porcentajeInput.addEventListener('input', (e) => {
            this._producto.porcentaje = parseFloat(e.target.value) || 0;
            this.mostrarPrecioVenta();
        });

        costoPorcentaje.appendChild(costoGroup);
        costoPorcentaje.appendChild(porcentajeGroup);

        return costoPorcentaje;
    }

    createInputGroup(id, labelText) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const label = document.createElement('label');
        label.for = id;
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = 'number';
        input.id = id;
        input.className = `${id}Input`;

        inputGroup.appendChild(label);
        inputGroup.appendChild(input);

        return inputGroup;
    }

    createPrecioVenta() {
        const precioVenta = document.createElement('div');
        precioVenta.className = 'precio-venta';

        const label = document.createElement('label');
        label.textContent = 'Precio de venta';

        this.precioVentaDisplay = document.createElement('div');
        this.precioVentaDisplay.className = 'precio-venta-display';
        this.precioVentaDisplay.textContent = '$ 0';

        precioVenta.appendChild(label);
        precioVenta.appendChild(this.precioVentaDisplay);

        return precioVenta;
    }

    createDivider() {
        const divider = document.createElement('div');
        divider.className = 'divider';
        return divider;
    }

    mostrarPrecioVenta() {
        const precioVenta = this._producto.costo * (1 + this._producto.porcentaje / 100);
        this.precioVentaDisplay.textContent = `$${precioVenta.toFixed(2)}`;
    }

    createPedidoOptional() {
        const pedidoOptional = document.createElement('div');
        pedidoOptional.className = 'pedido-optional';

        const h4 = document.createElement('h4');
        h4.textContent = '*Opcional: Agregar al próximo pedido cuando el stock sea menor a:';

        const stockCheck = document.createElement('div');
        stockCheck.className = 'stock-check';

        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Cantidad';

        input.addEventListener('input', (e) => {
            this._producto.stockMinimo = parseInt(e.target.value, 10) || 0; //10 es la base decimal para la función parseInt
        });

        stockCheck.appendChild(input);

        pedidoOptional.appendChild(h4);
        pedidoOptional.appendChild(stockCheck);

        return pedidoOptional;
    }

    createButtonContainer() {
        const btnsContainer = new ButtonContainer(this.btnPrimary, this.btnSecondary, this.btnPrimaryCallback, this.btnSecondaryCallback);
        return btnsContainer.getButtonContainer();
    }

    resetForm() {
        document.querySelector('.productInput').value = '';
        document.querySelector('.proveedorSelect').selectedIndex = 0;
        document.getElementById('costo').value = '';
        document.getElementById('porcentaje').value = '';
        this.precioVentaDisplay.textContent = '$ 0';
        document.querySelector('.stock-check input').value = '';
        this._producto = new Producto('', '', 0, 0, 0); // Debería resetear el producto? 

    }

    validarCampos() {
        const producto = this._producto;
    
        if (!producto.nombre.trim() || 
        producto.proveedor === 'Selecciona el proveedor' || 
        producto.costo <= 0 ||
        producto.porcentaje < 0) {
            
            new Notification('../../img/emojis/pare.png', '¡Espera! Te falta completar algún dato.', 'error');
            return false;
        }
    
        return true;
    }

    obtenerDatosProducto() { 
        const producto = document.querySelector('.productInput').value;
        const proveedor = document.querySelector('.proveedorSelect').value;
        const costo = parseFloat(document.querySelector('.costoInput').value);
        const porcentaje = parseFloat(document.querySelector('.porcentajeInput').value);
        const stockMinimo = parseInt(document.querySelector('.stock-check input').value, 10) || 0;
    
        return {
            nombre: producto,
            proveedor: proveedor,
            costo: costo,
            porcentaje: porcentaje,
            stockMinimo: stockMinimo
        };
    }
}

