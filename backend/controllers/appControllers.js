import { PlanillaPedido } from "../../views/pagesJS/pedidoactual.js";
import { PlanillaMovimiento } from "../../views/pagesJS/movimiento.js";
import { PlanillaVtasdelDia } from "../../views/pagesJS/ventasdeldia.js";
import { PlanillaVtasxVendedor } from "../../views/pagesJS/ventasporvendedor.js";
import { PlanillaVtasxFecha } from "../../views/pagesJS/ventasporfecha.js";
import { PlanillaStock } from "../../views/pagesJS/stock.js";
import { PlanillaStockBajo } from "../../views/pagesJS/stockbajo.js";
import { PlanillaStockSinMvto } from "../../views/pagesJS/stocksinmvto.js";

const mostrarPedidoActual = function (req,res){res.send(PlanillaPedido())};


export default { mostrarPedidoActual }