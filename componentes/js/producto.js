export class Producto {
    constructor(id, nombre, codigoBarras, descripcion, precioVenta, stockMinimo, stock, activo) {
        this.id = id;
        this.nombre = nombre;
        this.codigoBarras = codigoBarras;
        this.descripcion = descripcion;
        this.precioVenta = precioVenta;
        this.stockMinimo = stockMinimo;
        this.stock = stock;
        this.activo = activo;
    }

    get nombre(){
        return this._nombre;
    }
    set nombre(value){
        this._nombre = value;
    }

    get codigoBarras(){
        return this._codigoBarras;
    }
    set codigoBarras(value){
        this._codigoBarras = value;
    }

    get descripcion(){
        return this._descripcion;
    }
    set descripcion(value){
        this._descripcion = value;
    }

    get precioVenta(){
        return this._precioVenta;
    }
    set precioVenta(value){
        if (value < 0) throw new Notification('../../../img/emojis/pare.png', 'El precio de venta no puede ser negativo.', 'error');
        this._precioVenta = value;
    }

    get stockMinimo(){
        return this._stockMinimo;
    }
    set stockMinimo(value){
        if (value < 0) throw new Notification('../../../img/emojis/pare.png', 'El stock mínimo no puede ser negativo.', 'error');
        this._stockMinimo = value;
    }

    get stock(){
        return this._stock;
    }
    set stock(value){
        this._stock = value;
    }

    get activo(){
        return this._activo;
    }
    set activo(value){
        this._activo = value;
    }

    // Convierto el objeto a JSON para almacenamiento
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            codigoBarras: this.codigoBarras,
            descripcion: this.descripcion,
            precioVenta: this.precioVenta,
            stockMinimo: this.stockMinimo,
            stock: this.stock,
            activo: this.activo
        };
    }

    // Método para crear una instancia de Producto desde un objeto JSON
    static fromJSON(json) {
        return new Producto(
            json.id,
            json.nombre,
            json.codigoBarras,
            json.descripcion,
            json.precioVenta,
            json.stockMinimo,
            json.stock,
            json.activo
        );
    }
}
