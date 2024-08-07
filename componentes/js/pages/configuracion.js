import { Header, iconoVolver } from '../header.js';
import { navigateToPage } from '../navigateToPage.js';

export class ConfigurationPage {
    constructor() {
        document.body.innerHTML = ''; 

        this.createHeader();
        this.createMain();
    }

    getElement() {
        return this.element;
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
