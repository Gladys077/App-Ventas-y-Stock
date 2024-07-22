
export function navigateToPage(page) {
    document.body.innerHTML = '';

    switch(page) {
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
        case 'menuVentas':
            import('../js/pages/pageMenuVentas.js').then(module => {
                new module.PageMenuVentas();
            });
            break;
        case 'movimientos':
            import('../../views/pagesJS/movimiento.js').then(module => {
                new module.PlanillaMovimiento();
            });
            break;
        case 'ventasPorVendedor':
            import('../js/pages/pageVtasPorVendedor.js').then(module => {
                new module.VentasPorVendedorPage();
            });
            break;
        case 'ventasPorProducto':
            import('../js/pages/pageVtasPorProducto.js').then(module => {
                new module.VentasPorProductoPage();
            });
            break;
        case 'ventasPorFecha':
            import('./pages/ventasPorFechaPage.js').then(module => {
                new module.VentasPorFechaPage();
            });
            break;
        case 'productSearch':
            import('../js/pages/pageProductSearch.js').then(module => {
                new module.ProductSearchPage();
            });
            break;
        case 'pedidoActual':
            import('../../views/pagesJS/pedidoactual.js').then(module => {
                new module.PlanillaPedido();
            });
            break;


        default:
            console.error('Página no encontrada:', page);
    }
}
