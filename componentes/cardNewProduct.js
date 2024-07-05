// export class FormularioProducto {
//     constructor(containerId) {
//         this.container = document.getElementById(containerId);
//         this.init();
//     }

//     init() {
//         this.form = this.createForm();
//         this.container.appendChild(this.form);
//         this.costoInput = this.form.querySelector('.costoInput');
//         this.porcentajeInput = this.form.querySelector('.porcentajeInput');
//         this.precioVentaDiv = this.form.querySelector('.precio-venta');

//         this.costoInput.addEventListener('input', this.calcularPrecioVenta.bind(this));
//         this.porcentajeInput.addEventListener('input', this.calcularPrecioVenta.bind(this));

//         this.form.querySelector('.guardar').addEventListener('click', this.guardarProducto.bind(this));
//         this.form.querySelector('.cancelar').addEventListener('click', this.cancelarFormulario.bind(this));
//     }

//     createForm() {
//         const form = document.createElement('div');
//         form.className = 'nuevo-producto-form';

//         form.appendChild(this.createInputGroup('text', 'Ingresa el nuevo producto', 'productInput'));
//         form.appendChild(this.createProveedorSelect());
//         form.appendChild(this.createCostoPorcentajeGroup());
//         form.appendChild(this.createPrecioVentaDiv());
//         form.appendChild(this.createPedidoOptional());
//         form.appendChild(this.createButtonContainer());

//         return form;
//     }

//     createInputGroup(type, placeholder, className) {
//         const inputGroup = document.createElement('div');
//         inputGroup.className = 'input-group';

//         const input = document.createElement('input');
//         input.type = type;
//         input.placeholder = placeholder;
//         input.className = className;

//         inputGroup.appendChild(input);
//         return inputGroup;
//     }

//     createProveedorSelect() {
//         const inputGroup = document.createElement('div');
//         inputGroup.className = 'input-group';

//         const select = document.createElement('select');
//         select.className = 'proveedorSelect';
//         const option = document.createElement('option');
//         option.textContent = 'Selecciona el proveedor';
//         select.appendChild(option);

//         inputGroup.appendChild(select);
//         return inputGroup;
//     }

//     createCostoPorcentajeGroup() {
//         const container = document.createElement('div');
//         container.className = 'costo-porcentaje';

//         const costoGroup = this.createInputGroup('number', '', 'costoInput');
//         const costoLabel = document.createElement('label');
//         costoLabel.setAttribute('for', 'costo');
//         costoLabel.textContent = 'Costo';
//         costoGroup.insertBefore(costoLabel, costoGroup.firstChild);
//         costoGroup.querySelector('input').id = 'costo';

//         const porcentajeGroup = this.createInputGroup('number', '', 'porcentajeInput');
//         const porcentajeLabel = document.createElement('label');
//         porcentajeLabel.setAttribute('for', 'porcentaje');
//         porcentajeLabel.textContent = '%';
//         porcentajeGroup.insertBefore(porcentajeLabel, porcentajeGroup.firstChild);
//         porcentajeGroup.querySelector('input').id = 'porcentaje';

//         container.appendChild(costoGroup);
//         container.appendChild(porcentajeGroup);
//         return container;
//     }

//     createPrecioVentaDiv() {
//         const div = document.createElement('div');
//         div.className = 'precio-venta';
//         div.textContent = 'Precio de venta: $0';
//         return div;
//     }

//     createPedidoOptional() {
//         const container = document.createElement('div');
//         container.className = 'pedido-optional';

//         const title = document.createElement('h4');
//         title.textContent = 'Agrega al próximo pedido (Opcional)';
//         container.appendChild(title);

//         const stockCheck = document.createElement('div');
//         stockCheck.className = 'stock-check';
//         const stockText = document.createElement('p');
//         stockText.textContent = 'Cuando en el Stock haya menos de:';
//         const stockInput = document.createElement('input');
//         stockInput.type = 'number';
//         stockInput.placeholder = 'Cantidad';

//         stockCheck.appendChild(stockText);
//         stockCheck.appendChild(stockInput);
//         container.appendChild(stockCheck);

//         return container;
//     }

//     createButtonContainer() {
//         const container = document.createElement('div');
//         container.className = 'button-container';

//         const cancelarButton = document.createElement('button');
//         cancelarButton.className = 'cancelar';
//         cancelarButton.textContent = 'Cancelar';

//         const guardarButton = document.createElement('button');
//         guardarButton.className = 'guardar';
//         guardarButton.textContent = 'Guardar';

//         container.appendChild(cancelarButton);
//         container.appendChild(guardarButton);

//         return container;
//     }

//     calcularPrecioVenta() {
//         const costo = parseFloat(this.costoInput.value) || 0;
//         const porcentaje = parseFloat(this.porcentajeInput.value) || 0;
//         const precioVenta = costo + (costo * (porcentaje / 100));
//         this.precioVentaDiv.textContent = `Precio de venta: $${precioVenta.toFixed(2)}`;
//     }

//     guardarProducto() {
//         alert('Producto guardado con éxito');
//     }

//     cancelarFormulario() {
//         this.form.reset();
//         this.precioVentaDiv.textContent = 'Precio de venta: $0';
//     }
// }

// document.addEventListener('DOMContentLoaded', function() {
//     new FormularioProducto('form-container');
// });

export class CardNewProduct {
    constructor() {
        this.element = this.createForm();
    }

    createForm() {
    
        this.cargarCss();

        const form = document.createElement('div');
        form.className = 'nuevo-producto-form';

        form.appendChild(this.createProductInput());
        form.appendChild(this.createProveedorSelect());
        form.appendChild(this.createCostoPorcentaje());
        form.appendChild(this.createPrecioVenta());
        form.appendChild(this.createPedidoOptional());
        form.appendChild(this.createButtonContainer());

        return form;
    }

    createProductInput() {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'productInput';
        input.placeholder = 'Ingresa el nuevo producto';

        inputGroup.appendChild(input);
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
        });

        inputGroup.appendChild(select);
        return inputGroup;
    }

    createCostoPorcentaje() {
        const costoPorcentaje = document.createElement('div');
        costoPorcentaje.className = 'costo-porcentaje';

        costoPorcentaje.appendChild(this.createInputGroup('costo', 'Costo'));
        costoPorcentaje.appendChild(this.createInputGroup('porcentaje', '%'));

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
        precioVenta.textContent = `Precio de venta: ${this._precioVta}`;
        return precioVenta;
    }

    createPedidoOptional() {
        const pedidoOptional = document.createElement('div');
        pedidoOptional.className = 'pedido-optional';

        const h4 = document.createElement('h4');
        h4.textContent = 'Agrega al próximo pedido (Opcional)';

        const stockCheck = document.createElement('div');
        stockCheck.className = 'stock-check';

        const p = document.createElement('p');
        p.textContent = 'Cuando en stock haya menos de:';

        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = '1';

        stockCheck.appendChild(p);
        stockCheck.appendChild(input);

        pedidoOptional.appendChild(h4);
        pedidoOptional.appendChild(stockCheck);

        return pedidoOptional;
    }

    createButtonContainer() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const cancelarBtn = document.createElement('button');
        cancelarBtn.className = 'cancelar';
        cancelarBtn.textContent = 'Cancelar';

        const guardarBtn = document.createElement('button');
        guardarBtn.className = 'guardar';
        guardarBtn.textContent = 'Guardar';

        buttonContainer.appendChild(cancelarBtn);
        buttonContainer.appendChild(guardarBtn);

        return buttonContainer;
    }
    cargarCss(){
        const link = document.createElement('link');
        link.rel='stylesheet';
        link.href = './cardNewProd.css';
        document.head.appendChild(link);
    }
}