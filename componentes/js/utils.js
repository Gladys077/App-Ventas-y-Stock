import { navigateToPage } from "./navigateToPage.js";
import { Notification } from "./notificacion.js";
import {iconoLupa } from '../js/iconosSVG.js';


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


// ----------Búsqueda (input y lupa en una sola linea)------------

export function createSearchContainer(onProductClick, ProductListClass = ProductList, maxHeight = 'calc(100vh - 350px)') {
    const container = document.createElement('div');
    container.className = 'search-container';

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Nombre del producto';
    input.className = 'search-input';

    const button = document.createElement('button');
    button.className = 'search-button';
    button.innerHTML = iconoLupa;
    searchWrapper.appendChild(input);
    searchWrapper.appendChild(button);

    const resultContainer = document.createElement('div');
    resultContainer.className = 'search-results-ventas';

    container.appendChild(searchWrapper);
    container.appendChild(resultContainer);

    button.addEventListener('click', performSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchWord = input.value;
        const productListInstance = new ProductListClass(searchWord, onProductClick, maxHeight);
        const productListElement = productListInstance.render();

        resultContainer.innerHTML = '';
        if (productListElement.children.length === 0) {
            new Notification('../../img/emojis/triste.png', '¡No hay en stock!', 'error');
        } else {
            resultContainer.appendChild(productListElement);
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            max-width: 400px;
            width: calc(100vw - 32px);
            height: 100px;
            margin: 40px auto 0;            
            position: sticky; 
            top: 0; 
            padding: 10px; 
        }
        .search-wrapper {
            display: flex;
            background-color: #FFFFFF;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .search-wrapper2 {
            display: flex;
            background-color: #FFFFFF;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .search-input {
            width: 100%;
            height: 48px;
            flex-grow: 1;
            border: none;
            padding: 12px 16px;
            font-size: 16px;
            outline: none;
        }

        .search-button {
            background-color: var(--primary-color);
            border: none;
            padding: 0 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background-color: var(--color-hover);
            }
            &:active {
                transform: scale(95%);
            }    
        }
        .search-button svg {
            fill: white;
        }
        .search-results {
            margin-top: 20px;
        }
    `;
    document.head.appendChild(style);

    return container;
}

// ---------------Búsqueda para CARDS (input + lupa) ----------------
export function createSearchContainerCard(onSearch, ProductListClass = ProductList, maxHeight = 'calc(100vh - 350px)') {
    const container = document.createElement('div');
    container.className = 'search-container-card';

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper-card';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Nombre del producto';
    input.className = 'search-input-card';

    const button = document.createElement('button');
    button.className = 'search-button-card';
    button.innerHTML = iconoLupa;
    searchWrapper.appendChild(input);
    searchWrapper.appendChild(button);

    const resultContainer = document.createElement('div'); //nuevo
    resultContainer.className = 'search-results-card'; //nuevo

    container.appendChild(searchWrapper);
    container.appendChild(resultContainer); //nuevo

    function performSearch() {
        const searchWord = input.value; //toma el valor escrito en el input de buscar
        if (typeof onSearch === 'function') {
            onSearch(searchWord);
        }
    }

    button.addEventListener('click', performSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .search-container-card {
            width: calc(100vw - 32px);
            max-width: 400px;
            margin: 5px auto;            
            position: sticky; 
            top: 0; 
            padding: 15px; 
        }
        
        .search-wrapper-card {
            display: flex;
            background-color: #FFFFFF;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border: 1px solid var(--primary-color);
            
        }
        .search-input-card {
            width: 100%;
            height: 48px;
            flex-grow: 1;
            border: none;
            padding: 12px 16px;
            font-size: 16px;
            outline: none;
        }
        .search-button-card {
            background-color: var(--primary-color);
            border: none;
            padding: 0 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .search-button-card:hover {
            background-color: var(--color-hover);
        }
        .search-button-card:active {
            transform: scale(95%);
        }    
        .search-button-card svg {
            fill: white;
        }
        .custom-width .search-container-card {
            padding: 0; 
        }
    `;
    document.head.appendChild(style);

    return container;
}



// ---------------Lista de producto (VENDER) ---------------------
import { iconoComprar } from "./iconosSVG.js";

export class ProductList {
    constructor(searchWord, onProductClick, maxHeight = 'calc(100vh - 350px)') {
        this.searchWord = searchWord;
        this.onProductClick = onProductClick;
        this.products = this.getProductsFromStorage();
        this.maxHeight = maxHeight;
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
        productList.style.maxHeight = this.maxHeight;

        const filteredProducts = this.filterAndSortProducts();
        
        filteredProducts.forEach(product => {
            const listItem = this.createListItem(product);
            productList.appendChild(listItem);
        });

        return productList;
    }
}

//--------------Lista de productos con radio ------------
export class RadioProductList {
    constructor(searchWord, onProductClick, maxHeight = 'calc(100vh - 350px)', height = 'auto') {
        this.searchWord = searchWord;
        this.onProductClick = onProductClick;
        this.products = this.getProductsFromStorage();
        this.maxHeight = maxHeight; 
        this.height = height;
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
        productList.style.maxHeight = this.maxHeight;
        productList.style.height = this.height;

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


//-----------Verifica si los estilos ya están cargado------------
export function verificarCss(_mensaje) {

    return  ( (mensaje)=> {
          const hojasDeEstilo = document.styleSheets;
        
          for (const hoja of hojasDeEstilo) {
            try {
              const reglas = hoja.cssRules || hoja.rules;
              if (reglas) {
                for (const regla of reglas) {
                  if (regla.selectorText && regla.selectorText.includes(`${mensaje}`)) {
                    return true;
                  }
                }
              }
            } catch (error) {
            //  console.error('Error al acceder a las reglas de la hoja de estilo:', error);
            }
          }
        
          //console.log('La regla .errorMessage no se encontró en ninguna hoja de estilo.');
          return false;
        })(_mensaje)
        
    
  }







