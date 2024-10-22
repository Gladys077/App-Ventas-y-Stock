
function loadView(view) {

    try {
            console.log(`cargando vista para depuración: ${view}`);
            document.body.innerHTML =""; // para limpiar contenido existente
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
                    case 'ventaactual':
                        import('./pages/ventaactual.js');
                        break;
                    case 'ventasdeldia':
                        import('./pages/ventasdeldia.js')
                        break;    
                    case 'ventasporvendedor':
                        import('./pages/ventasporvendedor.js')
                        break;
                    case 'ventasporfecha':
                        import('./pages/ventasporfecha.js')                       
                        break;            
                    case 'stock':
                        import('./pages/stock.js')
                        break;
                    case 'stockbajo':
                        import('./pages/stockbajo.js') //.then((module)=>{module.PlanillaStockBajo();})
                        break;
                    case 'stocksinmvto':
                        import('./pages/stocksinmvto.js') //.then((module)=>{module.PlanillaStockSinMvto();})
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

loadView("datoscomercio")


