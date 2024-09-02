export function navigateToPage(page) {
    document.body.innerHTML = '';

    // window.history.pushState(null, '', `/${page}`); // Esto muestra la página en el navegador
//     loadPage(page);  //Carga el contenido de la página

// }
// function loadPage(page){
//     document.body.innerHTML = '';

    switch(page) {
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

        case 'Movimientos': //LU
            import('../pages/SeccionVentas/movimiento.js').then(module => {
                new module.PlanillaMovimiento();
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

        case 'BuscadorVentasPorProducto': 
            import('../pages/SeccionVentas/ventasPorProductoBuscador.js').then(module => {
                new module.VentasPorProductoBuscador();
            });
            break;

        case 'VentasPorProducto': 
            import('../pages/SeccionVentas/ventasPorProducto.js').then(module => {
                new module.VentasPorProductoPage();
            });
            break;

        case 'ListaXFecha_vtaProd': //Lu
            import('../pages/SeccionVentas/listaXFecha_vtaProd.js').then(module => {
                new module.PlanillaVtasxFecha();
            });
            break;
            
        case 'VentasPorFecha':
            import('../pages/SeccionVentas/ventasPorFechaPage.js').then(module => {
                new module.VentasPorFechaPage();
            });
            break;
            case 'ListadoPorFecha': //Lu
            import('../pages/SeccionVentas/listaXFecha_vtaProd.js').then(module => {
               new module.PlanillaVtasxFecha();
            });
            break;


        //------------------Sección STOCK



        case 'MenuStock':
            import('../pages/SeccionStock/menuDeStock.js').then(module => {
                new module.MenuStockPage();
            });
            break;

        case 'CargaDeStock':
            import('../pages/SeccionStock/menuCargaDeStock.js').then(module => {
                new module.CargaDeStock();
            });
            break;    
            
        case 'CargarStockSearchPage':
            import('../pages/SeccionStock/cargaStockBuscador.js').then(module => {
                new module.CargarStockSearchPage();
            });
            break;

        case 'CargaStockXRemitoPage': 
            import('../pages/SeccionStock/stockcargaxremito.js').then(module => {
                new module.PlanillaStockCargaxRemito();
            });
            break;

        case 'VerStock':
            import('../pages/SeccionStock/stock.js').then(module => {
                new module.PlanillaStock();
            });
            break;

        case 'NuevoProducto':
            import('../pages/SeccionStock/nuevoProducto.js').then(module => {
                new module.NewProductPage();
            });
            break;

        case 'EditarProducto':
            import('../pages/SeccionStock/editarProducto.js').then(module => {
                new module.EditProductPage();
            });
            break;

        case 'EliminarProducto':
            import('../pages/SeccionStock/eliminarProductoDelStock.js').then(module => {
                new module.EliminarProductosPage();
            });
            break;

        case 'ProximoPedido':
            import('../pages/SeccionStock/pedidoproximo.js').then(module => {
                new module.PlanillaPedidoProximo();
            });
            break;

        case 'MenuPerfiles':
            import('../pages/SeccionPerfiles/menuPerfiles.js').then(module => {
                new module.MenuPerfiles();
            });
            break;    



        default:
            import('../pages/PrimerasPaginas/LoginPage.js').then(module =>{
                new module.createLoginPage();
            })
    }
}


// Manejar la navegación del navegador (botones atrás/adelante)
// window.addEventListener('popstate', () => {
//     loadPage(window.location.pathname.slice(1) || 'Login');
// });

// // Manejar la carga inicial de la página
// window.addEventListener('load', () => {
//     loadPage(window.location.pathname.slice(1) || 'Login');
// });