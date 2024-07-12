import { ButtonContainer } from '../js/btnsContainer.js';
import { Notification } from './notificacion.js';

export class CardNewProduct {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        this._btnPrimary = btnPrimary;
        this._btnSecondary = btnSecondary;
        this._btnPrimaryCallback = btnPrimaryCallback;
        this._btnSecondaryCallback = btnSecondaryCallback;
        this._element = this.createForm();
    }
    get btnPrimary(){ 
        return this._btnPrimary; 
    }
    get btnSecondary(){
        return this._btnSecondary;
    }
    get btnPrimaryCallback(){
        return this._btnPrimaryCallback;
    }
    get btnSecondaryCallback(){
        return this._btnSecondaryCallback;
    }

    set btnPrimary(value){
        this._btnPrimary = value;
    }
    set btnSecondary(value){
        this._btnSecondary = value;
    }
    set btnPrimaryCallback(value){
        this._btnPrimaryCallback = value;
    }
    set btnSecondaryCallback(value){
        this._btnSecondaryCallback = value;
    }

    getElement() {
        return this._element;
    }

    createForm() {
        this.cargarCss();

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
        productInput.placeholder = 'Ingresa el nuevo producto';

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

        select.addEventListener('change', function() {
            select.querySelectorAll('option').forEach(option => {
                option.classList.remove('selected-option');
            });
            const selectedOption = select.options[select.selectedIndex];
            selectedOption.classList.add('selected-option');

            // Redirige a otra página si el proveedor es "Nuevo proveedor"
            if (selectedOption.textContent === 'Nuevo proveedor') {
                window.location.href = '/ruta-a-la-pagina-de-nuevo-proveedor';
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

        // Calcular el precio de venta
        const costoInput = costoGroup.querySelector('input');
        const porcentajeInput = porcentajeGroup.querySelector('input');
        costoInput.classList.add('interiorInput');
        porcentajeInput.classList.add('interiorInput');

        costoInput.addEventListener('input', () => this.calculaPrecioVenta());
        porcentajeInput.addEventListener('input', () => this.calculaPrecioVenta());

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

    calculaPrecioVenta() {
        const costo = parseFloat(document.getElementById('costo').value) || 0;
        const porcentaje = parseFloat(document.getElementById('porcentaje').value) || 0;
        const precioVenta = costo * (1 + porcentaje / 100);
        this.precioVentaDisplay.textContent = `$${precioVenta.toFixed(2)}`;
    }

    createPedidoOptional() {
        const pedidoOptional = document.createElement('div');
        pedidoOptional.className = 'pedido-optional';

        const h4 = document.createElement('h4');
        h4.textContent = 'Agregar al próximo pedido cuando el stock sea menor a:';

        const stockCheck = document.createElement('div');
        stockCheck.className = 'stock-check';

        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Cantidad';

        stockCheck.appendChild(input);

        pedidoOptional.appendChild(h4);
        pedidoOptional.appendChild(stockCheck);

        return pedidoOptional;
    }

    createButtonContainer() {
        const btnsContainer = new ButtonContainer(this.btnPrimary, this.btnSecondary, this.btnPrimaryCallback, this.btnSecondaryCallback);
        return btnsContainer.getButtonContainer();
    }

    cargarCss() {
        const nuevo_producto_form = document.querySelector('.nuevo-producto-form') ?? null;
        if(nuevo_producto_form == null){
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './css/cardNewProd.css';
            document.head.appendChild(link);
        }
    }

    resetForm() {
        document.querySelector('.productInput').value = '';
        document.querySelector('.proveedorSelect').selectedIndex = 0;
        document.getElementById('costo').value = '';
        document.getElementById('porcentaje').value = '';
        this.precioVentaDisplay.textContent = '$ 0';
        document.querySelector('.stock-check input').value = '';
    }

    validarCampos() {
        const product = document.querySelector('.productInput');
        const proveedor = document.querySelector('.proveedorSelect');
        const costo = document.querySelector('.costoInput');
        const porcentaje = document.querySelector('.porcentajeInput');
    
        let camposIncompletos = [];
    
        if (!product.value.trim()) camposIncompletos.push('producto');
        if (proveedor.selectedIndex === 0) camposIncompletos.push('proveedor');
        if (!costo.value || isNaN(parseFloat(costo.value)) || parseFloat(costo.value) <= 0) camposIncompletos.push('costo');
        if (!porcentaje.value || isNaN(parseFloat(porcentaje.value)) || parseFloat(porcentaje.value) < 0) camposIncompletos.push('porcentaje');
    
        if (camposIncompletos.length > 0) {
            new Notification('../../img/emojis/pare.png', '¡Espera! Falta completar datos.', 'error');
            return false;
        }
    
        return true;
    }

    obtenerDatosProducto() {
        return {
            nombre: document.querySelector('.productInput').value,
            proveedor: document.querySelector('.proveedorSelect').value,
            costo: parseFloat(document.querySelector('.costoInput').value),
            porcentaje: parseFloat(document.querySelector('.porcentajeInput').value),
            stock: parseInt(document.querySelector('.stock-check input').value, 10) || 0
        };
    }
}

