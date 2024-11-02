///CRUD PARA PROVEEDORES

async function listaproveedores(){
    try {
        const conexion = await fetch("http://localhost:3000/proveedores",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
            }
        })

        const respuesta = await conexion.json();
        return respuesta;
        
    } catch (error) {
        console.error(error)
        
    }
}


async function nuevoproveedor(nombre, lista=[], vendedor, cel, email,notas){
    const conexion = await fetch("http://localhost:3000/proveedores",{
        method:"POST" ,
        headers:{"Content-type":"application/json"},   
        body:JSON.stringify({
            nombre: nombre,
            lista: lista,
            vendedor:vendedor,
            cel: cel,
            email:email,
            notas:notas
            
        })
    })
    const conexionconvertida = await conexion.json();
    return conexionconvertida;
}

//CRUD PARA COMERCIO
async function nuevocomercio(nombre, inscripcion, direccion, email, contacto){
const conexion = await fetch("http://localhost:3000/comercios",{
method:"POST" ,
headers:{"Content-type":"application/json"},   
body:JSON.stringify({
    nombre: nombre,
    inscripcion: inscripcion,
    direccion:direccion,
    email:email,
    contacto: contacto
})
})
const conexionconvertida = await conexion.json();
return conexionconvertida;
}

//CRUD PARA PRODUCTOS________________________________________________________________________________
async function listaarticulos(){
    try {
        const conexion = await fetch("http://localhost:3000/productos",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
            }
        })

        const respuesta = await conexion.json();
        return respuesta;
        
    } catch (error) {
        console.error(error)
        
    }
}

//CRUD PARA VENTA ACTUAL________________________________________________________________________________
async function articulospedidos(){
    try {
        const conexion = await fetch("http://localhost:3000/venta",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
            }
        })

        const respuesta = await conexion.json();
        return respuesta;
        
    } catch (error) {
        console.error(error)
        
    }
}

async function nuevoarticulo(cant, producto, precio){
    const conexion = await fetch("http://localhost:3000/venta",{
        method:"POST" ,
        headers:{"Content-type":"application/json"},   
        body:JSON.stringify({
            cant: cant,
            producto:producto,
            precioUnitario:precio
            
        })
    })
    const conexionconvertida = await conexion.json();
    return conexionconvertida;
}

async function borrararticulo(id){
    const conexion = await fetch(`http://localhost:3000/venta/${id}`,{
        method:"DELETE" ,
        headers:{"Content-type":"application/json"}
    })
    const conexionconvertida = await conexion.json();
    return conexionconvertida;
}

async function actualizarCant(id){
    
    const conexion = await fetch(`http://localhost:3000/venta/${id}`,{
        method:"PATCH" ,
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            cant: cant                
        })

    })
    const conexionconvertida = await conexion.json();
    return conexionconvertida;
}

export const conexionAPI={
listaproveedores, nuevoproveedor, nuevocomercio, listaarticulos, articulospedidos, nuevoarticulo, borrararticulo, actualizarCant
}