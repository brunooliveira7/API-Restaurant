//agregar as rotas
import { Router } from "express";

import { productsRoutes } from "./products-routes";

import { tablesRoutes } from "./tables-routes";

const routes = Router();
//rota para products
routes.use("/products", productsRoutes);

//rota para tables
routes.use("/tables", tablesRoutes);

export { routes };