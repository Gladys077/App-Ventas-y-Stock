import {ModalDialogo} from './modalDialogo.js';
import {Notification} from './notification.js';




// Instancias:
new ModalDialogo('emoji.png', '¿Deseas cancelar el pedido?', () => {
    alert('Ejecutando el callback 1');
  new Notification(null,'listo')
  });