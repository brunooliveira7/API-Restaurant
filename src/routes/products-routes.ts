import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productsRoutes = Router();
//instancia o controller
const productsController = new ProductController();

//rota listar todos os produtos
productsRoutes.get("/", productsController.index);

//rota para criar um novo produto
productsRoutes.post("/", productsController.create);

export { productsRoutes };