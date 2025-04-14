import { Router } from "express";
import { TableSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router();
//instancia o controller
const tablesSessionsController = new TableSessionsController();

//rota criar sessão
tablesSessionsRoutes.post("/", tablesSessionsController.create);

export { tablesSessionsRoutes };