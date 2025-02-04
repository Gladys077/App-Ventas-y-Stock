
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
            script.id="viewScript";

            //se agrega lo siguiente para recuperar info de lista de productos de un pedido guardado
                const [viewName, params] = view.split("?");//extraigo nombre de la vista y cualquier otro parámetro agregado

            script.src = `./pages/${viewName}.js`;
            script.defer = true;


            script.onload = () => {
                console.log(`Script ${viewName}.js cargado`);
                const urlParams = new URLSearchParams(params);
                const Id = urlParams.get("id");
                
        
                // Crear la instancia de la vista correspondiente
                switch(viewName) {
                    case "pedidocopia":
                        import("./pages/pedidocopia.js")
                            .then((module) => {new module.PlanillaPedidoCopia(Id);                           
                        });
                        
                        break;

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
                        import('./pages/ventasxprodxfecha.js')                       
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
                    
                    case 'stockcargaxremito':
                        import('./pages/stockcargaxremito.js') 
                        .then((module) => {new module.PlanillaStockCargaxRemito(Id);                           
                        });    
                        break;

                    case 'perfilmenu':
                        import('../public/pages/perfilmenu.js')
                        break;



                    default:
                        console.error('Vista no encontrada');
                }
            };
    
            script.onerror = () => {
                console.error(`Error al cargar el script ${viewName}.js`);
                
            }

            document.head.appendChild(script);
            console.log("script nuevo creado");
            
    } catch (error) {
            
            console.error(`Error al cargar el script ${viewName}.js`);
    
    }
    
}

// Cargar la vista por defecto
// loadView("pedidoproximo")
// loadView("stocknuevoremito")
// loadView("ventasxprodxfecha")

// loadView("stockcargaxremito")

// loadView("formnuevoproveedor")
loadView("perfilnuevo")
// loadView("stock")