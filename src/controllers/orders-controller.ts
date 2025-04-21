import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";
import { z } from "zod";

class OrdersController {
  //criando pedido
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      //recuperando dados do body
      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body
      );

      //se tem a session - carrega
      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      //se não existir session
      if (!session) {
        throw new AppError("Session table not found");
      }

      //se tem data de fechamento - sessão fechada, não pode criar mais pedidos
      if (session.closed_at) {
        throw new AppError("This table is closed");
      }

      //se tem produto - carrega
      const product = await knex<ProductsRepository>("products")
        .where({ id: product_id })
        .first();

      //se não existir produto
      if (!product) {
        throw new AppError("Product not found");
      }

      return response.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
