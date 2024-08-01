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




export const conexionAPI={
    listaproveedores, nuevoproveedor
}