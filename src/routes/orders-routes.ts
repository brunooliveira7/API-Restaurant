import { Router } from "express";
import { OrdersController } from "../controllers/orders-controller";

const ordersRoutes = Router();

const ordersController = new OrdersController();

//criando rota do pedido
ordersRoutes.post("/", ordersController.create);

export { ordersRoutes };