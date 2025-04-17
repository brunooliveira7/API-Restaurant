import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";
import { z } from "zod";

class TableSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const BodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = BodySchema.parse(request.body);

      //verificar se a mesa já está aberta
      const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

        //se a mesa está aberta, não pode abrir outra sessão
        if (session && !session.closed_at) {
          throw new AppError("Mesa já está aberta");
          };
        
      //abrir sessão de uma mesa
      await knex<TableSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { TableSessionsController };
