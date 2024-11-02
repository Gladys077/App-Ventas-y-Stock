import { Header } from '../../js/header.js';
import { iconoVolver } from '../../js/iconosSVG.js'
import { navigateToPage } from '../../js/navigateToPage.js';
import { verificarCss } from '../../js/utils.js';

export class ConfigurationPage {
    constructor() {
        document.body.innerHTML = ''; 
        if (!verificarCss('button-change-passw')) this.agregarCss();
        this.createHeader();
        this.createMain();
    }

    getElement() {
        return this.element;
    }

    agregarCss(){
        const style = document.createElement('style');
        style.textContent = `
        #configList {
            display: flex;
            flex-direction: column;
            max-width: 400px;
            width: calc(100vw - 32px);
            margin: 0 auto;
            margin-top: 40px;
            font-weight: 400;

            .list-item {
                display: flex;
                align-items: center;
                line-height: 48px;
                cursor: pointer;

                .img-config {
                    margin: 0px 8px 0 16px;
                }

                .txt-config {
                    flex-grow: 1;
                }
            }
        }
    	`
        document.head.appendChild(style);
    }

    createHeader() {
        this.header = new Header('Configuración', iconoVolver, null, ()=> navigateToPage('MenuVentas'));
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main');
        document.body.appendChild(main);

        const configList = document.createElement('div');
        configList.id = 'configList'; 
        main.appendChild(configList); 

        const items = [
            { icon: '../../../img/iconos/candado.png', text: 'Cambio de contraseña', page: 'cambioDePassword' },
            { icon: '../../../img/iconos/comercio.png', text: 'Datos del comercio', page: 'DatosDelComercio' },
            { icon: '../../../img/iconos/tutorial.png', text: 'Tutorial', page: 'tutorial' },
            { icon: '../../../img/iconos/tema.png', text: 'Modo claro-oscuro', action: this.toggleTheme.bind(this) }
        ];
    
        items.forEach(item => {  
            const listItem = document.createElement('div');
            listItem.className = 'list-item';
    
            const icon = document.createElement('img');
            icon.className='img-config';
            icon.src = item.icon;
            icon.alt = item.text + ' icon';  
            icon.width = 24;  
            icon.height = 24; 
    
            const text = document.createElement('span');
            text.className = 'txt-config';
            text.textContent = item.text;
    
            listItem.appendChild(icon);
            listItem.appendChild(text);
            configList.appendChild(listItem);
            main.appendChild(configList);
            
            if (item.page) {
                listItem.addEventListener('click', () => {
                    navigateToPage(item.page);
                });
            } else if (item.action) {
                listItem.addEventListener('click', item.action);
            }
        });
    } 

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
    }
}

new ConfigurationPage();
