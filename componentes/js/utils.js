import { iconoDescargar, iconoVerPedido, iconoComprar } from "../js/iconosSVG.js";
import { navigateToMenu } from "./header.js";

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

// Función para manejar la navegación (verlo con LIO)
function navigateTo(route) {
    window.location.href = route;
}






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
export function createList(searchWord) {
    const productList = document.createElement('ul');
    productList.className = 'ul-product-list';
    
    // Traje los productos desde el localStorage
    const products = JSON.parse(localStorage.getItem('productos')) || [];

    const filteredProducts = products.filter(product => {
        return product.nombre.toLowerCase().includes(searchWord.toLowerCase());
    });

    // Ordena los productos alfabéticamente por nombre
    filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));

    filteredProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'li-product-list';
    
        // Crear un contenedor para el texto del producto
        const productTextSpan = document.createElement('span');
        productTextSpan.textContent = product.nombre;
    
        // Crear el icono
        const icon = document.createElement('i');
        icon.innerHTML = iconoComprar; 
    
        // EStilos para alinear el icono a la derecha
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';
    
        // Agregar el texto y el icono al listItem
        listItem.appendChild(productTextSpan);
        listItem.appendChild(icon);
    
        productList.appendChild(listItem);    
    
        // Agregar evento click para ejecutar el callback proporcionado
        listItem.addEventListener('click', () => {
            if (typeof itemClickCallback === 'function') {
                itemClickCallback(product);
            }
        });
    });

    return productList;
}

// -------------- Menú ventas --------(ventas, stock, perfiles)
export function createMenuPrincipal() {
    const menuPrincipal = document.createElement('div');
    menuPrincipal.className = 'main-menu';
    menuPrincipal.innerHTML = `
        <button class="tab left-btn active">Ventas</button>
        <button class="tab center-btn">Stock</button>
        <button class="tab right-btn">Perfiles</button>
    `;
    return menuPrincipal;
}

export function createMenuVentas() {
    const menuVentas = document.createElement('div');
    menuVentas.className = 'botonera-container';
    menuVentas.innerHTML = `
        <button class="botonera">
          <img src="../img/iconos/vender1.png" alt="">
          <h3>Vender</h3>
        </button>
        <button class="botonera">
          <img src="../img/iconos/Movim-Dia.png" alt="">
          <h3>Movimientos del día</h3>
        </button>
        <button class="botonera">
          <img src="../img/iconos/ventasPorPersona.png" alt="">
          <h3>Ventas por vendedor</h3>
        </button>
        <button class="botonera">
          <img src="../img/iconos/Movimiento.png" alt="">
          <h3>Ventas por producto</h3>
        </button>
        <button class="botonera">
          <img src="../img/iconos/VtasPorFecha.png" alt="">
          <h3>Ventas por fecha</h3>
        </button>
    `;
    return menuVentas;
}







