import { NextFunction, Request, Response } from "express";

//funcionalidades - vai ser chamada pelo routes
class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: "Ok" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
