export function navigateToPage(page) {
    document.body.innerHTML = '';

    switch(page) {
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
            
        case 'Login':
            import('../js/pages/LoginPage.js').then(module => {
                module.createLoginPage();
            });
            break;
        case 'RecoverPassword':
            import('../js/pages/pageRecoverPassword.js').then(module => {
                new module.RecoverPasswordPage();
            });
            break;
        case 'ChangePassword':
            import('../js/pages/pageChangePassword.js').then(module => {
                new module.ChangePassword();
            });
            break;
        case 'Config':
            import('../js/pages/pageConfig.js').then(module => {
                new module.ConfigurationPage();
            });
            break;
        case 'MenuVentas':
            import('../js/pages/pageMenuVentas.js').then(module => {
                new module.PageMenuVentas();
            });
            break;
        case 'BuscadorParaVender':
            import('../js/pages/pageProductSearch.js').then(module => {
                new module.ProductSearchPage();
            });
            break;
        case 'PedidoActual':
            import('../../views/pagesJS/pedidoactual.js').then(module => {
                new module.PlanillaPedido();
            });
            break;

        case 'Movimientos':
            import('../../views/pagesJS/movimiento.js').then(module => {
                new module.PlanillaMovimiento();
            });
            break;

        case 'VentasPorVendedor':
            import('../js/pages/pageVtasPorVendedor.js').then(module => {
                new module.VentasPorVendedorPage();
            });
            break;
        case 'VentasPorVendedorListado':
            import('../../views/pagesJS/ventasporvendedor.js').then(module => {
                new module.PlanillaVtasxVendedor();
            });
            break;

        case 'BuscadorVentasPorProducto':
            import('../js/pages/SearchForToSell.js').then(module => {
                new module.SearchForToSell();
            })
        case 'VentasPorProducto':
            import('../js/pages/pageVtasPorProducto.js').then(module => {
                new module.VentasPorProductoPage();
            });
            break;
            
        case 'VentasPorFecha':
            import('../js/pages/ventasPorFechaPage.js').then(module => {
                new module.VentasPorFechaPage();
            });
            break;
        

        case 'MenuStock':
            import('../js/pages/menuStockPage.js').then(module => {
                new module.MenuStockPage();
            });
            break;

        default:
            console.error('Página no encontrada:', page);
    }
}
