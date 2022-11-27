import { Request, Response } from "express";
import { CreateUserInput } from "./user.schema";
import { createUser } from "./user.service";
import logger from "../utils/logger";


export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
 ) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(user);
  } catch (error: any) {
    if(error.message === "ValidationError: username: This username is already taken"){
      return res.status(400).send({error: {type:"validationError", message: "This username is already taken"}});
    }
    return res.status(400).send({error});
  }
}