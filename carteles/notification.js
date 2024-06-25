class Notification {
    constructor(iconSrc, message, type = 'success') {
      this.iconSrc = iconSrc;
      this.message = message;
      this.type = type; //Para diferenciar si la notif. es verde (success) o roja (error)
      this.notificationElement = null;
    }
  
    createNotification() {
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
  }
  
  // Instancias 
  const descargaExitosa = new Notification('../img/emojis/like.png', '¡Descarga Exitosa!', 'success');
  descargaExitosa.showNotification();

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
  noExisteEnStock.showNotification();