import { Header, iconoVolver } from '../header.js';
import { navigateToPage } from '../navigateToPage.js';

export class RecoverPasswordPage {
    constructor() {
        if (!document.querySelector('.container-password')) {
            this.createHeader();
            this.createMain();
        }
    }

    getElement() {
        return this.element;
    }

    createHeader() {
        this.header = new Header('Recupera tu contraseña', iconoVolver, null, function() {
            navigateToPage('Login');
        }, null);
        document.body.appendChild(this.header.getElement());
    }

    // Simula llamada a la API para obtener usuarios
    async fetchUsers() {
        const response = await fetch('/api/users'); // <--Aquí la URL de la API
        if (!response.ok) {
            throw new Notification('../../../img/emojis/mueca.png', 'Hubo un error al obtener los usuarios', 'error');
        }
        return await response.json();
    }

    // Método para buscar el email y enviar la contraseña
    async sendPassword(email) {
        try {
            const users = await fetchUsers();
            const user = users.find(user => user.email === email && user.active);

            if (user) {
                // Lógica para el envío de correo
                console.log(`Enviando la contraseña a ${email}: ${user.password}`);
                new Notification('../../../img/emojis/ok.png', `La contraseña ha sido enviada a ${email}`, 'success')
            } else {
                new Notification('../../../img/emojis/triste.png', 'No se encontró una cuenta con ese email.', 'error');
            }
        } catch (error) {
            new Notification('../../../img/emojis/preocupado.png', 'Hubo un problema al intentar recuperar tu contraseña. Intenta nuevamente más tarde.', 'error');
        }
    }

    // Método para validar email
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    createMain() {
        const main = document.createElement('main');

        const container = document.createElement('div');
        container.classList.add('container-password');

        const image = document.createElement('img');
        image.src = '../../../img/iconos/candado.png';
        image.alt = 'Imagen de candado, para la contraseña';
        image.className = 'candado-class'; 

        const textRecuperar = document.createElement('span');
        textRecuperar.innerHTML = 'Ingresa el mail con el que te registraste, allí recibirás tu contraseña';
        textRecuperar.className = 'txt-Recuperar';

        const input = document.createElement('input');
        input.type = 'email';
        input.placeholder = 'email@domain.com';
        input.className = 'search-input';
        input.required = true;

        const button = document.createElement('button');
        button.innerHTML = 'Enviar';
        button.className = 'search-button';
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const email = input.value;
            if (this.isValidEmail(email)) {
                await this.sendPassword(email);
            } else {
                new Notification('../../../img/emojis/ok.png', `Por favor, ingresa un email válido.`, 'error');
            }
        });

        container.appendChild(image);
        container.appendChild(textRecuperar);
        container.appendChild(input);
        container.appendChild(button);

        main.appendChild(container);
        document.body.appendChild(main);
    }
}    
    
new RecoverPasswordPage();
