
export class Pedidoactual {
    constructor(item) {
        this.agregarItem(item)
    }

    agregarItem = (item) =>{
        
        const detalles = document.querySelector(".tabla_detalles")
    
    // creando elementos y asignando clases    
        const lineaArticulo = document.createElement("div");
            lineaArticulo.className="tabla_lineaArticulo";
        const cant = document.createElement("input");
            cant.className("cant");
        const producto = document.createElement("div");
            producto.className="producto";
        const precio = document.createElement("div");
            precio.className="precio";

    //asignar valor a celdas
        cant.value = item.cant;
        producto.textContent = item.producto;
        precio.textContent = item.precio;
    
    //agregar item a lineaArtículo    
        lineaArticulo.append(cant, producto, precio);

    //agregar lineaArticulo a detalles    
        detalles.appendChild(lineaArticulo);

    }
}/*fin  class Pedidoactual*/ 

export class Movimientodeldia{
    constructor(){

    }
    agregarItem =(item) =>{
        const detalles = document.querySelector(".tabla_detalles")
    
    // creando elementos y asignando clases    
        const lineaArticulo = document.createElement("div");
            lineaArticulo.className="tabla_lineaArticulo";

        const producto = document.createElement("div");
            producto.className="producto";
        const unidad = document.createElement("div");
            unidad.className="unidad";

    //asignar valor a celdas
        producto.textContent = item.producto;
        unidad.textContent = item.unidad;
    
    //agregar item a lineaArtículo    
        lineaArticulo.append(producto, unidad);

    //agregar lineaArticulo a detalles    
        detalles.appendChild(lineaArticulo);

    }
    
    
}/*fin class Movimientodeldia*/

export class Movimientosproducto{
    constructor(){

    }

    agregarItem =(item) =>{
        const detalles = document.querySelector(".tabla_detalles")
    
    // creando elementos y asignando clases    
        const lineaArticulo = document.createElement("div");
            lineaArticulo.className="tabla_lineaArticulo";

        const fecha = document.createElement("div");
            fecha.className="fecha";
        const cantidad = document.createElement("div");
            cantidad.className="cantidad";

    //asignar valor a celdas
        fecha.textContent = item.fecha;
        cantidad.textContent = item.cantidad;
    
    //agregar item a lineaArtículo    
        lineaArticulo.append(fecha,cantidad);

    //agregar lineaArticulo a detalles    
        detalles.appendChild(lineaArticulo);

    }
}/*fin class Movimientosproducto */