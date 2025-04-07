import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { knex } from "@/database/knex";

//funcionalidades - vai ser chamado pelo routes
class ProductController {
  //função para listar todos os produtos
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      //recupera o parâmetro
      const { name } = request.query;

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.json({ products });
    } catch (error) {
      next(error);
    }
  }

  //função para criar um novo produto
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      //validar os dados - para preencher todos os campos
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        //gt - maior que
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      //inserir no banco de dados, na tabela products, com a tipagem do repository
      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
