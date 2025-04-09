import e, { Router } from "express";
import { TablesController } from "@/controllers/tables-controller";

const tablesRoutes = Router();
//instancia o controller
const tablesController = new TablesController();

//rota listar todas as mesas
tablesRoutes.get("/", tablesController.index);

export { tablesRoutes };