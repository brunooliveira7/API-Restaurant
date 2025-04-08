import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";

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
        .orderBy("id");

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

  //função para atualizar um produto
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      //validar o id - só números, converte em inteiro
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      //validar o corpo da requisição
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        //gt - maior que
        price: z.number().gt(0),
      });
      const { name, price } = bodySchema.parse(request.body);

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

        if (!product) {
          throw new AppError("Product not found", 404);
        }

      await knex<ProductRepository>("products")
        //atualizar o registro, inclusive o updated_at
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
  //função para remover um produto
  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      //também precisa de um id validado
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        //primeiro registro encontrado
        .first();

      //se não existir, lança um erro
      if (!product) {
        throw new AppError("Product not found");
      }

      await knex<ProductRepository>("products").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
