import { Router } from "express";
import { TableSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router();
//instancia o controller
const tablesSessionsController = new TableSessionsController();

//rota criar sessão
tablesSessionsRoutes.post("/", tablesSessionsController.create);

//rota listar sessões
tablesSessionsRoutes.get("/", tablesSessionsController.index);

//fechar sessão
tablesSessionsRoutes.patch("/:id", tablesSessionsController.update);

export { tablesSessionsRoutes };