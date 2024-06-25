 
 
export class ModalDialogo {

  constructor(icon, message = 'Confirmar al accion',ConfirmCallback, padre='body') {
    this._icon = icon;
    this._message = message;
    this._confirmCallback = ConfirmCallback;
    this._cancelCallback;
    this._modalElement;
    this._padre = document.querySelector(padre);

    this.createModal();
  }
  createModal() {
    // Crear el modal solo si no existe
    const modal = document.querySelector('.modalDialogo')
    if (modal==null || modal==NaN || modal=={}) {
      this._modalElement = document.createElement("div");
      this._modalElement.classList.add("modalDialogo");

      this._modalElement.innerHTML = `
        <div class="modal-content">
          <div class="modal-icon">
            <img src="" alt="Icono" />
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
}




