import {Express, Request, Response} from "express";
import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createProductSchema, getProductSchema, updateProductSchema, deleteProductSchema } from "./product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./product.controller";

function productRoutes(app: Express){
  app.post(
    "/api/products",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validate(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validate(deleteProductSchema)],
    deleteProductHandler
  );
}

export default productRoutes;