import { Header } from "../../js/header.js";
import { iconoAjustes, iconoVolver } from "../../js/iconosSVG.js";
import { createMenuPrincipal, verificarCss } from "../../js/utils.js";
import { Footer } from "../../js/footer.js";
import { navigateToPage } from "../../js/navigateToPage.js";

export class CargaDeStock {
    constructor() {
        document.body.innerHTML = ''; 
        if (!verificarCss('menu')) this.agregarCss();
        this.createHeader();
        this.createMain();
        this.createFooter();
        this.setActiveTab('Stock');
    }

    getElement() {
        return this.element;
    }

    agregarCss(){
        const style = document.createElement('style');
        style.textContent = `
        .menu {
            display: flex;
            flex-direction: column;
            align-items: center;

            .main-menu {
                max-width: 400px;
                max-height: 48px;
                width: calc(100vw - 32px);
                display: flex;
                margin-top: 10px;
                z-index: 2;

                .tab {
                    max-height: 48px;
                    flex: 1;
                    padding: 10px;
                    background-color: var(--background-fondo);
                    border: 1px solid var(--secondary-color);
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    color: var(--primary-color);
                    box-shadow: 0 2px 5px rgba(0,0,0,.25);

                    &.left-btn {
                        border-radius: 50px 0 0 50px;

                        &:active {
                            background-color: var(--primary-color);
                            color: white;
                        }
                    }

                    &.right-btn {
                        border-radius: 0 50px 50px 0;
                    }

                    &:hover {
                        transform: scale(90%);
                        background-color: var(--primary-color);
                        color: white;
                    }

                    &.active {
                        background-color: var(--primary-color);
                        color: white;
                        font-weight: bold;
                    }
                }
            }

            .botonera-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
                padding: 40px 20px 20px 20px;
                width: calc(100% - 32px);
                min-height: calc(100vh - 185px);
                max-width: 400px;
                margin-top: -20px;
                border-radius: 0 0 20px 20px;
                box-shadow: 0 2px 5px rgba(0,0,0,.25);

                button {
                    background-color: var(--background-color);
                    border: 2px solid var(--primary-color);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: calc(50% - 5px);
                    height: auto;
                    border-radius: 20px;
                    padding: 10px;
                    cursor: pointer;

                    &.btn-large {
                        min-width: 100%;
                    }

                    img {
                        width: 40px;
                        height: 40px;
                        margin-bottom: 10px;
                    }

                    &:hover {
                        background-color: var(--color-hover);
                        transform: scale(95%);
                        color: white;
                    }
                }
            }

            .botonera-vertical {
                display: flex;
                flex-direction: column;
                min-width: 100%;
                margin-bottom: 10px;
                max-height: 20vh;

                img {
                    display: block;
                    margin: 0 auto;
                }

                h3 {
                    text-align: center;
                }
            }

            .large {
                width: calc(100% - 32px);
                align-content: center;
            }
        }

        footer {
            background-color: transparent;
            color: var(--primary-color);
            text-align: center;
            padding: 10px;
            position: fixed;
            bottom: 0;
            width: 100%;

            button {
                background-color: transparent;
                border: none;
                color: var(--primary-color);
                font-size: 16px;
                cursor: pointer;
            }

            .logout-container {
                border: none;
                background-color: transparent;
                display: flex;
                align-items: center;
                gap: 4px;
                margin-top: 20px;

                img {
                    width: 24px;
                    height: 24px;
                }

                .logout-text {
                    font-size: 16px;
                }
            }
        }

	    `
        document.head.appendChild(style);
    }

    createHeader() {
        this.header = new Header('Administrador', iconoVolver, iconoAjustes, ()=> { navigateToPage('Login') }, ()=> { navigateToPage('Config') });
        
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main');
        const menu = document.createElement('div');
        menu.className = 'menu';

        menu.appendChild(createMenuPrincipal());
        menu.appendChild(createMenuCargaDeStock());

        main.appendChild(menu);
        document.body.appendChild(main);
    }

    createFooter() {
        const footer = new Footer();
        const footerElement = footer.getElement();

        const logoutContainer = document.createElement('button');
        logoutContainer.className = 'logout-container';

        const icon = document.createElement('img');
        icon.src = '../../../img/iconos/CerrarSesion.png';
        icon.alt = 'Icono Salida';
        logoutContainer.appendChild(icon);

        const logoutText = document.createElement('span');
        logoutText.textContent = 'Cerrar Sesión';
        logoutText.className = 'logout-text';
        logoutContainer.appendChild(logoutText);

        footerElement.appendChild(logoutContainer);

        document.body.appendChild(footerElement);
    }

    setActiveTab(tabName) {
        const buttons = document.querySelectorAll('.main-menu .tab');
        buttons.forEach(button => {
            if (button.textContent === tabName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

export function createMenuCargaDeStock() {
    const menuStock = document.createElement('div');
    menuStock.classList.add('botonera-container', 'large');

    const buttonsData = [
        { src: '../../../img/iconos/cargarStock.png', alt: '', text: 'Carga de stock por producto', page: 'CargarStockSearchPage' },
        { src: '../../../img/iconos/stock.png', alt: '', text: 'Carga de stock por remito', page: 'CargaStockXRemitoPage' }
    ];

    buttonsData.forEach(data => {
        const button = document.createElement('button');
        button.classList.add('botonera', 'botonera-vertical');

        const img = document.createElement('img');
        img.src = data.src;
        img.alt = data.alt;

        const h3 = document.createElement('h3');
        h3.textContent = data.text;

        button.appendChild(img);
        button.appendChild(h3);
        button.addEventListener('click', () => navigateToPage(data.page));

        menuStock.appendChild(button);
    });

    return menuStock;
}


    new CargaDeStock();

