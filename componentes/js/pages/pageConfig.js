import { Header, iconoVolver } from '../header.js';

export class ConfigurationPage {
    constructor() {
        this.createHeader();
        this.createMain();
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Configuración', iconoVolver);
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main');
        document.body.appendChild(main);

        const configList = document.createElement('div');
        configList.id = 'configList'; 
        main.appendChild(configList); 

        const items = [
            { icon: '../../../img/iconos/candado.png', text: 'Cambio de contraseña' },
            { icon: '../../../img/iconos/tutorial.png', text: 'Tutorial' },
            { icon: '../../../img/iconos/tema.png', text: 'Modo claro-oscuro' }
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
        });
}    }
    
new ConfigurationPage;
