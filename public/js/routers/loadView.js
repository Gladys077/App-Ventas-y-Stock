function loadView(view) {

    try {
            console.log(`cargando vista para depuración: ${view}`);
            const body=document.body;
            body.innerHTML =""; // para limpiar contenido existente
            console.log("Contenido limpio");


        // Remover el script anterior si existe
            const oldScript = document.getElementById('viewScript');
            if (oldScript) {
                oldScript.remove();
                console.log("script antiguo eliminado");
            }
            
        //Para crear el nuevo script    
            let script = document.createElement('script');
            script.type="module";
            script.id="viewScript"
            script.src = `./pages/${view}.js`;
            script.defer = true;


            script.onload = () => {
                console.log(`Script ${view}.js cargado`);
        
                // Crear la instancia de la vista correspondiente
                switch(view) {
                    case 'stock':
                        new PlanillaStock();
                        break;
                    case 'stockbajo':
                        new PlanillaStockBajo();
                        break;
                    case 'stocksinmvto':
                        new PlanillaStockSinMvto();
                        break;
                    default:
                        console.error('Vista no encontrada');
                }
            };

            script.onerror = () => {
                console.error(`Error al cargar el script ${view}.js`);
            }

            document.head.appendChild(script);
            console.log("script nuevo creado");
            
    } catch (error) {
            
            console.error(`Error al cargar el script ${view}.js`);
    
    }
    
}

// Cargar la vista por defecto
// loadView('pedidoactual');

export const route = {
    loadView
}
