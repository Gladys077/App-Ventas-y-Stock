import { PlanillaVentaActual } from "./pages/ventaactual.js";
import { PlanillaMovimiento } from "./pages/movimiento";
import { PlanillaVtasdelDia } from "./pages/ventasdeldia";
import { PlanillaVtasxVendedor } from "./pages/ventasporvendedor";
import { PlanillaVtasxFecha } from "./pages/ventasporfecha";
import { PlanillaStock } from "./pages/stock";
import { PlanillaStockBajo } from "./pages/stockbajo";
import { PlanillaStockSinMvto } from "./pages/stocksinmvto";
import { PlanillaStockCargaxRemito } from "./pages/stockcargaxremito";
import { PlanillaProximoPedido } from "./pages/pedidoproximo";





import express from "express"
const appRoutes =  express.Router();


appRoutes.get("/ventaactual", (req,res)=>{res.send(new PlanillaVentaActual())})

export default appRoutes;