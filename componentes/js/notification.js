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

    // Crea el contenido del aviso
    const styles = `
    background-color: ${this._colors[this._type].background};
    border: 1px solid ${this._colors[this._type].border};
    `;

    // Crea el contenido del aviso
    this._notificationElement.innerHTML = `
        <div class="ad-content">
          <div class="ad-icon">
             <img src="${this._iconSrc}" alt="Icono" />
          </div>
          <p class="ad-message">${this._message}</p>
        </div>
      `;

    this._padre.appendChild(this._notificationElement);

    setTimeout(() => {
      this._notificationElement.style.animation = 'slide-down 2s forwards';
  }, 2000);

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
      bottom: -80%;
      transform: translateY(55%);
      animation: slide-up 0.5s forwards;
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
          // animation: roll-in 1s forwards;
          
      }

      // @keyframes roll-in {
      //     from{
      //         transform: translateX(100px) rotate(360deg);
      //     }
      //     to {
      //         transform: translateX(0) rotate(0deg);
      //     }
      // }

      .ad-icon img{
          height: 50px;
          // width: 50px;
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

// const guardarCambios = new Notification('../img/emojis/ok.png', '¡Guardaste los cambios!', 'success') 