export class Producto {
    constructor(id, nombre, proveedor, costo, porcentaje, stockMinimo, stock = 0, activo = true) {
        this.id = id; 
        this.nombre = nombre; 
        this.proveedor = proveedor; 
        this.costo = costo; 
        this.porcentaje = porcentaje; 
        this.stockMinimo = stockMinimo; 
        this.stock = stock; 
        this.activo = activo; 
    }

    get nombre(){
        return this._nombre;
    }
    set nombre(value){
        this._nombre = value
    }

    get proveedor(){
        return this._proveedor;
    }
    set proveedor(value){
        this._proveedor = value;
    }

    get costo(){
        return this._costo;
    }
    set costo(value){
        if (value < 0) throw new Notification('../../../img/emojis/pare.png', 'El costo no puede ser negativo.', 'error');
        this._costo = value;
    }

    get porcentaje(){
        return this._porcentaje;
    }
    set porcentaje(value){
        this._porcentaje = value
    }

    get stockMinimo(){
        return this._stockMinimo;
    }
    set stockMinimo(value){
        if (value < 0) throw new Notification('../../../img/emojis/pare.png', 'El stock mínimo no puede ser negativo.', 'error');
        this._stockMinimo = value;
    }

    calcularPrecioVenta() {
        return this._costo * (1 + this._porcentaje / 100);
    }

    // Método para convertir el objeto a JSON para almacenamiento
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            proveedor: this.proveedor,
            costo: this.costo,
            porcentaje: this.porcentaje,
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
            json.proveedor,
            json.costo,
            json.porcentaje,
            json.stockMinimo,
            json.stock,
            json.activo
        );
    }
}