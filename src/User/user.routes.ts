import {Express} from "express";
import validate from "../middleware/validateResource";
import { createUserHandler } from "./user.controller";
import { createUserSchema } from "./user.schema";

function userRoutes(app: Express){
  app.post("/api/users", validate(createUserSchema), createUserHandler);
}

export default userRoutes;