import { navigateToPage } from "./navigateToPage.js";
import { Notification } from "./notificacion.js";

// ---------- Valida fecha ---------- 
export function isValidDate(dateString) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateString)) return false;
    const [, day, month, year] = dateString.match(regex);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() == year && (date.getMonth() + 1) == parseInt(month) && date.getDate() == parseInt(day);
};

// ---------- Formato fecha ---------- 
export function formatDateInput(e) {
    let input = e.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    let formattedValue = '';
    
    if (value.length > 0) {
        let day = value.slice(0, 2);
        if (parseInt(day) > 31) day = '31';
        formattedValue += day;
    }
    if (value.length > 2) {
        let month = value.slice(2, 4);
        if (parseInt(month) > 12) month = '12';
        formattedValue += '/' + month;
    }
    if (value.length > 4) {
        formattedValue += '/' + value.slice(4, 8);
    }
    
    input.value = formattedValue;
}

// ------------------Crea Btn (Fab) para descargar-----------
export class FabButton {
    constructor(iconSVG, onClick) {
        this._iconSVG = iconSVG;
        this._onClick = onClick;
        this._element = this.createFabButton();
    }

    getElement() {
        return this._element;
    }

    createFabButton() {
        const button = document.createElement('button');
        button.className = 'fab-button';
        button.innertHTML = '';

        button.addEventListener('click', () => this.handleButtonClick());
        button.insertAdjacentHTML('beforeend', this._iconSVG);
        return button;
    }

    handleButtonClick() {
        if (typeof this._onClick === 'function') {
            this._onClick();
        }
    }
    }

/*
-------> Ejemplos:
-------> Para crear una instancia de FabButton
const downloadButton = new FabButton(iconoDescargar, handleDownloadClick);

------->  Para añadir el botón al footer
const footerElement = document.querySelector('footer');
footerElement.appendChild(downloadButton.getElement());
*/

// ------------- FAB EXTENDED ---------------
export class ExtendedFabButton {
    constructor(iconSVG, label, onClick) {
        this._iconSVG = iconSVG;
        this._label = label;
        this._onClick = onClick;
        this._element = this.createExtendedFabButton();
    }

    getElement() {
        return this._element;
    }

    createExtendedFabButton() {
        const button = document.createElement('button');
        button.className = 'fab-button-extended';

        button.innerHTML = `${this._iconSVG} <span class="fab-label">${this._label}</span>`;
        
        button.addEventListener('click', () => this.handleButtonClick());
        return button;
    }

    handleButtonClick() {
        
        if (typeof this._onClick === 'function') {
            this._onClick();
        }
    }
    
}


// ------------- Búsqueda de productos (pageProductSearch.js) -----------------
export function createSearchContainer(onProductClick, ProductListClass = ProductList) {
    const container = document.createElement('div');
    container.className = 'search-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe el nombre del producto';
    input.className = 'search-input';

    const button = document.createElement('button');
    button.textContent = 'Buscar';
    button.className = 'search-button';

    const resultContainer = document.createElement('div');
    resultContainer.className = 'search-results';

    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(resultContainer);

    button.addEventListener('click', () => {
        const searchWord = input.value;
        const productListInstance = new ProductListClass(searchWord, onProductClick);
        const productListElement = productListInstance.render();

        resultContainer.innerHTML = '';
        if (productListElement.children.length === 0) {
            new Notification('../../img/emojis/triste.png', '¡No hay en stock!', 'error');
        } else {
            resultContainer.appendChild(productListElement);
        }
    });

  

    return container;
}

// ---------------Lista de producto (VENDER) ---------------------
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



//--------------nueva Lista de productos con radio ------------
export class RadioProductList {
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
            new Notification('../img/emojis/preocupado.png', '¡Error al descargar!', 'error');
            
            return [];
        }
    }

    filterAndSortProducts() {
        return this.products
            .filter(product => product.nombre.toLowerCase().includes(this.searchWord.toLowerCase()))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    createListItem(product) {
        const listItem = document.createElement('li');
        listItem.className = 'li-product-list';

        const productTextSpan = document.createElement('span');
        productTextSpan.textContent = product.nombre;

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'product-radio';
        radioButton.name = 'product-selection';

        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';
        listItem.style.marginRight = '8px';

        listItem.appendChild(productTextSpan);
        listItem.appendChild(radioButton);

        listItem.addEventListener('click', (event) => {
            if (event.target.closest('.product-radio')) {
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


// -------------- Menú principal --------(ventas, stock, perfiles)
export function createMenuPrincipal() {
    const menuPrincipal = document.createElement('div');
    menuPrincipal.classList.add('main-menu');

    const ventasButton = document.createElement('button');
    ventasButton.classList.add('tab', 'left-btn');
    ventasButton.textContent = 'Ventas';
    ventasButton.addEventListener('click', () => handleMenuClick(ventasButton, 'MenuVentas'));

    const stockButton = document.createElement('button');
    stockButton.classList.add('tab', 'center-btn');
    stockButton.textContent = 'Stock';
    stockButton.addEventListener('click', () => handleMenuClick(stockButton, 'MenuStock'));

    const perfilesButton = document.createElement('button');
    perfilesButton.classList.add('tab', 'right-btn');
    perfilesButton.textContent = 'Perfiles';
    perfilesButton.addEventListener('click', () => handleMenuClick(perfilesButton, 'MenuPerfiles'));

    menuPrincipal.appendChild(ventasButton);
    menuPrincipal.appendChild(stockButton);
    menuPrincipal.appendChild(perfilesButton);

    return menuPrincipal;
}

export function handleMenuClick(button, page) {
    const activeButton = document.querySelector('.main-menu .tab.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    button.classList.add('active');
    navigateToPage(page);
}











