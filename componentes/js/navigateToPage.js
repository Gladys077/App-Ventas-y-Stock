export function navigateToPage(page) {
/*
    window.history.pushState(null, '', `/${page}`); // Esto muestra la página en el navegador
    */
    const contenedorPrincipal = document.querySelector(".contendorPrincipal");
    if(contenedorPrincipal) contenedorPrincipal.innerHTML = '';

    const [pageName,params] = page.split("?");

    const urlParams = new URLSearchParams(params)
    const Id = urlParams.get("id");

    switch(pageName) {
        //---------------Primeras Páginas
        case 'Login':
            import('../pages/PrimerasPaginas/LoginPage.js').then(module => {
                new module.createLoginPage();
            });
            break;
        case 'RecoverPassword':
            import('../pages/PrimerasPaginas/recuperarPassword.js').then(module => {
                new module.RecoverPasswordPage();
            });
            break;
        case 'cambioDePassword':
            import('../pages/PrimerasPaginas/cambioDePassword.js').then(module => {
                new module.ChangePassword();
            });
            break;
        case 'Config':
            import('../pages/PrimerasPaginas/configuracion.js').then(module => {
                new module.ConfigurationPage();
            });
            break;
        case 'DatosDelComercio':
            import('../pages/PrimerasPaginas/datoscomercio.js').then(module => {
                new module.DatosComercio();
            });
            break;
            
        //----------------Sección Ventas
        case 'MenuVentas':
            import('../pages/SeccionVentas/pageMenuVentas.js').then(module => {
                new module.PageMenuVentas();
            });
            break;
        case 'BuscadorParaVender':
            import('../pages/SeccionVentas/venderBuscador.js').then(module => {
                new module.VenderProductSearchPage();
            });
            break;
        case 'ventaActual': //LU
            import('../pages/SeccionVentas/ventaactual.js').then(module => {
                new module.PlanillaVentaActual();
            });
            break;



      case 'VentasDelDia': //LU
            import('../pages/SeccionVentas/ventasdeldia.js').then(module => {
                new module.PlanillaVtasdelDia();
            });
            break;



        case 'VentasPorVendedor':
            import('../pages/SeccionVentas/ventasPorVendedor.js').then(module => {
                new module.VentasPorVendedorPage();
            });
            break;
        case 'VentasPorVendedorPlanilla': //LU
            import('../pages/SeccionVentas/ventasPorVendedorPlanilla.js').then(module => {
                new module.PlanillaVtasxVendedor();
            });
            break;



        case 'ventasPorProducto': 
            import('../pages/SeccionVentas/ventasPorProducto.js').then(module => {
                new module.ProductosVendidos();
            });
            break;

        case 'VentasXProdXFecha': //Lu
            import('../pages/SeccionVentas/ventasxprodxfecha.js').then(module => {
                new module.PlanillaVtasxFecha();
            });
            break;
            


        case 'VentasPorFecha':
            import('../pages/SeccionVentas/ventasPorFechaPage.js').then(module => {
                new module.VentasPorFechaPage();
            });
            break;

        case 'ventasxFecha-Listado':
                import('../pages/SeccionVentas/ventasxFecha-Listado.js').then(module => {
                    new module.PlanillaVtasPorFecha();
                });
                break;
    

        //------------------Sección STOCK



        case 'MenuStock':
            import('../pages/SeccionStock/menuDeStock.js').then(module => {
                new module.MenuStockPage();
            });
            break;

        case 'MenuCargaDeStock':
            import('../pages/SeccionStock/menuCargaDeStock.js').then(module => {
                new module.CargaDeStock();
            });
            break;    
            


        case 'StockCargaXProducto':
            import('../pages/SeccionStock/cargaStockBuscador.js').then(module => {
                new module.CargarStockSearchPage();
            });
            break;



        case 'StockNuevoRemito': 
            import('../pages/SeccionStock/stocknuevoremito.js').then(module => {
                new module.NuevoRemito();
            });
            break;
        case 'StockCargaXRemito': 
            import('../pages/SeccionStock/stockcargaxremito.js').then(module => {
                new module.PlanillaStockCargaxRemito();
            });
            break;
        case 'CargandoRemitoNro': 
            import('../pages/SeccionStock/cargandoRemitoNro.js').then(module => {
                new module.CargandoRemitoNro();
            });
            break;            



        case 'VerStock':
            import('../pages/SeccionStock/stock.js').then(module => {
                new module.PlanillaStock();
            });
            break;

        case 'StockBajo':
                import('../pages/SeccionStock/stockbajo.js').then(module => {
                    new module.PlanillaStockBajo();
                });
                break;

        case 'StockSinMvto':
            import('../pages/SeccionStock/stocksinmvto.js').then(module => {
                new module.PlanillaStockSinMvto();
            });
            break;

            
            
        case 'EditarProducto':
            import('../pages/SeccionStock/editarProducto.js').then(module => {
                new module.EditProductPage();
            });
            break;

        case 'NuevoProducto':
            import('../pages/SeccionStock/nuevoProducto.js').then(module => {
                new module.NewProductPage();
            });
            break;

        case 'EliminarProducto':
            import('../pages/SeccionStock/eliminarProductoDelStock.js').then(module => {
                new module.EliminarProductosPage();
            });
            break;

        case 'ListaProveedores':
            import('../pages/SeccionStock/ListaProveedores.js').then(module => {
                new module.ListaProveedores();
            });
            break;

        case 'ProximoPedido':
            import('../pages/SeccionStock/pedidoproximo.js').then(module => {
                new module.PlanillaPedidoProximo();
            });
            break;

        case 'ListarPorProveedor':
            import('../pages/SeccionStock/pedidolistaxproveedor.js').then(module => {
                new module.PlanillaPedidoListaxProveedor();
            });
            break;


        case 'PedidoHistorial':
            import('../pages/SeccionStock/pedidohistorial.js').then(module => {
                new module.PlanillaPedidoHistorial();
            });
            break;

        case 'FormNuevoProveedor':
            import('../pages/SeccionStock/formnuevoproveedor.js').then(module => {
                new module.NuevoProveedor();
            });
            break;


                //SECCION PERFILES

        case 'MenuPerfiles':
            import('../pages/SeccionPerfiles/menuperfiles.js').then(module => {
                new module.MenuPerfiles();
            });
            break; 

        case 'PerfilNuevo':
            import('../pages/SeccionPerfiles/perfilnuevo.js').then(module => {
                new module.NuevoPerfil();
            });
            break; 
        
        case 'PerfilSolicitado':
            import('../pages/SeccionPerfiles/perfilsolicitado.js').then(module =>{
                new module.SolicitarPerfil();
            });
            break;       

        case 'PerfilModificar':
            import('../pages/SeccionPerfiles/perfilModificar.js').then(module => {
                new module.ModificarPerfil(Id);
            });
            break;      


        default:
            import('../pages/PrimerasPaginas/LoginPage.js').then(module =>{
                new module.createLoginPage();
            })
    }
}

/*
// Maneja cambios en el historial del navegador
window.addEventListener('popstate', () => {
    const currentPage = window.location.pathname.slice(1) || 'Login';
    navigateToPage(currentPage); // Carga la página actual basada en la URL
});

// Carga inicial
window.addEventListener('load', () => {
    const initialPage = window.location.pathname.slice(1) || 'Login';
    navigateToPage(initialPage); // Carga la página inicial
});
*/