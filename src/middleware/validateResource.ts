import e, { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try{
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  } catch(error: any){
    if(error instanceof ZodError){
      console.log("zoddy doddy");
      res.status(400).send(error);
    } else {
      console.log("01", error);
      console.log("02", error.message);
    }
  }
}
export default validate;