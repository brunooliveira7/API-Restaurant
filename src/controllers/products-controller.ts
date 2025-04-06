import { NextFunction, Request, Response } from "express";
import { z } from "zod";

//funcionalidades - vai ser chamado pelo routes
class ProductController {
  //função para listar todos os produtos
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: "Ok" });
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

      return response.status(201).json({ name, price });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
