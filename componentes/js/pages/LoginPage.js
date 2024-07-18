// import {createMainPage} from '.'
// import {createForgotPasswordPage} from '.'
import { Notification } from "../notificacion.js";

export function createLoginPage() {
    document.body.innerHTML = '';

    const loginContainer = document.createElement('div');
    loginContainer.className = 'login';

    const titulo = document.createElement('h1');
    titulo.innerHTML = 'Bienvenido <br> a la Tienda';
    titulo.className = 'title-login';

    const userName = document.createElement('input');
    userName.id = 'username'
    userName.type = 'text';
    userName.placeholder = 'Usuario';
    userName.className = 'search-input';
    userName.required = true;

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'email@domain.com';
    emailInput.className = 'search-input';
    emailInput.required = true;

    const loginButton = document.createElement('button');
    loginButton.innerHTML = 'Ingresar';
    loginButton.className = 'search-button';
    loginButton.addEventListener('click', (event)=> {
        
        event.preventDefault(); // Evita el comportamiento predeterminado del btn


        // Ejemplo: lista de usuarios permitidos
        const userNameList = ['usuario1', 'usuario2', 'usuario3'];

        // Obtengo el valor del campo de nombre de usuario (con .trim quito espacios y retornos que haya al principio o final de la cadena)
        const userNameValue = userName.value.trim();

        // Valido si el usuario está en el array userNameList
        if (!userNameList.includes(userNameValue)) {
            new Notification('../../img/emojis/pare.png', 'No tienes acceso. Contacta al dueño para ser agregado como nuevo vendedor.', 'error');
            return;
        }
        else if (!emailInput.validity.valid) {
            new Notification('../../img/emojis/pare.png', 'Por favor, ingresa un email válido.', 'error');
        } else {
            // Tendría que ir a la página del menú de VENTAS
            createMainPage();
        }
    });
    

    const forgotPassword = document.createElement('a');
    forgotPassword.href = '#';
    forgotPassword.innerHTML = 'Olvidé mi contraseña';
    forgotPassword.className = 'forgot-password';
    forgotPassword.addEventListener('click', ()=> {
        createForgotPasswordPage();
    })



    loginContainer.appendChild(titulo);
    loginContainer.appendChild(userName);
    loginContainer.appendChild(emailInput);
    loginContainer.appendChild(loginButton);
    loginContainer.appendChild(forgotPassword);

    document.body.appendChild(loginContainer);
    
}

