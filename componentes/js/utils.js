import { iconoDescargar } from "./iconosSVG.js";

// Valida fecha
export function isValidDate(dateString) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateString)) return false;
    const [, day, month, year] = dateString.match(regex);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() == year && (date.getMonth() + 1) == parseInt(month) && date.getDate() == parseInt(day);
};

// Formato fecha
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

// ------------- Búsqueda de productos ---------------------
export function createSearchContainer() {
    const container = document.createElement('div');
    container.className = 'search-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Nombre del producto';
    input.className = 'search-input';

    const button = document.createElement('button');
    button.textContent = 'Buscar';
    button.className = 'search-button-products';

    container.appendChild(input);
    container.appendChild(button);

    return container;
}

// ------------------Crea Btn (TAB) para descargar-----------------ARREGLARLO
export class TabButton {
    constructor(iconoURL, onClick) {
        this._iconoURL = iconoURL;
        this._onClick = onClick;
        this._element = this.createTabButton();
    }

    getElement() {
        return this._element;
    }

    createTabButton() {
        this.cargarCss();

        const button = document.createElement('button');
        button.className = 'tab-button';
        // button.style.backgroundImage = `url('${this._iconoURL}')`;
        button.textContent= "?";

        // estilos del botón
        Object.assign(button.style, {
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-hover)',
            color: 'white',
            fontSize: '24px',
            border: 'none',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            cursor: 'pointer',
            // zIndex: '1000'
        });

        button.addEventListener('click', () => this.handleButtonClick());
        return button;
    }

    handleButtonClick() {
        if (typeof this._onClick === 'function') {
           this._onClick();

            // Aquí la lógica de la descarga en el dispositivo
            this.downloadPDF();
        } else {
            new Notification('../img/emojis/pare.png', 'Ouch, No se pudo descargar.', 'error');
        }
    }

    downloadPDF() {
        // Lógica para generar o descargar el PDF
        setTimeout(() => {
            const notification = new Notification('../img/emojis/like.png', '¡Descarga exitosa!', 'success');
        }, 1500);
    }

    cargarCss() {
        const head = document.querySelector('head');
        const style = document.createElement('style');
        style.innerText = `
          /* limpio los estilo por default de button */
            button {
                border: none;
                outline: none;
                cursor: pointer;
                height: 100vh;
                widht: 100vw;
                z-index. 200;
            }

            /* Estilos para el TabButton */
            .tab-button {
                position: fixed;
                bottom: 16px;
                right: 16px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background-color: #bb86fc; /* Color lila */
                background-repeat: no-repeat;
                background-position: center;
                background-size: 24px 24px;
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                display: flex;
                justify-content: center;
                align-items: center;
                transition: background-color 0.3s, box-shadow 0.3s;
                // display: block !important;
                // visibility: visible !important;
                // opacity. 1 !important;
            }

            /* Efecto hover para el TabButton */
            .tab-button:hover {
                background-color: #9e67cc; /* Color lila más oscuro para el hover */
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.24);
            }

            /* Efecto active para el TabButton */
            .tab-button:active {
                background-color: #8a4dab; /* Color lila aún más oscuro para el active */
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.32);
            }


            @media screen and (min-width: 768px) {
    .tab-button {
        bottom: auto;
        top: 16px;
        right: 16px;
    }
}

/* Ajuste para pantallas más grandes */
@media screen and (min-width: 1024px) {
    .tab-button {
        position: static;
        display: inline-block;
        margin-right: 16px;
    }
}
                }`
}
}