import { Header, iconoVolver } from '../header.js';

export class ChangePassword {
    constructor() {
        this.createHeader();
        this.createMain();
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Cambio de contraseña', iconoVolver);
        document.body.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main');

        const container = document.createElement('div');
        container.classList.add('container-password');


        const subtitle1 = document.createElement('h4');
        subtitle1.innerHTML = 'Contraseña actual';
        subtitle1.className = 'subtitlePass';

        const input1 = document.createElement('input');
        input1.type = 'password';
        input1.placeholder = 'Escribe tu contraseña actual';
        input1.className = 'search-input';
        input1.required = true;


        const subtitle2 = document.createElement('h4');
        subtitle2.innerHTML = 'Contraseña actual';
        subtitle2.className = 'subtitlePass';

        const input2 = document.createElement('input');
        input2.type = 'password';
        input2.placeholder = 'Escribe tu <b>nueva<b>contraseña';
        input2.className = 'search-input';
        input2.required = true;


        const subtitle3 = document.createElement('h4');
        subtitle3.innerHTML = 'Confirma tu nueva contraseña';
        subtitle3.className = 'subtitlePass';

        const input3 = document.createElement('input');
        input3.type = 'password';
        input3.placeholder = 'Escribe tu <b>nueva<b>contraseña';
        input3.className = 'search-input';
        input3.required = true;


        const button = document.createElement('button');
        button.innerHTML = 'Guardar';
        button.className = 'button-change-passw';
        button.addEventListener('click', (event) => {
            event.preventDefault();
            //Lógica para guardar info en BBDD
        });

        container.appendChild(subtitle1);
        container.appendChild(input1);
        container.appendChild(subtitle2);
        container.appendChild(input2);
        container.appendChild(subtitle3);
        container.appendChild(input3);
        container.appendChild(button);

        main.appendChild(container);
        document.body.appendChild(main); 

    }
}    
    

new ChangePassword();
