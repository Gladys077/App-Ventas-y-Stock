import { Header } from '../../js/header.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { iconoVolver } from '../../js/iconosSVG.js';
import { verificarCss } from '../../js/utils.js';

export class RecoverPasswordPage {
    constructor() {
        document.body.innerHTML = ''; 
        if (!verificarCss('candado-class')) this.agregarCss();
        this.createHeader();
        this.createMain();
    }
    
    getElement() {
        return this.element;
    }

    agregarCss(){
        const style = document.createElement('style');
        style.textContent = `
            .container-password {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 400px;
                width: calc(100vw - 32px);
                margin: 0 auto;
                margin-top: 60px;

            .candado-class {
                width: 60px;
                height: 60px;
                margin-bottom: 40px;
            }

            .txt-Recuperar {
                font-size: 16px;
                font-weight: 400;
                margin-bottom: 16px;
                width: 75%;
            }

            .login-input {
                width: 100%;
                height: 48px;
                padding: 16px;
                margin-bottom: 16px;
                border: 1px solid #ccc;
                border-radius: 50px;
                font-size: 16px;

                &::placeholder {
                    text-align: center;
                }
            }

            .login-button {
                width: 100%;
                height: 48px;
                padding: 12px;
                background-color: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);

                &:hover {
                    background-color: var(--color-hover);
                }

                &:active {
                    transform: scale(95%);
                }
            }
        }

	    `
            document.head.appendChild(style);
    }

    createHeader() {
        this.header = new Header('Recupera tu contraseña', iconoVolver, null, ()=>navigateToPage('Login'));
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
        input.className = 'login-input';
        input.required = true;

        const button = document.createElement('button');
        button.innerHTML = 'Enviar';
        button.className = 'login-button';
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
