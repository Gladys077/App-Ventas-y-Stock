export class ModalInput {

    constructor( message = 'Cantidad', ConfirmCallback, padre='body') {
      this._message = message;
      this._confirmCallback = ConfirmCallback;
      this._cancelCallback;
      // this._modalElement;
      this._padre = document.querySelector(padre);
  
      this.createModal();
    }
    createModal() {
  
      this.agregarCss();
      // Crear el modal sólo si no existe
      const modal = document.querySelector('.modalDialogo')
      if (modal==null || modal==NaN || modal=={}) {
        this._modalElement = document.createElement("div");
        this._modalElement.classList.add("modalDialogo");
  
        this._modalElement.innerHTML = `
          <div class="modal-content">
            <h3 class="modal-message">${this._message}</h3>
            <div class="modal-actions">
              <button class="btn-cancel">Cancelar</button>
              <button class="btn-confirm">Confirmar</button>
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
        height: 48px;
        font-weight: 500;
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
  