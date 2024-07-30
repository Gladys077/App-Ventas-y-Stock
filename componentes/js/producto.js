export class Producto {
    constructor(id, nombre, codigoBarras, descripcion, precioVenta, stockMinimo, stock, activo, ventas = []) {
        this._id = id;
        this._nombre = nombre;
        this._codigoBarras = codigoBarras;
        this._descripcion = descripcion;
        this._precioVenta = precioVenta;
        this._stockMinimo = stockMinimo;
        this._stock = stock;
        this._activo = activo;
        this._ventas = ventas;
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

    get ventas() {
        return this._ventas;
    }
    set ventas(value) {
        this._ventas = value;
    }

    // Convierto el objeto a JSON para almacenamiento
    toJSON() {
        return {
            id: this._id,
            nombre: this._nombre,
            codigoBarras: this._codigoBarras,
            descripcion: this._descripcion,
            precioVenta: this._precioVenta,
            stockMinimo: this._stockMinimo,
            stock: this._stock,
            activo: this._activo,
            ventas: this._ventas
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
            json.activo, 
            json.ventas || []
        );
    }
}


