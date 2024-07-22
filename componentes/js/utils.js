import { iconoComprar } from "../js/iconosSVG.js";
import { navigateToPage } from "./navigateToPage.js";

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
    constructor(iconSVG, label, navigateToRoute) {
        this._iconSVG = iconSVG;
        this._label = label;
        this._navigateToRoute = navigateToRoute;
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
        if (this._navigateToRoute) {
            navigateTo(this._navigateToRoute);
        }
    }
}

// Función para manejar la navegación (ver con LIO)
function navigateTo(route) {
    window.location.href = route;
}

// ------------- Búsqueda de productos (pageProductSearch.js) -----------------
export function createSearchContainer(onProductClick) {
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
;
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(resultContainer);

    button.addEventListener('click', () => {
        const searchWord = input.value;
        const productList = createList(searchWord, onProductClick);
        resultContainer.innerHTML = '';
        resultContainer.appendChild(productList);
    });

    // AddEventListener para la tecla 'Enter'
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            button.click();
        }
    });

    return container;
}

// --------------- Listado de productos (pageProductSearch.js)------------
export function createList(searchWord, onProductClick) {
    console.log('createList called with searchWord:', searchWord);
    console.log('onProductClick type: ', typeof onProductClick);

    const productList = document.createElement('ul');
    productList.className = 'ul-product-list';
    
    // Traje los productos desde el localStorage
    const products = JSON.parse(localStorage.getItem('productos')) || [];
    console.log('Products from localStorage:', products);


    const filteredProducts = products.filter(product => {
        return product.nombre.toLowerCase().includes(searchWord.toLowerCase());
    });
    console.log('Filtered products:', filteredProducts);

    // Ordena los productos alfabéticamente por nombre
    filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));

    if (filteredProducts.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No hay productos en stock.';
        productList.appendChild(noResultsMessage);
    } else {
        filteredProducts.forEach(product => {
            const listItem = document.createElement('li');
            listItem.className = 'li-product-list';
    
            // contenedor para el texto del producto
            const productTextSpan = document.createElement('span');
            productTextSpan.textContent = product.nombre;
        
            const icon = document.createElement('i');
            icon.innerHTML = iconoComprar;
            icon.className = 'product-icon'; 
        
            // EStilos para alinear el icono a la derecha
            listItem.style.display = 'flex';
            listItem.style.justifyContent = 'space-between';
            listItem.style.alignItems = 'center';
            listItem.style.marginRight = '8px';
        
            listItem.appendChild(productTextSpan);
            listItem.appendChild(icon);
    
        productList.appendChild(listItem);    
    
        // Agregar evento click para ejecutar el callback proporcionado
        listItem.addEventListener('click', (event) => {
            console.log('Product item clicked:', product.nombre);

            if (event.target.closest('.product-icon')) {
                console.log('Icon clicked for product:', product.nombre);
                if (typeof onProductClick === 'function') {
                    console.log('Calling onProductClick');
                    onProductClick(product, event);
                } else {
                    console.error('onProductClick is not a function, it is:', onProductClick);
                }
            }
        });
    });

    return productList;
}}

// -------------- Menú ventas --------(ventas, stock, perfiles)
export function createMenuPrincipal() {
    const menuPrincipal = document.createElement('div');
    menuPrincipal.classList.add('main-menu');

    const ventasButton = document.createElement('button');
    ventasButton.classList.add('tab', 'left-btn', 'active');
    ventasButton.textContent = 'Ventas';
    ventasButton.addEventListener('click', ()=> navigateToPage('menuVentas'));

    const stockButton = document.createElement('button');
    stockButton.classList.add('tab', 'center-btn');
    stockButton.textContent = 'Stock';
    ventasButton.addEventListener('click', ()=> navigateToPage('menuStock'));


    const perfilesButton = document.createElement('button');
    perfilesButton.classList.add('tab', 'right-btn');
    perfilesButton.textContent = 'Perfiles';
    ventasButton.addEventListener('click', ()=> navigateToPage('menuPerfiles'));


    menuPrincipal.appendChild(ventasButton);
    menuPrincipal.appendChild(stockButton);
    menuPrincipal.appendChild(perfilesButton);

    return menuPrincipal;
}










