export class ModalInput {
  constructor(title, confirmCallback, cancelCallback, defaultValue = '1', padre = 'body') {
    this._title = title;
    this._confirmCallback = confirmCallback;
    this._cancelCallback = cancelCallback;
    this._defaultValue = defaultValue;
    this._padre = document.querySelector(padre);
    this.createModal();
  }

  createModal() {
    this.agregarCss();

    // Crear el modal sólo si no existe
    const modal = document.querySelector('.modalInput');
    if (modal) {
      modal.remove();
    }

    this._modalElement = document.createElement("div");
    this._modalElement.classList.add("modalInput");

    this._modalElement.innerHTML = `
      <div class="modal-content">
        <h3 class="modal-message">${this._title}</h3>
        <input type="number" class="modal-input" value="${this._defaultValue}" />
        <div class="modal-actions">
          <button class="btn-cancel">Cancelar</button>
          <button class="btn-confirm">OK</button>
        </div>
      </div>
    `;

    // Funcionalidad a los botones
    this._modalElement.querySelector('.btn-cancel').addEventListener('click', () => {
      if (typeof this._cancelCallback === 'function') {
        this._cancelCallback();
      }
      this.closeModal();
    });

    this._modalElement.querySelector('.btn-confirm').addEventListener('click', () => {
      if (typeof this._confirmCallback === 'function') {
        const inputValue = this._modalElement.querySelector('.modal-input').value;
        this._confirmCallback(inputValue);
      }
      this.closeModal();
    }); 

    this._padre.appendChild(this._modalElement);

    // Enfocar y seleccionar el texto en el input
    const inputElement = this._modalElement.querySelector('.modal-input');
    inputElement.focus();
    inputElement.select(); 
  }

  closeModal() {
    if (this._modalElement) {
      this._modalElement.remove();
    }
  }

  agregarCss() {
    if (!document.querySelector('#modalInputStyles')) {
      const head = document.querySelector('head');
      const style = document.createElement('style');
      style.id = 'modalInputStyles';
      style.innerText = `
        .modalInput {
          width: 100%;
          height: 100%;
          display: block;
          position: fixed;
          z-index: 5;
          top: 0;
          left: 0;
          margin: auto;
          overflow: auto;
          background-color: rgba(0,0,0,0.6);
        }
        .modal-content {
          width: 80%;
          max-width: 300px;
          background-color: #ffffff;
          border: 1px solid #6810ad;
          margin: 45% auto;
          padding: 24px;
          border-radius: 28px;
          text-align: center;
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .modal-message {
          font-family: Roboto, sans-serif;
          font-size: 18px;
          line-height: 22px;
        }
        .modal-input {
          height: 48px;
          margin-top: 16px;
          padding: 8px;
          font-size: 18px;
          font-weight: 500;
          text-align: center;
          border-radius: 4px;
          border: 1px solid #6810ad;
        }
        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
          width: 100%;
          max-width: 250px;
          height: 48px;
          gap: 8px;
        }
        .btn-cancel, .btn-confirm {
          flex: 1;
          min-width: 110px;
          padding: 10px;
          border-radius: 28px;
          border: 1.5px solid #6810ad;
          text-align: center;
          height: 48px;
          font-size: 16px;
          font-weight: 500;
        }
        .btn-cancel {
          background-color: #dadada;
          color: #6810ad;
        }
        .btn-confirm {
          background-color: #6810ad;
          color: #fff;
        }
      `;
      head.appendChild(style);
    }
  }
}