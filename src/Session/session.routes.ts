import {Express} from "express";
import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from "./session.controller";
import {createSessionSchema} from "./session.schema";

function sessionRoutes(app: Express){
  app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler);

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteUserSessionHandler);
}

export default sessionRoutes;