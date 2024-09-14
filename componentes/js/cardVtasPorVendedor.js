import { isValidDate, formatDateInput, verificarCss } from '../js/utils.js';
import { Notification } from '../js/notificacion.js';
import { navigateToPage } from '../js/navigateToPage.js';

export class CardVtasPorVendedor {
  
  constructor(title, subtitle, textBtn, page = 'MenuVentas') {
      // this._vendedores = vendedores;  // Lista de vendedores
      this._title = title;
      this._subtitle = subtitle;
      this._fecha = null;
      this._textBtn = textBtn;
      this._selectedVendedor = null;
      this._monto = '';
      this._page = page;
      this.element = this.armarCardVtasPorVendedor();
      this.actualizarListaVendedores(this._vendedores);  // Llamada para actualizar la lista
      if (!verificarCss('vendedor-select')) this.agregarCss();

  }

  get title() {
    return this._title;
  }
  set title(title) {
    this._title = title;
  }
  get subtitle() {
    return this._subtitle;
  }
  set subtitle(subtitle) {
    this._subtitle = subtitle;
  }
  get textBtn() {
    return this._textBtn;
  }
  set textBtn(textBtn) {
    this._textBtn = textBtn;
  }
  getElement() {
    return this.element;
  }

  agregarCss(){
    const style = document.createElement('style');
    style.textContent = `
    
      .card { 
        background-color: var(--background-color);
        border-radius: 12px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        margin: 24px auto;
        width: calc(100vw - 32px);
        max-width: 400px;
        text-align: center;
        padding-bottom: 24px;

        .card-title {
          background-color: var(--primary-color);
          min-height: 48px;
          height: auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.5px;
          line-height: 1.4;
          padding: 4px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          margin-bottom: 16px;
          color: var(--text-claro);
        }

        .vendedor-select {
          width: 100%;
          height: 48px;
          padding: 0 12px;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          transition: border-color 0.3s;
          appearance: none;
          background-image: url('data:image/svg+xml;utf8,<svg fill="%236810AD" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
          background-repeat: no-repeat;
          background-position: right 12px center;
          min-width: 100%;
          border: 2px solid var(--primary-color);
          margin-bottom: 16px;
          text-align: center;

          &.selected {
            background-color: var(--primary-color);
            color: white;
            font-weight: 500;
          }
        }

        .dia {
          font-size: 16px;
        }

        .desdeHasta {
          font-size: 16px;
          margin-bottom: 4px;
        }

        .card-input {
          border: 1px solid var(--secondary-color);
          border-radius: 50px;
          font-size: 18px;
          margin-bottom: 24px;
          padding: 8px;
          height: 48px;
          width: 80%;
          max-width: 250px;
          text-align: center;
        }

        .card-button {
          height: 48px;
          width: 80%;
          max-width: 250px;
          background-color: var(--primary-color);
          border: none;
          border-radius: 50px;
          color: var(--text-claro);
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          padding: 8px 16px;

          &:hover {
            background-color: var(--color-hover);
          }

          &:active {
            transform: scale(90%);
          }
        }

        .card-monto {
          height: 48px;
          min-width: 150px;
          max-width: 210px;
          width: 75%;
          background-color: var(--fondo-monto);
          color: var(--text-color);
          display: block;
          font-size: 12px;
          margin: 36px auto;
          text-align: center;
          align-items: center;
        }

        .card-link {
          color: var(--primary-color);
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          display: block;
          margin-top: 24px;
          margin-bottom: 8px;

          &:hover {
            color: var(--color-hover);
          }

          &:active {
            transform: scale(90%);
          }
        }
      }

      .cuadroInferior {
        width: 200px;
        padding: 8px;
        border-radius: 4px;
        margin: auto;

        .headerCuadroInferior {
          background-color: var(--color-hover);
          color: #fff;
          padding: 4px;
          border-radius: 4px 4px 0 0;
          margin-top: 16px;
          font-size: 14px;
        }

        .boxCuadroInferior {
          display: block;
          border-radius: 0 0 4px 4px;
          font-size: 16px;
          font-weight: 500;
          color: var(--primary-color);
          margin: auto;
          border: 1px solid var(--color-hover);
          height: 48px;
          background-color: white;
          line-height: 48px;
        }
      }

    `
    document.head.appendChild(style);
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
    verListado.addEventListener('click', (e) => {
      e.preventDefault(); // Previene la navegación por defecto
      navigateToPage(this._page);
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

  actualizarListaVendedores(vendedores) {
    // Limpiar las opciones existentes
    this.select.innerHTML = '';

    // Añadir la opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Elige el vendedor';
    this.select.appendChild(defaultOption);

    // Añadir las nuevas opciones de vendedores
    // vendedores.forEach(vendedor => {
    //   const option = document.createElement('option');
    //   option.textContent = vendedor;
    //   this.select.appendChild(option);
    // });

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
