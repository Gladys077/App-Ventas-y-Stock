import { Notification } from "../../js/notificacion.js";
import { navigateToPage } from '../../js/navigateToPage.js';
import { verificarCss } from '../../js/utils.js';

export class createLoginPage {
    constructor() {
        document.body.innerHTML = '';
        if (!verificarCss('login')) this.agregarCss();
        this.createMain();

    }

    agregarCss(){
        const style = document.createElement('style');
        style.textContent = `
        
        .login {
            width: calc(100vw - 32px);
            max-width: 400px;
            height: 100vh;
            margin-top: 100px;
            text-align: center;
            display: flex;
            flex-direction: column;

            .title-login {
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 60px;
            }

            .search-input {
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

            .search-button {
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

            .forgot-password {
                margin-top: 16px;
                color: var(--primary-color);

                &:hover {
                    font-weight: 700;
                }

                &:active {
                    transform: scale(90%);
                }
            }
        }

	    `
            document.head.appendChild(style);
    }
    

createMain(){
    const loginContainer = document.createElement('form');
    loginContainer.className = 'login';
    loginContainer.method = 'POST';

    const titulo = document.createElement('h1');
    titulo.innerHTML = 'Bienvenido <br> a la Tienda';
    titulo.className = 'title-login';

    const userName = document.createElement('input');
    userName.id = 'username'
    userName.type = 'text';
    userName.placeholder = 'Usuario';
    userName.className = 'search-input';
    userName.required = true;

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Contraseña';
    passwordInput.className = 'search-input';
    passwordInput.required = true;
    passwordInput.autocomplete = 'off';

    const loginButton = document.createElement('button');
    loginButton.innerHTML = 'Ingresar';
    loginButton.className = 'search-button';
    loginButton.addEventListener('click', (event)=> {
        event.preventDefault(); 

        // Ejemplo: lista de usuarios permitidos
        const userNameList = ['usuario1', 'usuario2', 'usuario3'];
        const userPasswordList = ['usu1', 'usu2', 'usu3'];

        // Obtengo el valor del campo de nombre de usuario (con .trim quito espacios y retornos que haya al principio o final de la cadena)
        const userNameValue = userName.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Valido si el usuario está en el array userNameList
        if (userNameValue === '') {
            new Notification('../../../img/emojis/pensando.png', '¿Olvidaste completar algún dato?', 'error');
            return;
        }
        else if (!userNameList.includes(userNameValue)) {
            new Notification('../../../img/emojis/pare.png', 'No tienes acceso. Contacta al dueño para ser agregado como nuevo vendedor.', 'error');
            return;
        }
        else if (!userPasswordList.includes(passwordValue)) {
            new Notification('../../../img/emojis/pare.png', 'Por favor, ingresa un email válido.', 'error');
        } else {
            navigateToPage('MenuVentas');
        }
    });
    

    
    const forgotPassword = document.createElement('a');
    // forgotPassword.href = '#';
    forgotPassword.innerHTML = 'Olvidé mi contraseña';
    forgotPassword.className = 'forgot-password';
    forgotPassword.addEventListener('click', ()=>  navigateToPage('RecoverPassword'));

    loginContainer.appendChild(titulo);
    loginContainer.appendChild(userName);
    loginContainer.appendChild(passwordInput);
    loginContainer.appendChild(loginButton);
    loginContainer.appendChild(forgotPassword);

    document.body.appendChild(loginContainer);
}
    
}

new createLoginPage();