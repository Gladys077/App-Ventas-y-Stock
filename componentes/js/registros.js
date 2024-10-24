export class MostrarMainNav{
    constructor(btn1,btn2,btn3,active1, active2, active3, btn1CallBack, btn2CallBack, btn3CallBack){
        this.btn1=btn1;
        this.btn2=btn2;
        this.btn3=btn3;
        this.active1=active1;
        this.active2=active2;
        this.active3=active3;
        this._btn1CallBack=btn1CallBack;
        this._btn2CallBack=btn2CallBack;
        this._btn3CallBack=btn3CallBack;


        this.element=this.agregarMostrarMainNav();
    }
    agregarMostrarMainNav = () =>{
        const contenedor = document.createElement("section");
            contenedor.className = "main-nav";

            const buttonL= document.createElement("button")
                buttonL.className="btn-left"
                buttonL.innerHTML=`<span>${this.btn1}</span>`
                buttonL.addEventListener("click", this._btn1CallBack || (()=>{console.log("click en btn 1");}))
                if(this.active1){buttonL.classList.add("_active")}
            
            const buttonC= document.createElement("button")
                buttonC.className="btn-center"
                buttonC.innerHTML=`<span>${this.btn2}</span>`
                buttonC.addEventListener("click", this._btn2CallBack || (()=>{console.log("click en btn 2");}))
                if(this.active2){buttonC.classList.add("_active")}
                
            const buttonR= document.createElement("button")
                buttonR.className="btn-right"
                buttonR.innerHTML=`<span>${this.btn3}</span>`
                buttonR.addEventListener("click", this._btn3CallBack || (()=>{console.log("click en btn 3");}))
                if(this.active3){buttonR.classList.add("_active")}


            contenedor.append(buttonL,buttonC,buttonR);
        return contenedor;    
    }
    getElement(){
        return this.element
    }
    // updateCallBacks(newCallback){
        
    // }

}/*fin class MostrarMainNav. Se utiliza en las planillas de: stock, stockbajo, stocksinmvto*/

export class FiltroFecha{
    constructor(){
        this.element=this.agregarFiltro();
    }
    agregarFiltro = ()=>{

        const filtroFecha = document.createElement("section");
            filtroFecha.className="contenedor-filtro-fecha";
                const fechaEncabezado = document.createElement("div");
                    fechaEncabezado.className="fechas-encabezado"    
                        const desde = document.createElement("h3");
                            desde.textContent="DESDE"
                        const hasta = document.createElement("h3");
                            hasta.textContent="HASTA"
                    fechaEncabezado.append(desde,hasta)    
                const fechaDatos = document.createElement("div");
                    fechaDatos.className="fechas-datos"
                    const desdeDato = document.createElement("input")
                        desdeDato.className="fecha-desde"    
                        desdeDato.type="date"
                    const hastaDato = document.createElement("input")
                        hastaDato.className="fecha-hasta"    
                        hastaDato.type="date"    
                    fechaDatos.append(desdeDato,hastaDato)
            filtroFecha.append(fechaEncabezado,fechaDatos);     
            return filtroFecha          
    }
    getElement(){
        return this.element
    }
}/*fin class FiltroFecha */

export class MostrarMontoTotal{
    constructor(){
        this.element=this.agregarMostrarMonto();
    }
    agregarMostrarMonto = (monto = "$ -,-") =>{
        const contenedor = document.createElement("section");
            contenedor.className = "contenedor-monto-total";
            
            const texto = document.createElement("span");
                texto.textContent = monto;
            contenedor.appendChild(texto);
        return contenedor;    
    }
    getElement(){
        return this.element
    }

}/*fin class MostrarMontoTotal */

export class MostrarVendedor{
    constructor(){
        this.element=this.agregarMostrarVendedor();
    }
    agregarMostrarVendedor = (vendedor= "VENDEDOR X") =>{
        const contenedor = document.createElement("section");
            contenedor.className = "contenedor-vendedor";
            
            const texto = document.createElement("span");
                texto.textContent = vendedor;
            contenedor.appendChild(texto);
        return contenedor;    
    }
    getElement(){
        return this.element
    }    
}/*fin class MostrarVendedor */

export class MostrarRemito{
    constructor(remito){
        
        this.element=this.agregarMostrarRemito();
    }
    agregarMostrarRemito = function (remito= "REMITO X")  {
        const contenedor = document.createElement("section");
            contenedor.className = "contenedor-datos-remito";
            
            const proveedor = document.createElement("p");
                proveedor.textContent = "Proveedor_"+remito.proveedor;
            const numero = document.createElement("p");
                numero.textContent = "Remito N°: " + remito.numero;   
            const fecha = document.createElement("p");
                fecha.textContent ="Fecha: " +remito.fecha;     


            contenedor.append(proveedor, numero, fecha);
        return contenedor;    
    }
    getElement(){
        return this.element
    }    

}/*fin class MostrarRemito. Se usa en la planilla stockCargaxRemito */

export  class TablaEncabezado{
    constructor(col1, col2, col3){
        this.col1=col1;
        this.col2=col2;
        this.col3=col3;
        this.element=this.agregarEncabezado(col1,col2,col3);
    }

    agregarEncabezado= (col1,col2,col3) => {
        const encabezado = document.createElement( "section");
        encabezado.className="tabla_encabezados";

        if(col1){
            const columna1 = document.createElement("h3");
            columna1.className="th";
            columna1.textContent=col1;
            encabezado.appendChild(columna1);

        }
        if(col2){
            const columna2 = document.createElement("h3");
            columna2.className="th";
            columna2.textContent=col2;
            encabezado.appendChild(columna2);
        }
        if(col3){
            const columna3 = document.createElement("h3");
            columna3.className="th";
            columna3.textContent=col3;
            encabezado.appendChild(columna3);
        }
        return encabezado;
    }/*fin agregarEncabezado */

    getElement(){
        return this.element
    }

}/*fin class TablaEncabezado. Se utiliza en todas las planillas*/

export class TablaDetalles{
    constructor() {
        this.element =  this.agregarDetalle();
        
    }
    agregarDetalle=()=>{
        const detalles = document.createElement("section");
        detalles.className = "tabla_detalles";
        return detalles
    }
    getElement(){
        return this.element;
    }
}/*fin class TablaDetalles. Se utiliza en todas las planillas*/

export class TablaFooter{
    constructor(total){
        this.total=total;
        this.element=this.agregarFooter(total);
    }
    agregarFooter= (total = "$ -,-")=>{
        const contenedor= document.createElement("section");
            contenedor.className="tabla_footer";
        const textTotal= document.createElement("h3");
            textTotal.className="total";
            textTotal.textContent="Total";
        const valorTotal= document.createElement("h3");
            valorTotal.className="valorTotal";
            valorTotal.textContent=total;    
        contenedor.append(textTotal,valorTotal);    
        return contenedor;    
    }//agregarFooter

    getElement(){
        return this.element
    }
}/*fin TablaFooter. Se utiliza en todas las planillas*/

// export class Pedidoactual {
//     constructor(item) {
//         this.element=this.agregarItem(item)
//     }

//     agregarItem = (item) =>{
        
        
//     // creando elementos y asignando clases    
//         const lineaArticulo = document.createElement("div");
//             lineaArticulo.className="tabla_lineaArticulo";
//         const cant = document.createElement("input");
//             cant.className("cant");
//         const producto = document.createElement("div");
//             producto.className="producto";
//         const precio = document.createElement("div");
//             precio.className="precio";

//     //asignar valor a celdas
//         cant.value = item.cant;
//         producto.textContent = item.producto;
//         precio.textContent = item.precio;
    
//     //agregar item a lineaArtículo    
//         lineaArticulo.append(cant, producto, precio);

//         return lineaArticulo

//     }
//     getElement(){
//         return this.element
//     }
// }/*fin  class Pedidoactual*/ 

export class Ventasdeldia{
    constructor(){
        this.element=this.agregarItem();
    }
    agregarItem =(item) =>{
            
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

        return lineaArticulo;

    }
    getElement(){
        return this.element
    }
    
}/*fin class Ventasdeldia*/

// export class Movimientosproducto{
//     constructor(item){
//         this.llamandoProducto(item);
//         this.element=this.agregarItem(item);
//     }

//     llamandoProducto = (item)=>{
//         const producto = document.querySelector(".nombreProducto")
//         //Asignando valor a producto
//         producto.textContent=item.producto;
//     }
//     agregarItem =(item) =>{
            
//     // creando elementos y asignando clases    
//         const lineaArticulo = document.createElement("div");
//             lineaArticulo.className="tabla_lineaArticulo";

//         const fecha = document.createElement("div");
//             fecha.className="fecha";
//         const cantidad = document.createElement("div");
//             cantidad.className="cantidad";

//     //asignar valor a celdas
//         fecha.textContent = item.fecha;
//         cantidad.textContent = item.cantidad;
    
//     //agregar item a lineaArtículo    
//         lineaArticulo.append(fecha,cantidad);
        
//     return lineaArticulo;

//     }
//     getElement(){
//         return this.element
//     }
// }/*fin class Movimientosproducto. Revisar como se llama el producto*/

export class Ventastotales{/*Falta desarrollar */
    constructor(){
        this.element=this.agregarItem(item);
    }
    llamandofecha=(item)=>{
        const contenedorFecha =document.querySelector(".contenedor-fecha-venta");
        const fecha = document.createElement("span");
        fecha.textContent= item.fecha;
        contenedorFecha.appendChild(fecha);
    }
    agregarItem =(item) =>{
            
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

    return lineaArticulo;

    }

    getElement(){
        return this.element
    }
    
}/*fin class Ventastotales. Revisar llamado de fechas*/

export class Ventasporvendedor{
    constructor(item, fecha){
        this.fecha=fecha

        this.llamandoVendedor(item);
        this.element=this.agregarItem(item);
    }

    llamandoVendedor = (item)=>{
        const contenedorVendedor = document.querySelector(".contenedor-vendedor")
        const vendedor = document.createElement("span");
        vendedor.textContent= item.vendedor;//colocar nombre celda como figura en tabla de bd
        contenedorVendedor.appendChild(vendedor)
    }
    
    agregarItem =(item) =>{
        
    // creando elementos y asignando clases    
        const lineaArticulo = document.createElement("div");
            lineaArticulo.className="tabla_lineaArticulo";
        
        const cantidad = document.createElement("div");
            cantidad.className="cantidad";
        const producto = document.createElement("div");
            producto.className="producto";
        const total = document.createElement("div");
            total.className="total"; 
        

    //asignar valor a celdas
        producto.textContent = item.producto;
        cantidad.textContent = item.cantidad;
        total.textContent = item.total;
    
    //agregar item a lineaArtículo    
        lineaArticulo.append(cantidad,producto, total);

    return lineaArticulo;

    }

    getElement(){
        return this.element
    }
}/*fin class ventasporvendedor Revisar*/

export class BtnFlotante{

    constructor(icon,classname,btnCallBack, texto){
        this.icon = icon;
        this.classname = classname;
        this.texto = texto;
        this.btnCallBack = btnCallBack;
        this.element=this.agregarBton();
    }
    agregarBton = () =>{
        const contenedor = document.createElement("div");
            contenedor.className = this.classname;
            const btn= document.createElement("img");
                btn.src= `../../img/iconos/${this.icon}.png`;
            contenedor.appendChild(btn);
            if(this.texto){
                const span = document.createElement("span");
                span.textContent=this.texto;
                contenedor.appendChild(span)
            }
            contenedor.addEventListener("click", this.btnCallBack)
        return contenedor;    
    }
    getElement(){
        return this.element
    }

}/*fin class BtnFlotante */