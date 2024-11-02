import { Header } from '../../js/header.js';
import { iconoVolver } from '../../js/iconosSVG.js';
import { navigateToPage } from '../../js/navigateToPage.js';
import { verificarCss } from '../../js/utils.js';

export class ChangePassword {
    constructor() {
        document.body.innerHTML = ''; 
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
                border: 1px solid #ccc;
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
                background-color: var(--primary-color);
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
        document.body.appendChild(this.header.getElement());
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
        subtitle2.innerHTML = 'Contraseña actual';
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
        document.body.appendChild(main); 

    }
}    
    

new ChangePassword();
