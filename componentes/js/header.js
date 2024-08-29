import { navigateToPage } from '../js/navigateToPage.js';
// import { iconoVolver, iconoEditar, iconoMenu, iconoAjustes, iconoAZ} from '../js/iconosSVG.js';

export class Header {
    
    constructor(title, leftIcon, rightIcon, leftIconCallback, rightIconCallback, iconoMenu, onMenuClick) {
        this._title = title;
        this._leftIcon = leftIcon;
        this._rightIcon = rightIcon;
        this._leftIconCallback = leftIconCallback;
        this._rightIconCallback = rightIconCallback;
        this._iconoMenu = iconoMenu;
        this._onMenuClick = onMenuClick;
        

        if(this._iconoMenu){
            this._iconoMenu.addEventListener('click', () =>{
                if(this._onMenuClick){
                    this._onMenuClick();
                }
            });
        }

        this.element = this.createHeaderElement();
    }

    


    createHeaderElement() {

        const headerContainer = document.createElement('header');
        headerContainer.classList.add('header');

        // Contenedor izquierdo (siempre presente)
        const leftContainer = document.createElement('div');
        leftContainer.classList.add('icon-container', 'left-icon-container');
        if (this._leftIcon) {
            const leftIcon = document.createElement('button');
            leftIcon.classList.add('icon', 'leftIcon');
            leftIcon.innerHTML = this._leftIcon;
            leftIcon.addEventListener('click', (e) => {
                e.preventDefault();
                if (this._leftIconCallback) {
                    this._leftIconCallback();
                } else {
                    if (this._backPage) {
                        navigateToPage(this._backPage);
                    } else {
                        window.history.back();
                    }
                }
            });
            leftContainer.appendChild(leftIcon);
        }
        headerContainer.appendChild(leftContainer);

        // Título (siempre presente)
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        const titleElement = document.createElement('h2');
        titleElement.innerText = this._title;
        titleElement.classList.add('headerTitle');
        titleContainer.appendChild(titleElement);
        headerContainer.appendChild(titleContainer);

        // Contenedor derecho (siempre presente)
        const rightContainer = document.createElement('div');
        rightContainer.classList.add('icon-container', 'right-icon-container');
        if (this._rightIcon) {
            const rightIcon = document.createElement('button');
            rightIcon.classList.add('icon', 'rightIcon');
            rightIcon.innerHTML = this._rightIcon;
            if (this._rightIconCallback) {
                rightIcon.addEventListener('click', this._rightIconCallback);
            }
            rightContainer.appendChild(rightIcon);
        }
        headerContainer.appendChild(rightContainer);

        const headerElement = document.querySelector('header');
        if (headerElement) {
            headerElement.replaceWith(headerContainer);
        } else {
            document.body.prepend(headerContainer);
        }

        return headerContainer;
        
    }
    getElement() {
        return this.element;
    }

updateTitle(newTitle) {
this._title = newTitle;
const titleElement = document.querySelector('.headerTitle');
if (titleElement) {
    titleElement.innerText = newTitle;
}
}

updateRightIconCallback(newCallback) {
this._rightIconCallback = newCallback;
const rightIcon = document.querySelector('.rightIcon');
if (rightIcon) {
    rightIcon.removeEventListener('click', this._rightIconCallback);
    rightIcon.addEventListener('click', this._rightIconCallback);
}
}

}




 
// Probando INSTANCIAS:
/*
const recuperaContraseña = new Header(
    'Recupera tu contraseña',
    iconoVolver,
    null,
    null,
    function() { navigateToMenu('ventas'); }
);

const cambioContraseña = new Header(
    'Cambio de contraseña',
    iconoVolver,
    null,
    null
);

const administrador = new Header(
    'Administrador',
    iconoVolver,
    iconoAjustes,
    null,
    function() { console.log('Va a la página configuración'); }
);

*/
//PERFILES
// const modificaElPerfil = new Header(
//     'Modifica el perfil',
//     iconoVolver,
//     iconoMenu,
//     null,
//     function(){ navigateToMenu('perfiles'); }
// );

