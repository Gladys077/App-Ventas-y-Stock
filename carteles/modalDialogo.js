 export class ModalDialogo {

  constructor(icon, message = 'Confirmar al accion',ConfirmCallback, padre='body') {
    this._icon = icon;
    this._message = message;
    this._confirmCallback = ConfirmCallback;
    this._cancelCallback;
    // this._modalElement;
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
      border: 1px solid var(--color-primario);
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
      background-color: var(--color-blanco);
      border-radius: 100%;
      box-shadow: 0px 4px 4px 0px var(--color-sombra);
      margin-top: -70px;
      margin-bottom: 24px;
  }
  .modal-icon img{
      height: 50px;
      width: 50px;
      margin-top: 22px;
  }
  .modal-message{
      font-family: Roboto, sans-serif;
      font-size: 18px;
  }
  .modal-actions{
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      width: 100%;
      max-width: 250px;
      height: 56px;
      gap: 8px;
  }
  .btn-cancel, .btn-confirm{
      flex: 1;
      min-width: 110px;
      padding: 16px;
      border-radius: 28px;
      border: 1px solid var(--color-primario);
      text-align: center;
  }
  .btn-cancel{
      background-color: var(--color-border-articulo);
      color: var(--color-primario);
  }
  .btn-confirm{
      background-color: var(--color-primario);
      color: var(--color-blanco);
  }
      `
    head.appendChild(style);
  }
}




