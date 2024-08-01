export class Notification {
  constructor(iconSrc, message, type = 'success', padre = 'body', colors = {}) {
    this._iconSrc = iconSrc;
    this._message = message;
    this._type = type;
    this._padre = document.querySelector(padre);
    this._colors = {
      success: { background: '#7BF087', border: '#31c140' },
      error: { background: '#fa9f9f', border: '#C00D0D' },
      
    };

    this.createNotification();
  }

  createNotification() {

    this.agregarCss();

    this._notificationElement = document.createElement('div');

    this._notificationElement.classList.add('ad', `ad-${this._type}`);

    this._notificationElement.innerHTML = `
      <div class="ad-content">
        <div class="ad-icon">
          <img src="${this._iconSrc}" alt="Icono" />
        </div>
        <p class="ad-message">${this._message}</p>
      </div>
    `;

    this._padre.appendChild(this._notificationElement);

    // Usé requestAnimationFrame para asegurar que el elemento esté renderizado
    requestAnimationFrame(() => {
      this._notificationElement.style.animation = 'slide-up 0.5s forwards';

    });

    // Programar la animación de salida
    setTimeout(() => {
      this._notificationElement.style.animation = 'slide-down 2.5s forwards';
      // Eliminar el elemento después de la animación
      setTimeout(() => this.removeNotification(), 500);
    }, 2500);
  }

  removeNotification() {
    if (this._notificationElement && this._notificationElement.parentNode) {
      this._notificationElement.parentNode.removeChild(this._notificationElement);
    }
  }
  
  agregarCss() {
    if (!document.querySelector('#notificationStyles')) {
      const head = document.querySelector('head');
      const style = document.createElement('style');
      style.id = 'notificationStyles';
      style.innerText = `
        .ad {
          width: 100%;
          position: fixed;
          z-index: 10;
          top: -500px;
          left: 0;
          display: flex;
          justify-content: center;
          pointer-events: none;
          z-index: 9999;
        }
        
      @keyframes slide-up {
        to { top: 50%; left: 50%; 
        transform: translate(-50%, -50%); 
        }
      }

        @keyframes slide-down {
          to { top: -400px; }
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
          border-radius: 50%;
          box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
          display: flex; 
          justify-content: center; 
          align-items: center; 
          margin-bottom: -4px;
          z-index: 11;
        }
        .ad-icon img {
          height: 50px;
        }
        .ad-message {
          min-width: 280px;
          min-height: 48px;
          border-radius: 4px;
          font-family: Roboto, sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 10px 20px; 
          text-align: center;
          align-content: center;
          letter-spacing: 0.3px;
        }
        .ad-success .ad-message {
          background-color: ${this._colors.success.background};
          border: 1px solid ${this._colors.success.border};
        }
        .ad-error .ad-message {
          background-color: ${this._colors.error.background};
          border: 1px solid ${this._colors.error.border};
        }
      `;

    document.head.appendChild(style);
  }
}
}

// Instancias 

// const datoIncorrecto = new Notification('../img/emojis/mueca.png', '¡Ups, algún dato es incorrecto!', 'error');

// const errorAlDescargar = new Notification('../img/emojis/asombro.png', '¡Error al descargar!', 'error');

// const pedidoFinalizado = new Notification('../img/emojis/guiño.png', '¡Excelente, pedido finalizado!', 'success');

// const descargaExitosa = new Notification('../img/emojis/like.png', '¡Descarga exitosa!', 'success');

// const seleccionaVendedor = new Notification('../img/emojis/señalar.png', '¡Primero debes seleccionar un vendedor!', 'success');

// const guardado = new Notification('../img/emojis/ok.png', '¡Listo, guardado!', 'success');
// const guardado = new Notification('../img/emojis/ok.png', '¡Has guardado los cambios!', 'success');

// const agregasteAStock1 = new Notification('../img/emojis/check.png', '¡Listo, lo agregaste a tu stock!', 'success');

// const agregasteAStock2 = new Notification('../img/emojis/check.png', '¡Agregaste los productos a tu stock!', 'success');

// const modificacionGuardada = new Notification('../img/emojis/ok.png', '¡Bien hecho, tu modificación se guardó!', 'success');

// const eliminaDelStock = new Notification('../img/emojis/trash.png', '¡Eliminaste el producto de tu stock!', 'success');

// const agregasteNuevoPerfil = new Notification('../img/emojis/perfil.png', '¡Agregaste un nuevo perfil!', 'success');

// const eliminado = new Notification('../img/emojis/like.png', '¡Listo, eliminado!', 'success');
