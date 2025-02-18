import { CardVtasPorProducto } from './cardVtasPorProducto.js';
import { Notification } from '../js/notificacion.js';
import { navigateToPage } from '../js/navigateToPage.js';

export class CardVtasPorFecha extends CardVtasPorProducto {
    constructor(title, textBtn, onClick, includeUnidadesVendidas = true, cuadroInferiorTitulo = "Importe facturado", linkText = "Listado por fecha", page = 'ventasxFecha-Listado') {
        super(title, textBtn, onClick, includeUnidadesVendidas, cuadroInferiorTitulo, linkText, page);
    }
    
    // Sobrescribe el método que arma la card para ocultar el título del producto
    armarCardVtasPorProducto() {
        const card = super.armarCardVtasPorProducto();
        // const titleEl = card.querySelector('.card-title');
        // if (titleEl) {
        //     titleEl.style.display = 'none';
        // }
        return card;
    }
    
    // Sobrescribe el método handleClick para validar las fechas y sumar todas las ventas en el rango seleccionado
    handleClick() {
        // Obtiene las fechas desde los inputs (usando los contenedores creados en createDateInput)
        this._fechaDesde = this.desdeInput.querySelector('input').value;
        this._fechaHasta = this.hastaInput.querySelector('input').value;
        
        // Validar que se haya elegido la fecha DESDE
        if (!this._fechaDesde) {
            new Notification('../../img/emojis/señalar.png', '¡Le faltó elegir la primer fecha!', 'error');
            return;
        }
        
        // Validar que, si se eligió HASTA, no sea anterior a DESDE
        if (this._fechaHasta && this._fechaHasta < this._fechaDesde) {
            new Notification('../../img/emojis/error.png', 'La fecha HASTA no puede ser anterior a la fecha DESDE.', 'error');
            return;
        }
        
        // Busca en la base de datos (localStorage) todas las ventas en el rango de fechas
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        let totalVentas = 0;
        let ventasFiltradas = [];
        
        // Convertir las fechas de los inputs a objetos Date (el input tipo date da formato "YYYY-MM-DD")
        const fechaDesdeObj = new Date(this._fechaDesde);
        const fechaHastaObj = this._fechaHasta ? new Date(this._fechaHasta) : null;
        
        productos.forEach(producto => {
            if (producto.ventas) {
                producto.ventas.forEach(venta => {
                    const fechaVenta = new Date(venta.fecha);
                    if (fechaVenta >= fechaDesdeObj && (!fechaHastaObj || fechaVenta <= fechaHastaObj)) {
                        totalVentas += venta.cantidad;
                        ventasFiltradas.push(venta);
                    }
                });
            }
        });
        
        this.ventasFiltradas = ventasFiltradas;
        
        // Si no se encontraron ventas en el rango, se muestra eta notificación
        if (ventasFiltradas.length === 0) {
            new Notification('../../img/emojis/triste.png', 'No hubo ventas en esas fechas.', 'error');
            return;
        }
        
        // Actualiza el modo y el botón
        this._includeUnidadesVendidas = true;
        this.button.textContent = 'Borrar';
        this._isBuscarMode = false;
        
        // Muestra el total de ventas en el cuadro inferior
        this.mostrarTotalVentas(totalVentas);
    }
    
    // Método para crear o actualizar el cuadro inferior con el total de ventas
    mostrarTotalVentas(total) {
        if (!this.element.querySelector('.cuadroInferior')) {
            const cuadroInferior = document.createElement('div');
            cuadroInferior.className = 'cuadroInferior';
  
            const headerCuadroInferior = document.createElement('div');
            headerCuadroInferior.textContent = this._cuadroInferiorTitulo;
            headerCuadroInferior.className = 'headerCuadroInferior';
  
            const boxCuadroInferior = document.createElement('span');
            boxCuadroInferior.className = 'boxCuadroInferior';
            boxCuadroInferior.textContent = total;
  
            cuadroInferior.appendChild(headerCuadroInferior);
            cuadroInferior.appendChild(boxCuadroInferior);
  
            this.element.insertBefore(cuadroInferior, this.element.lastElementChild);
        } else {
            const box = this.element.querySelector('.boxCuadroInferior');
            if (box) box.textContent = total;
        }
    }
}
