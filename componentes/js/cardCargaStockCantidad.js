import { Notification } from "./notification.js";

export class CardCargarStockCantidad {
  constructor(title, subtitle, cancelText, cargarText, showHeader = true) {
    this._title = title;
    this._subtitle = subtitle;
    this._inputCantidad = inputCantidad;
    this._cancelText = cancelText;
    this._cargarText = cargarText;
    this.element = this.armarCardCargarStockCantidad();
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
  get cancelText() {
    return this._cancelText;
  }
  set cancelText(cancelText) {
    this._cancelText = cancelText;
  }
  get cargarText() {
    return this._cargarText;
  }
  set cargarText(cargarText) {
    this._cargarText = cargarText;
  }
  setCancelCallback(callback) {
    this._cancelCallback = callback;
  }

  setCargarCallback(callback) {
    this._cargarCallback = callback;
  }
  getElement() {
    return this.element;
  }

  armarCardCargarStockCantidad() {
    this.agregarCss();

    this.element = document.createElement("div");
    this.element.className = "card";

    const header = document.createElement("div");
    header.className = "card-header";
    header.textContent = this._title;
    this.element.appendChild(header);

    const content = document.createElement("div");
    content.className = "card-content";

    const subtitle = document.createElement("p");
    subtitle.textContent = this._subtitle;
    subtitle.className = "card-subtitle";

    const input = document.createElement("input");
    input.type = "number";
    input.value = "1";
    input.className = "card-input";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = this._cancelText;
    cancelButton.className = "card-button-secondary";
    cancelButton.addEventListener("click", () => this._cancelCallback());

    const cargarButton = document.createElement("button");
    cargarButton.textContent = this._cargarText;
    cargarButton.className = "card-button-primary";
    cargarButton.addEventListener("click", () => this._cargarCallback());

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(cargarButton);

    content.appendChild(subtitle);
    content.appendChild(input);
    content.appendChild(buttonContainer);

    this.element.appendChild(content);

    return this.element;
  }



  agregarCss() {
    const head = document.querySelector("head");
    const style = document.createElement("style");
    style.innerText = `
:root {
    --primary-color: #6810AD;
    --secondary-color: #CAA5FB;
    --text-color: #333333;
    --background-color: #efefef;
    --text-claro: #fff;
    --color-hover: #9747FF;
    --fondo-monto: #DEC9FA;
}
.card {
    font-family: Roboto, sans-serif;
    background-color: var(--background-color);
    border-radius: 12px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin: 24px auto;
    width: 80%;
    max-width: 400px;
    text-align: center;
    padding-bottom: 4px;
}

.card-header {
    background-color: var(--primary-color);
    height: 48px;
    width: 100%;
    color: var(--text-claro);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
    line-height: 48px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.card-content {
    padding: 20px;
}

.card-subtitle {
    margin-bottom: 4px;
}

.card-input {
    border: 1px solid var(--secondary-color);
    border-radius: 50px;
    font-size: 18px;
    margin-bottom: 24px;
    padding: 8px;
    width: 80%;
    max-width: 250px;
    text-align: center;
    height: 48px;
}

.button-container {
    display: flex;
    justify-content: space-between;
    gap: 8px;
}

.card-button-secondary,
.card-button-primary {
    flex: 1;
    height: 48px;
    border-radius: 50px;
    cursor: pointer;
    margin: auto 4px;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
}

.card-button-secondary {
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
    color: #333;
}

.card-button-primary {
    background-color: var(--primary-color);
    color: white;
    cursor: pointer;
} `;
    head.appendChild(style);
  }
}
// Instancia
const miCard = new CardCantCargarStock(
  "Producto--bla-blabla",
  "Cantidad",
  "Cancelar",
  "Cargar"
);
miCard.setCancelCallback(() => console.log("Cancelar clicked"));
miCard.setCargarCallback(() => console.log("Cargar clicked"));

const mainElement = document.querySelector("main");
mainElement.appendChild(miCard.armarCardCantCargarStock());

