import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";  
import { z } from "zod";

class TableSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const BodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = BodySchema.parse(request.body);

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
