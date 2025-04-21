import { Router } from "express";
import { OrdersController } from "../controllers/orders-controller";

const ordersRoutes = Router();

const ordersController = new OrdersController();

//criando rota do pedido
ordersRoutes.post("/", ordersController.create);

//listando pedidos
ordersRoutes.get("/table-session/:table_session_id", ordersController.index);

export { ordersRoutes };