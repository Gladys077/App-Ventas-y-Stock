export class CardBase {
    constructor(title, content) {
      this._title = title;
      this._content = content;
      this._element = null;

      this.armarCardBase();
    }
  
    armarCardBase() {
      this._element = document.createElement('div');
      this._element.className = 'card';
      
      const titleElement = document.createElement('h2');
      titleElement.textContent = this._title;
      titleElement.className = 'card-title';
      
      const contentElement = document.createElement('div');
      contentElement.innerHTML = this._content;
      contentElement.className = 'card-content';

      
      this._element.appendChild(titleElement);
      this._element.appendChild(contentElement);
      
      return this._element;
    }
  
    addButton(text, onClick) {
      const button = document.createElement('button');
      button.textContent = text;
      button.className = 'card-button';
      button.addEventListener('click', onClick);
      
      this._element.appendChild(button);
      
    }
  
    setStyle(styles) {
      if (this._element) {
        Object.assign(this._element.style, styles);
      }
    }

    updateContent(newContent) {
      if (this._element) {
        const contentElement = this._element.querySelector('.card-content');
        if (contentElement) {
          contentElement.innerHTML = newContent;
        }
      }
    }
  
    updateTitle(newTitle) {
      if (this._element) {
        const titleElement = this._element.querySelector('.card-title');
        if (titleElement) {
          titleElement.textContent = newTitle;
        }
      }
    }
  }

const miCard = new CardBase('Título de la card', 'DIA');
const mainElement = document.querySelector('main');
mainElement.appendChild(miCard.armarCardBase());

miCard.addButton('Buscar', () => console.log('Botón clicado'));



const inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.placeholder = 'DD/MM/AAAA';
inputElement.className = 'card-input';

