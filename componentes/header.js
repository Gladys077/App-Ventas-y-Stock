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

        this.armarHeader();
    }

    armarHeader() {
        this.agregarCss();

        const headerContainer = document.createElement('header');
        headerContainer.classList.add('header');

        // Contenedor izquierdo (siempre presente)
        const leftContainer = document.createElement('div');
        leftContainer.classList.add('icon-container', 'left-icon-container');
        if (this._leftIcon) {
            const leftIcon = document.createElement('button');
            leftIcon.classList.add('icon', 'leftIcon');
            leftIcon.innerHTML = this._leftIcon;
            leftIcon.addEventListener('click', this._leftIconCallback || (() => {
                window.history.back();
                console.log('Volver atrás');
            }));
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
            rightIcon.addEventListener('click', this._rightIconCallback || (() => {
                console.log('Right icon clicked');
            }));
            rightContainer.appendChild(rightIcon);
        }
        headerContainer.appendChild(rightContainer);

        const headerElement = document.querySelector('header');
        if (headerElement) {
            headerElement.replaceWith(headerContainer);
        } else {
            document.body.prepend(headerContainer);
        }
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

agregarCss() {
const style = document.createElement('style');
style.textContent = `
    .header {
        font-family: Roboto, sans-serif;
        display: grid;
        grid-template-columns: 60px 1fr 60px;
        align-items: center;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
    }

    .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
    }

    .title-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .headerTitle {
        margin: 0;
        font-size: 16px;
        text-align: center;
    }

    .icon {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 12px;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
document.head.appendChild(style);
}
}

const iconoVolver = `
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="24px" height="24px" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M3175 4221 c-58 -30 -1539 -1514 -1560 -1563 -22 -53 -20 -152 5
-202 13 -28 268 -289 777 -797 611 -610 765 -759 796 -769 22 -7 69 -10 107
-8 81 4 135 35 184 106 25 35 31 55 34 112 2 38 -1 85 -8 107 -10 30 -141 167
-668 696 l-657 657 657 658 c527 528 658 665 668 695 7 22 10 69 8 107 -4 81
-35 135 -107 185 -37 26 -53 30 -119 33 -62 2 -85 -1 -117 -17z"/>
</g>
</svg>
`;

const iconoEditar = `
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="24px" height="24px" viewBox="0 0 512.000000 512.000000"
         preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#000000" stroke="none">
            <path d="M3753 4442 c-29 -10 -69 -30 -90 -45 -21 -15 -511 -500 -1089 -1079
            -724 -726 -1059 -1068 -1077 -1100 -34 -63 -53 -124 -141 -454 -42 -154 -76
            -298 -76 -321 0 -71 77 -153 144 -153 58 0 682 167 753 201 64 31 136 101
            1139 1104 847 845 1077 1080 1097 1120 53 109 58 206 16 322 -19 50 -42 78
            -168 206-182 184 -225 210 -365 214 -69 3 -103 -1 -143 -15z m207 -217 c38
            -20 247 -237 259 -269 17 -42 13 -103 -8 -145 -11 -20 -69 -83 -128 -139
            l-109 -101 -208 208 -207 207 129 126 c133 130 150 141 217 130 17 -2 41 -10
            55 -17z m-850 -1530 l-715 -715 -210 210 -210 210 715 715 715 715 210 -210
            210 -210 -715 -715z m-935 -925 c-70 -71 -94 -83 -240 -124 l-120 -34 -107
            107 -107 106 29 109 c37 136 58 177 128 249 l57 57 207 -207 208 -208 -55 -55z"/>
            <path d="M685 839 c-31 -27 -35 -37 -35 -79 0 -42 4 -52 35 -79 l36 -31 1845
            2 1846 3 29 33 c40 45 40 99 0 144 l-29 33 -1846 3 -1845 2 -36 -31z"/>
        </g>
    </svg>
`;

const iconoMenu = `
        <?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
    "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="24px" height="24px" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">
    <metadata>
    Created by potrace 1.16, written by Peter Selinger 2001-2019
    </metadata>
    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    fill="#000000" stroke="none">
    <path d="M765 4036 c-85 -40 -125 -103 -125 -196 0 -93 40 -156 125 -196 l50
    -24 1745 0 1745 0 50 24 c85 40 125 103 125 196 0 93 -40 156 -125 196 l-50
    24 -1745 0 -1745 0 -50 -24z"/>
    <path d="M765 2756 c-85 -40 -125 -103 -125 -196 0 -93 40 -156 125 -196 l50
    -24 1745 0 1745 0 50 24 c85 40 125 103 125 196 0 93 -40 156 -125 196 l-50
    24 -1745 0 -1745 0 -50 -24z"/>
    <path d="M765 1476 c-85 -40 -125 -103 -125 -196 0 -93 40 -156 125 -196 l50
    -24 1745 0 1745 0 50 24 c85 40 125 103 125 196 0 93 -40 156 -125 196 l-50
    24 -1745 0 -1745 0 -50 -24z"/>
    </g>
    </svg>
`;

const iconoAjustes = `
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M2265 4678 c-21 -19 -40 -69 -99 -261 -40 -131 -77 -242 -82 -246 -5
-5 -34 -16 -64 -26 -30 -10 -101 -39 -157 -66 -57 -27 -105 -49 -108 -49 -4 0
-102 52 -219 115 -169 91 -222 115 -253 115 -37 0 -47 -8 -237 -199 -192 -193
-199 -201 -193 -233 3 -18 58 -128 122 -245 l116 -211 -39 -79 c-22 -43 -52
-114 -67 -158 -16 -44 -33 -85 -39 -91 -6 -7 -117 -44 -246 -83 -190 -57 -239
-75 -258 -96 -22 -26 -22 -30 -22 -299 0 -247 2 -276 18 -296 13 -16 81 -41
262 -96 134 -41 247 -78 251 -82 3 -4 19 -41 34 -82 15 -41 45 -110 67 -152
21 -43 38 -82 38 -88 0 -6 -52 -108 -116 -227 -63 -120 -118 -229 -121 -244
-3 -14 2 -39 10 -55 24 -46 368 -382 399 -389 38 -10 45 -6 280 121 116 63
215 114 220 114 5 0 39 -14 76 -32 37 -17 108 -46 157 -63 l90 -32 72 -244
c63 -213 77 -248 103 -271 l30 -28 261 0 c280 0 309 5 325 52 5 13 40 128 79
257 l70 234 100 36 c55 21 127 51 160 68 l60 31 230 -125 c200 -108 235 -123
265 -119 28 5 65 36 213 183 98 98 185 191 194 207 8 16 13 41 10 55 -3 15
-59 126 -125 247 l-119 221 37 74 c21 41 52 112 69 159 l32 86 237 69 c204 60
242 74 270 102 l32 31 0 272 c0 166 -4 279 -10 290 -6 11 -20 24 -31 30 -15 9
-473 150 -485 150 -1 0 -16 37 -32 83 -17 45 -46 117 -66 160 -20 43 -36 82
-36 86 0 4 52 104 116 222 63 118 118 226 121 240 3 14 -2 39 -10 55 -24 46
-368 382 -399 389 -38 10 -45 6 -281 -121 l-211 -115 -106 49 c-58 27 -127 57
-155 66 -27 9 -56 20 -62 24 -7 4 -44 113 -83 242 -60 200 -75 239 -101 263
l-29 27 -270 0 c-264 0 -269 0 -295 -22z m491 -1368 c274 -70 493 -295 560
-576 22 -91 22 -257 0 -348 -69 -288 -294 -513 -582 -582 -91 -22 -257 -22
-348 0 -288 69 -513 294 -582 582 -22 91 -22 257 0 348 76 317 335 552 658
596 82 11 204 2 294 -20z"/>
</g>
</svg>
`;

function navigateToMenu(destino){
    switch(destino){
        case "ventas":
            console.log('Navegando al menú de ventas');
            //aquí va la lógica para ir allí
            break;
        case "stock":
            console.log('Navegando al menú de stock');
            //aquí va la lógica para ir allí
            break;        
        case "perfiles":
            console.log('Navegando al menú de perfiles');
            //aquí va la lógica para ir allí
            break;
        default:
            console.log('Destino no especificado');
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

const configuracion = new Header(
    'Configuración',
    iconoVolver,
    null,
    null
);

const VenderEligeProducto = new Header(
    'Vender / Elige el producto',
    iconoVolver,
    iconoMenu,
    null,
    function() { navigateToMenu('ventas'); }
);

const PedidoActual = new Header(
    'Pedido actual',
    iconoVolver,
    iconoMenu,
    null,
    function() { navigateToMenu('ventas'); }
);

const pedidoFinalizado = new Header(
    'Pedido finalizado',
    iconoVolver,
    iconoMenu,
    null,
    function(){ navigateToMenu('ventas'); }
)

const movimientoDelDia = new Header(
    'Movimientos del día',
    iconoVolver,
    null,
    null
);

const ventasPorVendedor = new Header(
    'Ventas por vendedor',
    iconoVolver,
    null,
    null
);

const ventasPorProducto = new Header(
    'Ventas por producto',
    iconoVolver,
    null,
    null
);

const unidadesVendidas = new Header(
    'Unidades vendidas',
    iconoVolver,
    iconoMenu,
    null,
    function(){ navigateToMenu('ventas'); }
);

const listadoPorFecha = new Header(
    'listadoPorFecha',
    iconoVolver,
    iconoMenu,
    null,
    function(){ navigateToMenu('ventas'); }
);

const ventasPorFecha = new Header(
    'Ventas por fecha',
    iconoVolver,
    null,
    null
);



//STOCK
const productoAEliminar = new Header(
    'Elige el producto a eliminar',
    iconoVolver,
    iconoMenu,
    null,
    function(){ navigateToMenu('stock'); }
);
*/
//PERFILES
const modificaElPerfil = new Header(
    'Modifica el perfil',
    iconoVolver,
    iconoMenu,
    null,
    function(){ navigateToMenu('perfiles'); }
);

