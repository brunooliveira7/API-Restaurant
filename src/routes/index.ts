//agregar as rotas
import { Router } from "express";

import { productsRoutes } from "./products-routes";

const routes = Router();
//rota para products
routes.use("/products", productsRoutes);

export { routes };