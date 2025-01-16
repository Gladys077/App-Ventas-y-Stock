import { ButtonContainer } from './btnsContainer.js';
import { navigateToPage } from './navigateToPage.js';
import { Notification } from './notificacion.js';
import { Producto } from './producto.js';
import { verificarCss } from './utils.js';
import { iconoGuardar, iconoCancelViolet } from './iconosSVG.js';

export class CardNewProduct {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        this._btnPrimary = btnPrimary;
        this._btnSecondary = btnSecondary;
        this._btnPrimaryCallback = btnPrimaryCallback;
        this._btnSecondaryCallback = btnSecondaryCallback;
        this._element = this.createForm();
        this._producto = new Producto('', '', 0, 0, 0);
        if (!verificarCss('nuevo-producto-form')) this.agregarCss();
        this._modal = null;
        this.initModal();
       
    }
    get btnPrimary(){ return this._btnPrimary;  }
    set btnPrimary(value){ this._btnPrimary = value; }

    get btnSecondary(){ return this._btnSecondary; }
    set btnSecondary(value){ this._btnSecondary = value; }

    get btnPrimaryCallback(){ return this._btnPrimaryCallback; }
    set btnPrimaryCallback(value){ this._btnPrimaryCallback = value; }

    get btnSecondaryCallback(){ return this._btnSecondaryCallback; }
    set btnSecondaryCallback(value){ this._btnSecondaryCallback = value; }
    
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
            h2.tit {
                justify-content: center;
                display: flex;
                align-items: center;
            }

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
                border: 1.5px solid var(--color-secundario);
                border-radius: 4px;
                font-size: 16px;
                transition: border-color 0.3s;
                color: black;

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
                color: var(--color-primario);
            }

            .precio-venta-display {
                width: 100%;
                height: 48px;
                padding: 8px;
                background-color: none;
                border: 2px solid var(--color-secundario);
                border-radius: 4px;
                font-size: 18px;
                font-weight: 500;
                color: var(--color-primario);
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
                    border: 1px solid var(--color-secundario);
                    border-radius: 4px;
                    font-size: 16px;
                    text-align: center;
                }
            }
        }
    }
        .pink {
            background-color: var(--color-secundario);

        }
       

            .card-title {
                min-height: 48px;
                height: auto;
                width: 100%;
                display: flex;
                align-items: center;
                justify-items: center;
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
        h2.tit {
        justify-content: center;
        display: flex;
        align-items: center;
        background: white;
        color: black;
        }
        button.guardar div svg {
        fill: white;
        filter: invert(1);
        width: 24px;
        height: 24px;
        margin-right: 8px;
        }
        button.cancelar div svg {
        width: 24px;
        height: 24px;
        margin-right: 8px;
        }
        button.cancelar:hover div svg {
        fill: white;
        filter:invert(1);
        }
    
	`
        document.head.appendChild(style);
    }

    initModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'none';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content-proveedor';
        
        const form = document.createElement('form');
        form.className = 'proveedor-form';
        
        // Inputs del proveedor
        const inputs = [
            { id: 'nombre-proveedor', label: 'Empresa Proveedora', type: 'text' },
            { id: 'nombre-vendedor', label: 'Nombre del Vendedor/a', type: 'text' },
            { id: 'celular', label: 'Teléfono / Celular', type: 'text' },
            { id: 'email', label: 'Email', type: 'text' }
        ];

        inputs.forEach(input => {
            const div = document.createElement('div');
            div.className = 'input-group';
            
            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.textContent = input.label;
            
            const inputElement = document.createElement('input');
            inputElement.type = input.type;
            inputElement.id = input.id;
            inputElement.className = 'modal-input';
            
            div.appendChild(label);
            div.appendChild(inputElement);
            form.appendChild(div);
        });

        // Textarea
        const textareaGroup = document.createElement('div');
        textareaGroup.className = 'input-group';
        
        const textareaLabel = document.createElement('label');
        textareaLabel.htmlFor = 'notas';
        textareaLabel.textContent = 'Notas';
        
        const textarea = document.createElement('textarea');
        textarea.id = 'notas';
        textarea.className = 'modal-textarea';
        
        textareaGroup.appendChild(textareaLabel);
        textareaGroup.appendChild(textarea);
        form.appendChild(textareaGroup);

        // Botones
        const buttonContainer = new ButtonContainer(
            'Guardar',
            'Cancelar',
            (e) => this.handleProveedorSubmit(e),
            (e) => {
                e.preventDefault(); // Previene cualquier comportamiento por defecto
                this.closeModal(); // Sólo cierra el modal
            },
            iconoGuardar,
            iconoCancelViolet
        );

        form.appendChild(buttonContainer.getButtonContainer());
        modalContent.appendChild(form);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        this._modal = modal;

        // Agregar estilos
        this.addModalStyles();
    }

    addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
            }

            .modal-content-proveedor {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: var(--background-color);
                margin: 16px auto;
                padding: 20px;
                border-radius: 8px;
                width: 80%;
                max-width: 400px;
                max-height: 95vh;
                overflow-y: auto;
            }

            .modal-input, .modal-textarea {
                width: 100%;
                padding: 8px;
                margin: 8px 0;
                border: 1.5px solid var(--color-secundario);
                border-radius: 4px;
            }

            .modal-textarea {
                min-height: 80px;
                resize: vertical;
                padding-bottom: 0;
                margin-bottom: 0;
            }
        `;
        document.head.appendChild(style);
    }

    createProveedorSelect() {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const select = document.createElement('select');
        select.className = 'proveedorSelect';

        const options = ['Selecciona el proveedor', 'NUEVO PROVEEDOR', 'Sin datos'];
        options.forEach(optionText => {
            const option = document.createElement('option');
            option.textContent = optionText;
            option.className = 'option';
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            this._producto.proveedor = e.target.value;

            const selectedOption = select.options[select.selectedIndex];
            selectedOption.classList.add('selected-option');

            if (selectedOption.textContent === 'NUEVO PROVEEDOR') {
                this.openModal();
            }
        });

        inputGroup.appendChild(select);
        return inputGroup;
    }

    openModal() {
        this._modal.style.display = 'block';
        document.body.classList.add('modal-open');
    }
    
    closeModal() {
        this._modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        this._modal.querySelector('form').reset();

        // Restablecer el valor del select al valor predeterminado
        const select = document.querySelector('.proveedorSelect');
        select.selectedIndex = 0; // Esto selecciona la primera opción (por defecto "Selecciona el proveedor")
        }

handleProveedorSubmit(e) {
    e.preventDefault();
    
    const nombreProveedor = document.getElementById('nombre-proveedor').value;
    if (!nombreProveedor.trim()) {
        new Notification('../img/emojis/pare.png', '¡Falta el nombre del proveedor!', 'error');
        return;
    }
    
    const formData = {
        empresa: nombreProveedor,
        vendedor: document.getElementById('nombre-vendedor').value,
        telefono: document.getElementById('celular').value,
        email: document.getElementById('email').value,
        notas: document.getElementById('notas').value
    };
    
    const select = document.querySelector('.proveedorSelect');
    const option = document.createElement('option');
    option.textContent = formData.empresa;
    option.value = formData.empresa;
    select.insertBefore(option, select.children[select.children.length - 1]);
    
    option.selected = true;
    this._producto.proveedor = formData.empresa;

    this.closeModal();
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
        inputGroup.classList = 'input-group';

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

        // Modifica los eventListeners para actualizar el precio correctamente
        costoInput.addEventListener('input', (e) => {
            const costoValue = parseFloat(e.target.value) || 0;
            this._producto.costo = costoValue;
            
            // Mostrar el costo como precio de venta inicial
            this.precioVentaDisplay.value = costoValue.toFixed(2);
            
            // Si ya hay un porcentaje, calcular el precio con el porcentaje
            if (this._producto.porcentaje > 0) {
                this.mostrarPrecioVenta();
            }
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

        this.precioVentaDisplay = document.createElement('input');
        this.precioVentaDisplay.className = 'precio-venta-display';
        this.precioVentaDisplay.type = 'number';
        this.precioVentaDisplay.step = '0.01';
        this.precioVentaDisplay.placeholder = '$ 0.00';
        
        // Agregar evento para manejar cambios directos en el precio de venta
        this.precioVentaDisplay.addEventListener('input', (e) => {
            const nuevoPrecioVenta = parseFloat(e.target.value) || 0;
            const costo = this._producto.costo || 0;
            
            if (costo > 0) {
                // Calcular el nuevo porcentaje basado en el precio de venta ingresado
                const nuevoPorcentaje = ((nuevoPrecioVenta / costo) - 1) * 100;
                
                // Actualizar el input del porcentaje
                const porcentajeInput = document.getElementById('porcentaje');
                if (porcentajeInput) {
                    porcentajeInput.value = nuevoPorcentaje.toFixed(2);
                    this._producto.porcentaje = nuevoPorcentaje;
                }
            }
        });

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
        this.precioVentaDisplay.value = precioVenta.toFixed(2); // Actualiza el valor del input correctamente
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
        const btnsContainer = new ButtonContainer(
            this.btnPrimary, 
            this.btnSecondary, 
            this.btnPrimaryCallback, 
            this.btnSecondaryCallback, 
            iconoGuardar, 
            iconoCancelViolet
        );
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
        // Obtiene los valores actuales directamente del DOM
        const nombre = document.querySelector('.productInput').value;
        const proveedor = document.querySelector('.proveedorSelect').value;
        const costo = parseFloat(document.getElementById('costo').value);
        const porcentaje = parseFloat(document.getElementById('porcentaje').value);
    
        // Limpiar los bordes rojos anteriores
        document.querySelector('.productInput').style.borderColor = 'var(--color-secundario)';
        document.querySelector('.proveedorSelect').style.borderColor = 'var(--color-secundario)';
        document.getElementById('costo').style.borderColor = 'var(--color-secundario)';
        document.getElementById('porcentaje').style.borderColor = 'var(--color-secundario)';
    
        if (!nombre.trim()) {
            new Notification('../../img/emojis/pare.png', 'Por favor, ingresa el nombre del producto.', 'error');
            return false;
        } 
        
        if (proveedor === 'Selecciona el proveedor') {
            new Notification('../../img/emojis/pare.png', 'Por favor, selecciona un proveedor.', 'error');
            return false;
        } 
        
        if (isNaN(costo) || costo <= 0) {
            new Notification('../../img/emojis/pare.png', 'Por favor, ingresa un costo válido.', 'error');
            return false;
        } 
        
        if (isNaN(porcentaje) || porcentaje < 0) {
            new Notification('../../img/emojis/pare.png', 'Por favor, ingresa un porcentaje válido.', 'error');
            return false;
        }
    
        return true; // Todos los datos son válidos
    }

    obtenerDatosProducto() { 
        return {
            nombre: document.querySelector('.productInput').value.trim(),
            proveedor: document.querySelector('.proveedorSelect').value,
            costo: parseFloat(document.getElementById('costo').value) || 0,
            porcentaje: parseFloat(document.getElementById('porcentaje').value) || 0,
            stockMinimo: parseInt(document.querySelector('.stock-check input').value, 10) || 0
        };
    }
}
