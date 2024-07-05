export class CardVtaPorVendedor {
    constructor(title, subtitle, textBtn, onClick) {
        this._title = title;
        this._subtitle = subtitle;
        this._textBtn = textBtn;
        this._onClick = onClick;
        this._element = null;

      this.armarCardVtaPorVendedor();
    }
  
    armarCardVtaPorVendedor() {
      this._element = document.createElement('div');
      this._element.className = 'card';
      
      const titleElement = document.createElement('h2');
      titleElement.textContent = this._title;
      titleElement.className = 'card-title';

      const subtitle = document.createElement('h3');
      subtitle.textContent = this._subtitle;
      subtitle.className = '.dia';
      
      const input = document.createElement('input');
      input.placeholder = 'DD/MM/AAAA';
      input.className = 'card-input';

      const button = document.createElement('button');
      button.textContent = this._textBtn;
      button.className = 'card-button';
      button.addEventListener('click', this._onClick);

      const monto = document.createElement('div');
      monto.textcontent = this._monto || '';
      monto.className = 'card-monto';  

      const verListado = document.createElement('a');
      verListado.textContent = "Ver listado";
      verListado.className = 'card-link';
      verListado.href = "#";
      verListado.addEventListener('click', () => {
        //Aquí va el código que muestra el listado
        console.log('Mostrar listado');
      });
      
      this._element.appendChild(titleElement);
      this._element.appendChild(subtitle);
      this._element.appendChild(input);
      this._element.appendChild(button);
      this._element.appendChild(monto);
      this._element.appendChild(verListado);
      
      return this._element;
  }
}


    function onClick(){
        console.log('btn clickeado');
    }

const miCard = new CardVtaPorVendedor('nombre_del_vendedor', 'DIA', 'Buscar', onClick);
const mainElement = document.querySelector('main');
mainElement.appendChild(miCard.armarCardVtaPorVendedor());

// miCard.addButton('Buscar', () => console.log('Botón clickeado'));




