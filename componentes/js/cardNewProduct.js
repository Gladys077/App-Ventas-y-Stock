import { ButtonContainer } from './btnsContainer.js';
import { Notification } from './notificacion.js';
import { Producto } from './producto.js';

export class CardNewProduct {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        this._btnPrimary = btnPrimary;
        this._btnSecondary = btnSecondary;
        this._btnPrimaryCallback = btnPrimaryCallback;
        this._btnSecondaryCallback = btnSecondaryCallback;
        this._element = this.createForm();
        this._producto = new Producto('', '', 0, 0, 0);
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

    createForm() {
        // this.cargarCss();

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
                window.location.href = '../../views/pages/nuevoproveedor.js';
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
        h4.textContent = 'Agregar al próximo pedido cuando el stock sea menor a:';

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

