import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productsRoutes = Router();
//instancia o controller
const productsController = new ProductController();

//rota
productsRoutes.get("/", productsController.index);

export { productsRoutes };