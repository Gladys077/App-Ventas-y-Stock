// ProductList.js
export class ProductList {
    constructor() {
        this.element = document.createElement('ul');
        this.element.className = 'product-list';
    }

    updateList(products) {
        this.element.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = product.name;
            li.addEventListener('click', () => this.onSelectCallback(product));
            this.element.appendChild(li);
        });
    }

    onProductSelect(callback) {
        this.onSelectCallback = callback;
    }

    getElement() {
        return this.element;
    }
}

// QuantityModal.js
export class QuantityModal {
    constructor() {
        this.element = this.createModal();
    }

    createModal() {
        // Crear el modal con input para cantidad y botones OK y Cancelar
    }

    show(product, callback) {
        // Mostrar el modal y manejar la selección de cantidad
    }
}

// OrderManager.js
export class OrderManager {
    constructor() {
        this.currentOrder = [];
    }

    addProduct(product, quantity) {
        this.currentOrder.push({ ...product, quantity });
        // Aquí podrías guardar en localStorage o enviar a un servidor
    }

    getCurrentOrder() {
        return this.currentOrder;
    }
}