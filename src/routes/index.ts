//agregar as rotas
import { Router } from "express";

import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./tables-routes";
import { tablesSessionsRoutes } from "./tables-sessions-routes";
import { ordersRoutes } from "./orders-routes";

const routes = Router();
//rota para products
routes.use("/products", productsRoutes);

//rota para tables
routes.use("/tables", tablesRoutes);

//rota para tables-sessions
routes.use("/tables-sessions", tablesSessionsRoutes);

//rota para orders
routes.use("/orders", ordersRoutes);

export { routes };