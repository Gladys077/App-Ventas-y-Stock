
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

export class Ventasdeldia{
    constructor(){

    }
    agregarItem =(item) =>{
        const detalles = document.querySelector(".tabla_detalles")
    
    // creando elementos y asignando clases    
        const lineaArticulo = document.createElement("div");
            lineaArticulo.className="tabla_lineaArticulo";

        const producto = document.createElement("div");
            producto.className="producto";
        const cantidad = document.createElement("div");
            cantidad.className="cantidad";

    //asignar valor a celdas
        producto.textContent = item.producto;
        cantidad.textContent = item.cantidad;
    
    //agregar item a lineaArtículo    
        lineaArticulo.append(producto, cantidad);

    //agregar lineaArticulo a detalles    
        detalles.appendChild(lineaArticulo);

    }
    
    
}/*fin class Ventasdeldia*/

export class Movimientosproducto{
    constructor(item){
        this.llamandoProducto(item);
        this.agregarItem(item);
    }

    llamandoProducto = (item)=>{
        const producto = document.querySelector(".nombreProducto")
        //Asignando valor a producto
        producto.textContent=item.producto;
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

export class Ventastotales{/*Falta desarrollar */
    constructor(){

    }
    llamandofecha=(item)=>{
        const contenedorFecha =document.querySelector(".contenedor-fecha-venta");
        const fecha = document.createElement("span");
        fecha.textContent= item.fecha;
        contenedorFecha.appendChild(fecha);
    }
    agregarItem =(item) =>{
        const detalles = document.querySelector(".tabla_detalles")
    
    // creando elementos y asignando clases    
        const lineaArticulo = document.createElement("div");
            lineaArticulo.className="tabla_lineaArticulo";

        const producto = document.createElement("div");
            producto.className="producto";
        const cantidad = document.createElement("div");
            cantidad.className="cantidad";

    //asignar valor a celdas
        producto.textContent = item.producto;
        cantidad.textContent = item.cantidad;
    
    //agregar item a lineaArtículo    
        lineaArticulo.append(producto, cantidad);

    //agregar lineaArticulo a detalles    
        detalles.appendChild(lineaArticulo);

    }
    
    
}/*fin class Ventastotales*/

export class Ventasporvendedor{
    constructor(item, fecha){
        this.fecha=fecha

        this.llamandoVendedor(item);
        this.agregarItem(item);
    }

    llamandoVendedor = (item)=>{
        const contenedorVendedor = document.querySelector(".contenedor-vendedor")
        const vendedor = document.createElement("span");
        vendedor.textContent= item.vendedor;//colocar nombre celda como figura en tabla de bd
        contenedorVendedor.appendChild(vendedor)
    }
    
    agregarItem =(item) =>{
        const detalles = document.querySelector(".tabla_detalles")
        // const fecha = document.querySelector(".fecha-consulta").value
        
    // creando elementos y asignando clases    
        const lineaArticulo = document.createElement("div");
            lineaArticulo.className="tabla_lineaArticulo";

        const producto = document.createElement("div");
            producto.className="producto";
        const cantidad = document.createElement("div");
            cantidad.className="cantidad";

    //asignar valor a celdas
        producto.textContent = item.producto;
        cantidad.textContent = item.cantidad;
    
    //agregar item a lineaArtículo    
        lineaArticulo.append(producto, cantidad);

    //agregar lineaArticulo a detalles    
        detalles.appendChild(lineaArticulo);

    }
}/*fin class ventasporvendedor */