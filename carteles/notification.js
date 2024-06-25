class Notification {
  constructor(iconSrc, message, type = 'success') {
    this.iconSrc = iconSrc;
    this.message = message;
    this.type = type; //Para diferenciar si la notif. es verde (success) o roja (error)
    this.notificationElement = null;

    this.createNotification();
  }

  createNotification() {

    this.agregarCss();

    // Contenedor del aviso
    this.notificationElement = document.createElement('div');
    this.notificationElement.classList.add('ad', `ad-${this.type}`);

    // Crear el contenido del aviso
    this.notificationElement.innerHTML = `
        <div class="ad-content">
          <div class="ad-icon">
            <img src="${this.iconSrc}" alt="Emoji" />
          </div>
          <p class="ad-message">${this.message}</p>
        </div>
      `;

    // Añadir el aviso al body
    document.body.appendChild(this.notificationElement);
  }

  showNotification() {
    this.createNotification();
    // Muestra el aviso
    setTimeout(() => {
      this.notificationElement.style.display = 'block';
    }, 10);

    setTimeout(() => {
      this.notificationElement.style.display = 'none';
      this.notificationElement.remove();
    }, 5000);
  }

  agregarCss() {
    const head = document.querySelector('head');
    const style = document.createElement('style');
    style.innerText = `
.ad {
 width: 100%;
 height: 100%;
 /* display: none; */
 position: fixed;
 z-index: 10;
 bottom: -100%;
 transform: translateY(64%);
 animation: slide-up 2s forwards;
}
@keyframes slide-up {
    from {
        bottom: -100px;
    }
    to {
        bottom: 20px;
    }
}

.ad-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.ad-icon {
    width: 72px;
    height: 72px;
    background-color: #fff;
    border-radius: 100%;
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
    display: flex; 
    justify-content: center; 
    align-items: center; 
    margin-bottom: -4px;
    z-index: 11;
    animation: roll-in 1s forwards;
}

@keyframes roll-in {
    from{
        transform: translateX(100px) rotate(360deg);
    }
    to {
        transform: translateX(0) rotate(0deg);
    }
}

.ad-icon img{
    height: 50px;
    width: 50px;
}

.ad-message {
    min-height: 48px;
    border-radius: 4px;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    font-weight:500;
    padding: 10px 20px; 
    align-content: center;
    
    background-color: var(--color-verde-claro);
    border-color: 1px solid var(--color-verde);
}

.ad-success .ad-message{
    background-color: var(--color-verde-claro);
    border-color: 1px solid var(--color-verde);
}
.ad-error .ad-message{
    background-color: var(--color-rojo-claro);
    border-color: 1px solid var(--color-rojo);
}
`

    head.appendChild(style);
  }
}

// Instancias 
 new Notification('../img/emojis/like.png', '¡Descarga Exitosa!', 'success');


/*
const pedidoFinalizado = new Notification('../img/emojis/like.png', '¡Excelente, pedido finalizado!', 'success');
pedidoFinalizado.showNotification();
 
const modificacionGuardada = new Notification('../img/emojis/guiño.jpg', '¡Bien hecho, tu modificación ya se guardó!', 'success');
modificacionGuardada.showNotification();

const modificacionCancelada = new Notification('../img/emojis/guiño.jpg', '¡Cancelaste la modificación!', 'success');
modificacionCancelada.showNotification();

const seleccionaVendedor = new Notification('../img/emojis/like.png', '¡Primero debes seleccionar un vendedor!', 'success');
seleccionaVendedor.showNotification();
 
const agregasteElProducto = new Notification('../img/emojis/like.png', '¡Listo, agregaste los productos a tu stock!', 'success');
agregasteElProducto.showNotification();

const cambiosGuardados = new Notification('../img/emojis/like.png', '¡Listo, cambios guardados!', 'success');
cambiosGuardados.showNotification();

const datoIncorrecto = new Notification('../img/emojis/like.png', '¡Ups, algún dato es incorrecto!', 'error');
datoIncorrecto.showNotification();

const errorAlDescargar = new Notification('../img/emojis/like.png', '¡Ouch, hubo un error al descargar!', 'error');
errorAlDescargar.showNotification();
 
const noExisteEnStock = new Notification('../img/emojis/like.png', '¡No existe en tu stock!', 'error');
noExisteEnStock.showNotification();*/