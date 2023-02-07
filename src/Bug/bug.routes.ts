import {Express} from "express";
import validate from "../middleware/validateResource";
import { createBugSchema } from "./bug.schema";
import { createBugHandler} from "./bug.controller";

function bugRoutes(app: Express){
  app.post(
    "/api/bugs",
    validate(createBugSchema),
    createBugHandler
  );
}

export default bugRoutes;