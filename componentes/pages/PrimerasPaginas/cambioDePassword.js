import { Header } from '../../js/header.js';
import { iconoVolver } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { verificarCss, verificaContenedorPrincipal } from '../../js/utils.js';
import { Notification } from '../../js/notificacion.js';

export class ChangePassword {
    constructor() {
        this.contenedorPrincipal = verificaContenedorPrincipal();
        if (!verificarCss('button-change-passw')) this.agregarCss();
        this.createHeader();
        this.createMain();
    }

    getElement() {
        return this.element;
    }

    agregarCss(){
        const style = document.createElement('style');
        style.textContent =
            `
        .container-password {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 400px;
            width: calc(100vw - 32px);
            margin: 0 auto;
            margin-top: 60px;
        
            .subtitlePass {
                width: 100vw;
                margin-top: 16px;
                margin-bottom: 8px;
            }
        
            .login-input {
                width: 100%;
                height: 48px;
                padding: 16px;
                margin-bottom: 16px;
                border: 1px solid var(--color-secundario);
                border-radius: 50px;
                font-size: 16px;
        
                &::placeholder {
                    text-align: center;
                }
            }
        
            .button-change-passw {
                width: 100%;
                height: 48px;
                padding: 12px;
                background-color: var(--color-primario);
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                margin-top: 32px;
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
            }
        }
    `        
    document.head.appendChild(style);
    }

    createHeader() {
        this.header = new Header('Cambio de contraseña', iconoVolver, null, ()=>navigateToPage('MenuVentas'));
        this.contenedorPrincipal.appendChild(this.header.getElement());
    }

    createMain() {
        const main = document.createElement('main');

        const container = document.createElement('form');
        container.classList.add('container-password');
        container.method = 'POST';


        const subtitle1 = document.createElement('h4');
        subtitle1.innerHTML = 'Contraseña actual';
        subtitle1.className = 'subtitlePass';

        const input1 = document.createElement('input');
        input1.type = 'password';
        input1.placeholder = 'Escribe tu contraseña actual';
        input1.className = 'login-input';
        input1.required = true;

        const subtitle2 = document.createElement('h4');
        subtitle2.innerHTML = 'Nueva contraseña';
        subtitle2.className = 'subtitlePass';

        const input2 = document.createElement('input');
        input2.type = 'password';
        input2.placeholder = `Escribe tu nueva contraseña`;
        input2.className = 'login-input';
        input2.required = true;

        const subtitle3 = document.createElement('h4');
        subtitle3.innerHTML = 'Confirma tu nueva contraseña';
        subtitle3.className = 'subtitlePass';

        const input3 = document.createElement('input');
        input3.type = 'password';
        input3.placeholder = 'Escribe tu nueva contraseña';
        input3.className = 'login-input';
        input3.required = true;

        const button = document.createElement('button');
        button.innerHTML = 'Guardar';
        button.className = 'button-change-passw';
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const currentPassword = input1.value.trim();
            const newPassword = input2.value.trim();
            const confirmNewPassword = input3.value.trim();

            
            // Ejemplo de contraseña almacenada en la BBDD (simulado - cuando tengamos la BBDD BORRAR ESTO)
            const storedPassword = 'contraseña';

            // Validar campos vacíos
            if (!currentPassword || !newPassword || !confirmNewPassword) {
                new Notification(
                    '../../img/emojis/pensando.png',
                    'Falta completar alguno de los campos',
                    'error'
                );
                return;
            }

            // Validar contraseña actual
            if (currentPassword !== storedPassword) {
                new Notification(
                    '../../img/emojis/pare.png',
                    'Contraseña actual incorrecta',
                    'error'
                );
                return;
            }

            // Validar coincidencia de las nuevas contraseñas
            if (newPassword !== confirmNewPassword) {
                new Notification(
                    '../../img/emojis/triste.png',
                    'No coinciden las nuevas contraseñas',
                    'error'
                );
                return;
            }

            // Si pasa todas las validaciones
            new Notification(
                '../../img/emojis/feliz.png',
                'Contraseña cambiada exitosamente',
                'success'
            );

            // Lógica para guardar la nueva contraseña en la BBDD (simulado) Ver con LIO
            console.log('Nueva contraseña guardada:', newPassword);
 

            //Lógica para guardar info en BBDD
            navigateToPage('MenuVentas');
        });

        container.appendChild(subtitle1);
        container.appendChild(input1);
        container.appendChild(subtitle2);
        container.appendChild(input2);
        container.appendChild(subtitle3);
        container.appendChild(input3);
        container.appendChild(button);

        main.appendChild(container);
        this.contenedorPrincipal.appendChild(main);

    }
}    
    

new ChangePassword();
