import { isValidDate, formatDateInput } from './utils.js';
import { Notification } from './notificacion.js';

export class CardVtasPorVendedor {
  constructor(title, subtitle, textBtn, onSearch) {
      this._title = title;
      this._subtitle = subtitle;
      this._fecha = null;
      this._textBtn = textBtn;
      this._onSearch = onSearch;
      this._selectedVendedor = null;
      this._monto = '';
      this.element = this.armarCardVtasPorVendedor();
  }
  get title(){
    return this._title;
  }
  set title(title){
    this._title = title;
  }
  get subtitle(){
    return this._subtitle;
  }
  set subtitle(subtitle){
    this._subtitle = subtitle;
  }
  get textBtn(){
    return this._textBtn;
  }
  set textBtn(textBtn){
    this._textBtn = textBtn;
  }
  getElement() {
    return this.element;
}

  armarCardVtasPorVendedor() {
      this.element = document.createElement('div');
      this.element.className = 'card';

      // Crear contenedor para el select
      const selectContainer = document.createElement('div');
      selectContainer.className = 'select-container';

      // Crear el select
      this.select = document.createElement('select');
      this.select.className = 'vendedor-select';

      // Opciones del select
      const options = ['Elige el vendedor', 'Lionel Messi'];
      options.forEach(optionText => {
          const option = document.createElement('option');
          option.textContent = optionText;
          option.className = 'option';
          this.select.appendChild(option);
      });

      // Evento para el cambio de selección
      this.select.addEventListener('change', () => {
          this.select.querySelectorAll('option').forEach(option => {
              option.classList.remove('selected-option');
          });
          const selectedOption = this.select.options[this.select.selectedIndex];
          selectedOption.classList.add('selected-option');
          this._selectedVendedor = this.select.selectedIndex > 0 ? selectedOption.textContent : null;
          if (this.select.selectedIndex > 0) {
              this.select.classList.add('selected');
          } else {
              this.select.classList.remove('selected');
          }
      });

      // Añadir el select al contenedor
      selectContainer.appendChild(this.select);

      // Resto de elementos de la card
      const subtitle = document.createElement('h3');
      subtitle.textContent = this._subtitle;
      subtitle.className = '.dia';
      
      this.input = document.createElement('input');
      this.input.placeholder = 'DD/MM/AAAA';
      this.input.className = 'card-input';
      this.input.addEventListener('input', formatDateInput);
      this.input.addEventListener('blur', (e) => this.handleDateChange(e));

      const button = document.createElement('button');
      button.textContent = this._textBtn;
      button.className = 'card-button';
      button.addEventListener('click', () => this.handleButtonClick());

      const monto = document.createElement('div');
      monto.textContent = this._monto || '';
      monto.className = 'card-monto';  

      const verListado = document.createElement('a');
      verListado.textContent = "Ver listado";
      verListado.className = 'card-link';
      verListado.href = "#";
      verListado.addEventListener('click', () => {
          console.log('Mostrar listado');
      });
      
      // Añade todos los elementos al contenedor principal de la card
      this.element.appendChild(selectContainer);
      this.element.appendChild(subtitle);
      this.element.appendChild(this.input);
      this.element.appendChild(button);
      this.element.appendChild(monto);
      this.element.appendChild(verListado);
      
      return this.element;
  }
  
  handleDateChange(e) {
    const value = e.target.value;
    if (value && !isValidDate(value)) {
        // new Notification('../../img/emojis/mueca.png', 'Fecha inválida. Use el formato DD/MM/AAAA', 'error');
        e.target.value = '';
        this._fecha = null;
    } else {
        this._fecha = value;
    }
  }

  handleButtonClick() {
    if (!this._selectedVendedor) {
        new Notification('../../img/emojis/pensando.png', '¿Has elegido un vendedor?', 'error');
        return;
    }
    if (!this._fecha) {
        new Notification('../../img/emojis/pare.png', '¡Ingresa una fecha válida!', 'error');
        return;
    }
    // Si ambos están seleccionados, procede con la búsqueda
    this._onSearch(this._selectedVendedor, this._fecha);
  }

}

