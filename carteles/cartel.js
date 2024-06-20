class ModalDialogo {
  constructor(icon, message, confirmCallback) {
    this.icon = icon;
    this.message = message;
    this.confirmCallback = confirmCallback;
    this.modalElemento = null; //REVISAR!!!
  }
  createModal() {
    //Este es el container del modal
    this.modalElement = document.createElement("div");
    this.modalElement.classList.add("modal");

    //Este es el contenido del modal
    this.modalElement.innerHTML = `
        <div class="modal-content">
          <div class="modal-icon">
            <img src="${this.icon}" alt="Icono" />
          </div>
          <h3 class="modal-message">${this.message}</h3>
          <div class="modal-actions">
            <button class="btn-cancel">NO</button>
            <button class="btn-confirm">SI</button>
          </div>
        </div>
      `;

      //Funcionalidad a los btns
      this.modalElement.querySelector('.btn-cancel').addEventListener('click', () => this.closeModal());
      this.modalElement.querySelector('.btn-confirm').addEventListener('click', () => {
        if (typeof this.confirmCallback === 'function') {
            this.confirmCallback();
        }
        this.closeModal();
      });

      document.getElementById('cartel-container').appendChild(this.modalElement);
    }

    showModal() {
        this.createModal();
        this.modalElement.style.display = 'block';
    }

    closeModal() {
        if (this.modalElement){
            this.modalElement.style.display = 'none';
            this.modalElement.remove();
        }
    }
}

//Para BORRAR UN ARTICULO:
const modalBorrarArticulo = new Cartel('emoji.png', '¿Deseas borrar este artículo?', () => {
    console.log('Artículo borrado');
    //Aquí pondría la lógica para borrar el artículo
});

//Muestro el modal
modalBorrarArticulo.showModal();

//Creo instancia de un modal para finalizar venta
const modalFinalizarVenta = new Cartel('emoji.png', '¿Deseas finalizar la venta?', () => {
    console.log('Venta finalizada');
    //aquí coloco la lógica para finalizar la venta
});

modalFinalizarVenta.showModal();