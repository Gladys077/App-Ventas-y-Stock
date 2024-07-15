import { iconoDescargar } from "./iconosSVG.js";

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

// ------------- Búsqueda de productos -----------------
export function createSearchContainer() {
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
        const productList = createList(searchWord);
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

// --------------- Listado de productos ------------
/* 'products'= array con todos los productos y 'searchWord'= palabra o frase que el usuario ingrese en el buscador */
export function createList(searchWord) {
    const productList = document.createElement('ul');
    productList.className = 'ul-product-list';
    
    // Traje los productos desde el localStorage
    const products = JSON.parse(localStorage.getItem('productos')) || [];

    // filtra productos que contienen la palabra de búsqueda
    const filteredProducts = products.filter(product => {
        return product.nombre.toLowerCase().includes(searchWord.toLowerCase());
    });

    filteredProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'li-product-list';

        // En la variable se guarda el nombre (o si quiero agregar otros datos)
        const productInfo = `${product.nombre}`;

        listItem.textContent = productInfo;
        productList.appendChild(listItem);    
    });

    return productList;
}