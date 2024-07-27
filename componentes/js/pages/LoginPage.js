import { Notification } from "../notificacion.js";
import { navigateToPage } from '../navigateToPage.js';

export function createLoginPage() {
    console.log('Creando página de Login');

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

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Contraseña';
    passwordInput.className = 'search-input';
    passwordInput.required = true;

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
        if (!userNameList.includes(userNameValue)) {
            new Notification('../../img/emojis/pare.png', 'No tienes acceso. Contacta al dueño para ser agregado como nuevo vendedor.', 'error');
            return;
        }
        else if (!userPasswordList.includes(passwordValue)) {
            new Notification('../../img/emojis/pare.png', 'Por favor, ingresa un email válido.', 'error');
        } else {
            // Tendría que ir a la página del menú de VENTAS
            navigateToPage('menuVentas');
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

createLoginPage()