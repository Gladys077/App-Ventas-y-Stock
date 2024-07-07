import { ButtonContainer } from './btnsContainer.js';

export class CardNewProduct {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        this.btnPrimary = btnPrimary;
        this.btnSecondary = btnSecondary;
        this.btnPrimaryCallback = btnPrimaryCallback;
        this.btnSecondaryCallback = btnSecondaryCallback;
        this.element = this.createForm();
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
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './cardNewProd.css';
        document.head.appendChild(link);
    }

    resetForm() {
        document.querySelector('.productInput').value = '';
        document.querySelector('.proveedorSelect').selectedIndex = 0;
        document.getElementById('costo').value = '';
        document.getElementById('porcentaje').value = '';
        this.precioVentaDisplay.textContent = '$ 0';
        document.querySelector('.stock-check input').value = '';
    }

    guardarProducto() {
        const product = document.querySelector('.productInput').value;
        const proveedor = document.querySelector('.proveedorSelect').value;
        const costo = parseFloat(document.getElementById('costo').value) || 0;
        const porcentaje = parseFloat(document.getElementById('porcentaje').value) || 0;
        const precioVenta = costo * (1 + porcentaje / 100);
        const stockMinimo = parseInt(document.querySelector('.stock-check input').value) || 0;

        const data = {
            product,
            proveedor,
            costo,
            porcentaje,
            precioVenta,
            stockMinimo
        };

        // Lógica para enviar los datos a la base de datos usando fetch (ver con LIO)
        fetch('/ruta-a-la-api-de-bbdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
          .then(data => {
              console.log('Producto guardado:', data);
          }).catch(error => {
              console.error('Error al guardar el producto:', error);
          });
    }

    getElement() {
        return this.element;
    }
}