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

      await knex<OrdersRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        //preço do produto no momento da criação do pedido
        price: product.price,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  //listando pedidos
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;

      const order = await knex<OrdersRepository>("orders")
        //selecionando apenas os campos necessários
        .select(
          "orders.id",
          "orders.table_session_id",
          "orders.product_id",
          "products.name",
          "orders.price",
          "orders.quantity",
          //calculando o valor total do pedido
          knex.raw("(orders.price * orders.quantity) AS Total"),
          "orders.created_at",
          "orders.updated_at"
        )
        //concatenando tabelas para obter os dados dos produtos
        .join("products", "products.id", "orders.product_id")
        .where({ table_session_id })
        .orderBy("orders.created_at", "desc");

      return response.json(order);
    } catch (error) {
      next(error);
    }
  }

  //resumindo pedidos - total da conta
  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;

      const order = await knex<OrdersRepository>("orders")
        .select(
          //calculando o valor total do pedido - coalesce - retorna 0 se não tiver nenhum pedido
          knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS Total"),
          knex.raw("COALESCE(SUM(orders.quantity), 0) AS Quantity")
        )
        .where({ table_session_id })
        .first();

      return response.json(order);
    } catch (error) {
      next(error);
    }
  }
}
export { OrdersController };
