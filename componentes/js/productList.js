import { iconoComprar } from "./iconosSVG.js";

export class ProductList {
    constructor(searchWord, onProductClick) {
        this.searchWord = searchWord;
        this.onProductClick = onProductClick;
        this.products = this.getProductsFromStorage();
    }

    getProductsFromStorage() {
        try {
            const storedProducts = localStorage.getItem('productos');
            return storedProducts ? JSON.parse(storedProducts) : [];
        } catch (error) {
            console.error('Error al obtener productos del localStorage:', error);
            return [];
        }
    }

    filterAndSortProducts() {
        return this.products
            .filter(product => product.nombre.toLowerCase().includes(this.searchWord.toLowerCase()))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    filterAndSortProducts() {
        // Filtro los productos
        const filteredProducts = this.products.filter(function(product) {
            const productName = product.nombre.toLowerCase();
            const searchTerm = this.searchWord.toLowerCase();
            return productName.includes(searchTerm);
        }, this);
    
        // Orden alfabético
        const sortedProducts = filteredProducts.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre);
        });
    
        return sortedProducts;
    }

    createListItem(product) {
        const listItem = document.createElement('li');
        listItem.className = 'li-product-list';

        const productTextSpan = document.createElement('span');
        productTextSpan.textContent = product.nombre;

        const icon = document.createElement('i');
        icon.className = 'product-icon';
        icon.innerHTML = iconoComprar; 

        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';
        listItem.style.marginRight = '8px';

        listItem.appendChild(productTextSpan);
        listItem.appendChild(icon);

        listItem.addEventListener('click', (event) => {
            if (event.target.closest('.product-icon')) {
                this.onProductClick(product, event);
            }
        });

        return listItem;
    }

    render() {
        const productList = document.createElement('ul');
        productList.className = 'ul-product-list';

        const filteredProducts = this.filterAndSortProducts();
        
        filteredProducts.forEach(product => {
            const listItem = this.createListItem(product);
            productList.appendChild(listItem);
        });

        return productList;
    }
}