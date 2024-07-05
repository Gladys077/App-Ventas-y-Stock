 export class ModalDialogo {

  constructor(iconSrc, message = 'Confirmar la acción',ConfirmCallback, padre='body') {
    this._iconSrc = iconSrc;
    this._message = message;
    this._confirmCallback = ConfirmCallback;
    this._cancelCallback;
    // this._modalElement;
    this._padre = document.querySelector(padre);

    this.createModal();
  }
  createModal() {

    this.agregarCss();
    // Crear el modal solo si no existe
    const modal = document.querySelector('.modalDialogo')
    if (modal==null || modal==NaN || modal=={}) {
      this._modalElement = document.createElement("div");
      this._modalElement.classList.add("modalDialogo");

      this._modalElement.innerHTML = `
        <div class="modal-content">
          <div class="modal-icon">
            <img src="${this._iconSrc}" alt="Icono" />
          </div>
          <h3 class="modal-message">${this._message}</h3>
          <div class="modal-actions">
            <button class="btn-cancel">NO</button>
            <button class="btn-confirm">SI</button>
          </div>
        </div>
      `;

      // Funcionalidad a los btns
      this._modalElement.querySelector('.btn-cancel').addEventListener('click', () => this.closeModal());

      this._modalElement.querySelector('.btn-confirm').addEventListener('click', () => {
        if (typeof this._confirmCallback === 'function') {
          this._confirmCallback();
        }
        this.closeModal();
      });

      // Añadir el modal al padre
      this._padre.appendChild(this._modalElement);
    }
  }

  closeModal() {
    if (this._modalElement) {
     const padre = this._modalElement.parentNode;
     padre.removeChild(this._modalElement);
    }
  }

  agregarCss(){
    const head = document.querySelector('head');
    const style = document.createElement('style');
    style.innerText = `
      .modalDialogo {
      width: 100%;
      height: 100%;
      display: block;
      position: fixed;
      z-index: 5;
      margin: auto;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
  }
  .modal-content{
      width: 80%;
      max-width: 300px;
      background-color: #ffffff;
      border: 1px solid #6810ad;
      margin: 15% auto;
      padding: 24px;
      border-radius: 28px;
      text-align: center;
      z-index: 6;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .modal-icon{
      height: 100px;
      width: 100px;
      background-color: #ffffff;
      border-radius: 100%;
      box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
      margin-top: -70px;
      margin-bottom: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .modal-icon img{
      height: 65%;
      
  }
  .modal-message{
      font-family: Roboto, sans-serif;
      font-size: 18px;
      line-height: 22px;
  }
  .modal-actions{
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
      width: 100%;
      max-width: 250px;
      height: 48px;
      gap: 8px;
  }
  .btn-cancel, .btn-confirm{
      flex: 1;
      min-width: 110px;
      padding: 16px;
      border-radius: 28px;
      border: 1.5px solid #6810ad;
      text-align: center;
  }
  .btn-cancel{
      background-color: #dadada;
      color: #6810ad;
  }
  .btn-confirm{
      background-color: #6810ad;
      color: #fff;
  }
      `
    head.appendChild(style);
  }
}


// Instancias:
// new ModalDialogo('../img/emojis/cerrarSesion.png', '¿Deseas cerrar sesión?', () => {
//   alert('Cerrar sesión');
// });

// new ModalDialogo('../img/emojis/pensando.png', '¿Deseas cancelar el pedido?', () => {
//     alert('Ejecutando el callback 1. CANCELA EL PEDIDO');
//   });

// new ModalDialogo('../img/emojis/feliz.png', '¿Finalizamos la venta?', () => {
//     alert('Finaliza la venta, guardando el pedido y Resta los productos del Stock');
//     new Notification('../img/emojis/guiño.png', '¡Excelente, pedido finalizado!', 'success');
//   });

// new ModalDialogo('../img/emojis/pare.png', '¿Deseas salir sin guardar los cambios?', () => {
//     alert('Salió sin guardar');
//   });

// new ModalDialogo('../img/emojis/trash.png', '¿Estás seguro de eliminarlo?', () => {
//     alert('Elimina producto del stock');
//     new Notification('../img/emojis/trash.png', '¡Eliminaste el producto de tu stock!', 'success');
//   });

// new ModalDialogo('../img/emojis/pensando.png', `¿Seguro que deseas eliminar? Esta acción no se puede deshacer.`, () => {
//     alert('Elimina la Lista del Próximo Pedido');
//   });

//elimina un perfil
// new ModalDialogo('../img/emojis/trash.png', '¿Estás seguro de eliminarlo?', () => {
//     alert('Elimina un perfil');
//   });

