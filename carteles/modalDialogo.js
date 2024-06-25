class ModalDialogo {
  constructor(icon, message, confirmCallback, cancelCallback) {
    this.icon = icon;
    this.message = message;
    this.confirmCallback = confirmCallback;
    this.cancelCallback = cancelCallback;
    this.modalElement = null; // Inicialmente, no hay modal creado
  }

  createModal() {
    // Crear el modal solo si no existe
    if (!this.modalElement) {
      this.modalElement = document.createElement("div");
      this.modalElement.classList.add("modalDialogo");

      this.modalElement.innerHTML = `
        <div class="modal-content">
          <div class="modal-icon">
            <img src="" alt="Icono" />
          </div>
          <h3 class="modal-message"></h3>
          <div class="modal-actions">
            <button class="btn-cancel">NO</button>
            <button class="btn-confirm">SI</button>
          </div>
        </div>
      `;

      // Funcionalidad a los btns
      this.modalElement.querySelector('.btn-cancel').addEventListener('click', () => {
        if (typeof this.cancelCallback === 'function') {
          this.cancelCallback();
        }
        this.closeModal();
      });

      this.modalElement.querySelector('.btn-confirm').addEventListener('click', () => {
        if (typeof this.confirmCallback === 'function') {
          this.confirmCallback();
        }
        this.closeModal();
      });

      // Añadir el modal al body
      document.body.appendChild(this.modalElement);
    }
  }

  updateModalContent(icon, message, confirmCallback, cancelCallback) {
    this.icon = icon;
    this.message = message;
    this.confirmCallback = confirmCallback;
    this.cancelCallback = cancelCallback;

    // Actualizar contenido del modal
    this.modalElement.querySelector('.modal-icon img').src = this.icon;
    this.modalElement.querySelector('.modal-message').textContent = this.message;
  }

  showModal() {
    if (!this.modalElement) {
      this.createModal();
    } else {
      this.updateModalContent(this.icon, this.message, this.confirmCallback, this.cancelCallback);
    }
    this.modalElement.style.display = 'block';
  }

  closeModal() {
    if (this.modalElement) {
      this.modalElement.style.display = 'none';
    }
  }
}

// Instancias:
const modalEliminarPedido = new ModalDialogo('emoji.png', '¿Deseas cancelar el pedido?', () => {
  console.log('Pedido cancelado');
  // Aquí pondría la lógica para cancelar el pedido
}, () => {
  console.log('Cancelado cancelar pedido');
});

const modalCerrarPedido = new ModalDialogo('emoji.png', '¿Deseas cerrar el pedido?', () => {
  console.log('Pedido cerrado');
  // Aquí coloco la lógica para guardar la info de la venta
}, () => {
  console.log('Cancelado cerrar pedido');
});

// Asignar los eventos a los botones:
document.querySelector('.btn_eliminarPedido').addEventListener('click', () => {
  modalEliminarPedido.showModal();
});

document.querySelector('.btn_FinalizarVenta').addEventListener('click', () => {
  modalCerrarPedido.showModal();
});
