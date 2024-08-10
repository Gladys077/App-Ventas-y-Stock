import { Header, iconoVolver } from '../header.js';
import { navigateToPage } from '../navigateToPage.js';

export class RecoverPasswordPage {
    constructor() {
        document.body.innerHTML = ''; 

            this.createHeader();
            this.createMain();
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

    
    // Método para buscar el email y enviar la contraseña
    async sendPassword(email) {
        try {
            const users = await this.fetchUsers();
            const user = users.find(user => user.email === email && user.active);

            if (user) {
                // Lógica para el envío de correo
                console.log(`Enviando la contraseña a ${email}: ${user.password}`);
                new Notification('../../../img/emojis/ok.png', `La contraseña ha sido enviada a ${email}`, 'success');
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

        const container = document.createElement('form');
        container.classList.add('container-password');
        container.method = 'POST';

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
            if (email.trim() === '') {
                new Notification('../../../img/emojis/pare.png', 'Debes ingresar tu email.', 'error');
            } else if (!this.isValidEmail(email)) {
                new Notification('../../../img/emojis/señalar.png', 'Por favor, ingresa un email válido.', 'error');
            } else {
                await this.sendPassword(email);
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
