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

//CRUD PARA PEDIDOS________________________________________________________________________________
        async function listapedidos(){
            try {
                const conexion = await fetch("http://localhost:3000/pedidos",{
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

        async function obtenerpedido(id){
            try {
                const conexion = await fetch(`http://localhost:3000/pedidos/${id}`,{
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

        async function crearpedido(datos){
            try {
                const conexion = await fetch("http://localhost:3000/pedidos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                    });
                const conexionconvertida = await conexion.json();
                return conexionconvertida;    
            } catch (error) {
                console.error(error)
            }
        }

        async function actualizarPedido(id, descripcion){
            try {
                const conexion = await fetch(`http://localhost:3000/pedidos/${id}`,{
                    method:"PATCH" ,
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify({
                        descripcion: `${descripcion}`               
                    })
        
                })
                if (!conexion.ok) {
                    throw new Error(`Error: ${conexion.status} ${conexion.statusText}`);
                } else {
                    console.log('Actualización exitosa en db.json');
                }
            } catch (error) {
                console.error('Hubo un problema al actualizar el pedido:', error);
            }

        }

        async function borrarpedido(id){
            const conexion = await fetch(`http://localhost:3000/pedidos/${id}`,{
                method:"DELETE" ,
                headers:{"Content-type":"application/json"}
            })
            const conexionconvertida = await conexion.json();
            return conexionconvertida;
        }

//CRUD PARA PRODUCTOS___________________________________________________________________________________        
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
    listaproveedores, nuevoproveedor, nuevocomercio, listapedidos, obtenerpedido, crearpedido, actualizarPedido, borrarpedido, listaarticulos, articulospedidos, nuevoarticulo, borrararticulo, actualizarCant
}