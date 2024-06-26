export class Notification {

  constructor(iconSrc, message, type = 'success', padre='body', colors = {}) {
    this._iconSrc = iconSrc;
    this._message = message;
    this._type = type; //Para diferenciar si la notif. es verde (success) o roja (error)
    this._padre = document.querySelector(padre);
    this._colors = {
      success: {background: '#7BF087', border: '#31c140'},
      error: {background: '#fa9f9f', border: '#C00D0D'},
    }

    this.createNotification();
  }

  createNotification() {

    this.agregarCss();

    // Contenedor del aviso
    this._notificationElement = document.createElement('div');
    this._notificationElement.classList.add(`ad`, `ad-${this._type}`); // Agregar clase específica

    // Crear el contenido del aviso
    const styles = `
    background-color: ${this._colors[this._type].background};
    border: 1px solid ${this._colors[this._type].border};
    `;

    // Crear el contenido del aviso
    this._notificationElement.innerHTML = `
        <div class="ad-content">
          <div class="ad-icon">
            <img src="${this._iconSrc}" alt="Emoji" />
          </div>
          <p class="ad-message">${this._message}</p>
        </div>
      `;

    this._padre.appendChild(this._notificationElement);
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
    min-width: 280px;
    min-height: 48px;
    border-radius: 4px;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    font-weight:500;
    padding: 10px 20px; 
    align-content: center;
    text-align: center;
}

.ad-success .ad-message{
    background-color: #7BF087;
    border-color: 1px solid #31c140;
}
.ad-error .ad-message{
    background-color: #fa9f9f;
    border-color: 1px solid #C00D0D;
}
`

    head.appendChild(style);
  }
}

// Instancias 
// const pedidoFinalizado = new Notification('../img/emojis/like.png', '¡Excelente, pedido finalizado!', 'success');
// const datoIncorrecto = new Notification('../img/emojis/like.png', '¡Ups, algún dato es incorrecto!', 'error');
