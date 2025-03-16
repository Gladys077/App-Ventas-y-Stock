import { CardNewProduct } from './cardNewProduct.js';

export class CardEditProduct extends CardNewProduct {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        super(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback);

        const style = document.createElement("style");
        style.textContent = ` 
            .card-edit-product { // quita los margin del cardNewProduct
                margin-top: -18px;
                margin-bottom: 0; 
            }
        `;
        document.head.appendChild(style);
    }

    createProductInput() {
        const inputGroup = document.createElement('div');
        inputGroup.classList = 'input-group';

        const productName = document.createElement('input');
        productName.type = "text";
        productName.value = this._title;
        productName.classList = 'productInput card-title tit';

        productName.addEventListener('input', (e) => {
            this._producto.nombre = e.target.value;
        });

        inputGroup.appendChild(productName);
        return inputGroup;
    }

    updateCardTitle(productName) {
        this.cardEditProduct.title = productName;

        const titleElement = this.cardEditProduct.getElement().querySelector('.card-title');
        if (titleElement) {
            titleElement.value = productName || ''; 
        }
    }

    onProductClick(product) {
        // Actualizar el producto seleccionado
        this._producto.nombre = product.nombre;
        this._producto.proveedor = product.proveedor;
        this._producto.costo = product.costo;
        this._producto.porcentaje = product.porcentaje;
        this._producto.stockMinimo = product.stockMinimo;
        this._producto.cantidadProximoPedido = product.cantidadProximoPedido || null;

        // Actualizar los campos del formulario
        this.updateFormFields();

        // Actualizar el título de la card
        this.updateCardTitle(product.nombre);
    }

    updateFormFields() {
        const productName = this._element.querySelector('.search-input2');
        const proveedorSelect = this._element.querySelector('.proveedorSelect');
        const costoInput = this._element.querySelector('.costoInput');
        const porcentajeInput = this._element.querySelector('.porcentajeInput');
        const stockMinimoInput = this._element.querySelector('.stock-check input');
        const pedidoOptionalInput = this._element.querySelector('.pedido-optional input'); 

        productName.value = this._producto.nombre;
        proveedorSelect.value = this._producto.proveedor;
        costoInput.value = this._producto.costo;
        porcentajeInput.value = this._producto.porcentaje;
        stockMinimoInput.value = this._producto.stockMinimo;
        pedidoOptionalInput.value = this._producto.cantidadProximoPedido || '';

        this.mostrarPrecioVenta();
    }

    createForm() {
        // Llama al formulario de la clase base sin duplicar elementos
        return super.createForm();
    }
}
