export function navigateToPage(page) {
    document.body.innerHTML = '';

    switch(page) {
        case 'Login':
            import('./pages/LoginPage.js').then(module => {
                module.createLoginPage();
            });
            break;
        case 'RecoverPassword':
            import('./pages/recuperarPassword.js').then(module => {
                new module.RecoverPasswordPage();
            });
            break;
        case 'cambioDePassword':
            import('./pages/cambioDePassword.js').then(module => {
                new module.ChangePassword();
            });
            break;
        case 'Config':
            import('./pages/configuracion.js').then(module => {
                new module.ConfigurationPage();
            });
            break;
        case 'MenuVentas':
            import('../js/pages/pageMenuVentas.js').then(module => {
                new module.PageMenuVentas();
            });
            break;
        case 'BuscadorParaVender':
            import('./pages/busquedaProducto.js').then(module => {
                new module.ProductSearchPage();
            });
            break;
        case 'ventaActual':
            import('../../public/pages/ventaActual.js').then(module => {
                new module.PlanillaPedido();
            });
            break;

        case 'Movimientos':
            import('../../public/pages/movimiento.js').then(module => {
                new module.PlanillaMovimiento();
            });
            break;

        case 'VentasPorVendedor':
            import('./pages/ventasPorVendedor.js').then(module => {
                new module.VentasPorVendedorPage();
            });
            break;
        case 'VentasPorVendedorListado':
            import('../../public/pages/ventasporvendedor.js').then(module => {
                new module.PlanillaVtasxVendedor();
            });
            break;

        case 'BuscadorVentasPorProducto':
            import('./pages/ventasPorProductoBuscador.js').then(module => {
                new module.VentasPorProductoBuscador();
            })
        case 'VentasPorProducto':
            import('./pages/ventasPorProducto.js').then(module => {
                new module.VentasPorProductoPage();
            });
            break;
        case 'ListadoPorFecha': //Lu
            import('../../public/pages/ventasporfecha.js').then(module => {
               new module.PlanillaVtasxFecha();
            });
            break;
            
        case 'VentasPorFecha':
            import('../js/pages/ventasPorFechaPage.js').then(module => {
                new module.VentasPorFechaPage();
            });
            break;






        case 'MenuStock':
            import('./pages/menuDeStok.js').then(module => {
                new module.MenuStockPage();
            });
            break;

        case 'CargaDeStock':
            import('./pages/cargaDeStock.js').then(module => {
                new module.CargaDeStock();
            });
            break;    
            
        case 'Stock':
            import('../../public/pages/stock.js').then(module => {
                new module.PlanillaStock();
            });
            break;

        case 'NuevoProducto':
            import('./pages/nuevoProducto.js').then(module => {
                new module.NewProductPage();
            });
            break;

        case 'EditarProducto':
            import('./pages/editarProducto.js').then(module => {
                new module.EditProductPage();
            });
            break;

        


        case 'MenuPerfiles':
            import('../js/pages/menuPerfiles.js').then(module => {
                new module.MenuPerfiles();
            });
            break;    

        default:
            console.error('Página no encontrada:', page);
    }
}
