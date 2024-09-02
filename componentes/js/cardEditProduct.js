import { CardNewProduct } from './cardNewProduct.js';
import { createSearchContainerCard } from './utils.js';

export class CardEditProduct extends CardNewProduct {
    constructor(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback) {
        super(btnPrimary, btnSecondary, btnPrimaryCallback, btnSecondaryCallback);
    }

    createProductInput() {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const searchContainer = createSearchContainerCard(
            this.onProductClick.bind(this),
            undefined,
            'calc(100vh - 350px)'
        );

        inputGroup.appendChild(searchContainer);
        return inputGroup;
    }

    onProductClick(product) {
        // Actualizar el producto seleccionado
        this._producto.nombre = product.nombre;
        this._producto.proveedor = product.proveedor;
        this._producto.costo = product.costo;
        this._producto.porcentaje = product.porcentaje;
        this._producto.stockMinimo = product.stockMinimo;

        // Actualizar los campos del formulario
        this.updateFormFields();
    }

    updateFormFields() {
        const productInput = this._element.querySelector('.search-input2');
        const proveedorSelect = this._element.querySelector('.proveedorSelect');
        const costoInput = this._element.querySelector('.costoInput');
        const porcentajeInput = this._element.querySelector('.porcentajeInput');
        const stockMinimoInput = this._element.querySelector('.stock-check input');

        productInput.value = this._producto.nombre;
        proveedorSelect.value = this._producto.proveedor;
        costoInput.value = this._producto.costo;
        porcentajeInput.value = this._producto.porcentaje;
        stockMinimoInput.value = this._producto.stockMinimo;

        this.mostrarPrecioVenta();
    }

    
}
