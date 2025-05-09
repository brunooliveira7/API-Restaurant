import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";
import { z } from "zod";

class TableSessionsController {
  //abrir sessão de uma mesa
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
        throw new AppError("Table is already open");
      }

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

  //lista sessões de uma mesa
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionsRepository>(
        "tables_sessions"
      ).orderBy("closed_at");

      return response.json(sessions);
    } catch (error) {
      next(error);
    }
  }

  //fechar sessão de uma mesa
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "Id must be a number",
        })
        .parse(request.params.id);

      //recuperar sessão
      const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({
          id,
        })
        .first();

      if (!session) {
        throw new AppError("Session table not found");
      }

      //verificar se a sessão já está fechada
      if (session.closed_at) {
        throw new AppError("This session table is already closed");
      }

      await knex<TableSessionsRepository>("tables_sessions")
        .update({
          closed_at: knex.fn.now(),
        })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { TableSessionsController };
